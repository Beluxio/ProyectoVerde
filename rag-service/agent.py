"""
VerdBot — Agente experto en botánica y plantas de ProyectoVerde.
Patrón: LangGraph con herramientas (igual que it-support-agent pero para plantas).

Flujo:
  1. Usuario envía mensaje
  2. Claude decide si usar una herramienta
  3. Si usa herramienta: ejecuta → recibe resultado → puede usar otra herramienta
  4. Claude genera respuesta final con toda la información recopilada
"""
import os
from typing import Annotated, TypedDict
from dotenv import load_dotenv

from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

from rag.prompts import VERDBOT_SYSTEM_PROMPT
from rag.retriever import search_knowledge, format_context
from tools.plant_search import search_plants
from tools.pest_identifier import identify_pest

load_dotenv()


# ============================================================
# HERRAMIENTAS DEL AGENTE
# ============================================================

@tool
async def buscar_en_knowledge_base(
    query: str,
    category: str = None
) -> str:
    """
    Busca en la base de conocimiento de ProyectoVerde.
    Úsala para preguntas sobre cuidados específicos, botánica, medicina natural
    y técnicas de jardinería. Puedes filtrar por categoría:
    'cuidado', 'medicina', 'plagas', 'botanica', 'general'
    """
    fragments = await search_knowledge(query, category=category)
    if not fragments:
        return "No encontré información específica en el knowledge base sobre este tema."
    return format_context(fragments)


@tool
def buscar_planta_en_catalogo(
    query: str,
    category: str = None,
    max_price: float = None
) -> str:
    """
    Busca plantas disponibles en la tienda de ProyectoVerde con precio y disponibilidad.
    Úsala cuando el usuario pregunta qué plantas venden, precios, o si una planta está disponible.
    La categoría puede ser: interior, exterior, suculenta, aromatica, medicinal, frutal, cactus.
    """
    return search_plants(query, category=category, max_price=max_price)


@tool
def identificar_plaga_y_tratamiento(
    symptoms: str,
    plant_name: str = ""
) -> str:
    """
    Identifica plagas de plantas según síntomas descritos y proporciona
    tratamientos orgánicos y convencionales. Úsala cuando el usuario describe
    insectos, manchas, deformaciones u otros problemas en sus plantas.
    """
    return identify_pest(symptoms, plant_name)


@tool
async def buscar_tratamiento_plaga_avanzado(
    pest_or_symptom: str,
    plant_name: str = ""
) -> str:
    """
    Búsqueda avanzada en el knowledge base sobre control de plagas.
    Úsala para plagas específicas o síntomas que no cubre el identificador básico.
    """
    query = f"plaga {pest_or_symptom} tratamiento {plant_name}".strip()
    fragments = await search_knowledge(query, category="plagas")
    if not fragments:
        return identify_pest(pest_or_symptom, plant_name)
    return format_context(fragments)


TOOLS = [
    buscar_en_knowledge_base,
    buscar_planta_en_catalogo,
    identificar_plaga_y_tratamiento,
    buscar_tratamiento_plaga_avanzado,
]

# ============================================================
# ESTADO DEL AGENTE
# ============================================================

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    session_id: str


# ============================================================
# NODOS DEL GRAFO
# ============================================================

llm = ChatAnthropic(
    model="claude-sonnet-4-6",
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    max_tokens=2048,
).bind_tools(TOOLS)


def agent_node(state: AgentState) -> dict:
    """Nodo principal: Claude decide qué herramienta usar o responde directamente."""
    messages = [SystemMessage(content=VERDBOT_SYSTEM_PROMPT)] + state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}


def should_continue(state: AgentState) -> str:
    """Decide si continuar con herramientas o terminar."""
    last_message = state["messages"][-1]
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return END


# ============================================================
# CONSTRUCCIÓN DEL GRAFO
# ============================================================

tool_node = ToolNode(TOOLS)

graph_builder = StateGraph(AgentState)
graph_builder.add_node("agent", agent_node)
graph_builder.add_node("tools", tool_node)

graph_builder.add_edge(START, "agent")
graph_builder.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
graph_builder.add_edge("tools", "agent")

verdbot_graph = graph_builder.compile()


# ============================================================
# FUNCIÓN PRINCIPAL PARA USAR EN LA API
# ============================================================

async def chat(message: str, history: list[dict] = None, session_id: str = "default") -> str:
    """
    Procesa un mensaje del usuario y retorna la respuesta de VerdBot.

    Args:
        message: Mensaje del usuario
        history: Lista de mensajes previos [{"role": "user"|"assistant", "content": "..."}]
        session_id: ID de sesión para trazabilidad

    Returns:
        Respuesta de VerdBot como string
    """
    messages = []

    # Reconstruir historial
    if history:
        for msg in history[-10:]:  # Máximo 10 mensajes de contexto
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                messages.append(AIMessage(content=msg["content"]))

    messages.append(HumanMessage(content=message))

    result = await verdbot_graph.ainvoke(
        {"messages": messages, "session_id": session_id}
    )

    return result["messages"][-1].content
