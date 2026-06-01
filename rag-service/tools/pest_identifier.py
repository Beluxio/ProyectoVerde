"""
Herramienta: Identificar plagas y recomendar tratamientos.
Combina búsqueda en knowledge base con respuestas estructuradas.
"""
from pydantic import BaseModel, Field


class PestIdentifierInput(BaseModel):
    symptoms: str = Field(
        description="Descripción de los síntomas o el insecto observado en la planta"
    )
    plant_name: str = Field(
        default="",
        description="Nombre de la planta afectada (opcional)"
    )


PEST_GUIDE = {
    "cochinilla": {
        "nombre": "Cochinilla harinosa (Pseudococcidae)",
        "sintomas": "Masas blancas algodonosas en tallos, hojas y uniones. Planta debilitada, hojas amarillas.",
        "organico": [
            "Jabón potásico (2-3 ml por litro de agua) aplicado directamente",
            "Aceite de neem diluido (5 ml por litro) + jabón neutro",
            "Alcohol isopropílico 70% con algodón sobre cada insecto",
            "Introducir depredadores naturales: crisopas o mariquitas",
        ],
        "quimico": "Insecticida sistémico con imidacloprid como último recurso. Seguir instrucciones del fabricante.",
        "prevencion": "Revisión semanal de plantas nuevas antes de incorporarlas. Evitar exceso de fertilización nitrogenada.",
    },
    "pulgon": {
        "nombre": "Pulgón / Áfido (Aphididae)",
        "sintomas": "Insectos pequeños verdes, negros o amarillos en brotes tiernos. Hojas enrolladas, pegajosidad (melaza).",
        "organico": [
            "Jabón potásico o jabón de Castilla (20 gotas por litro)",
            "Infusión de ajo y chile (repelente natural)",
            "Aceite de neem semanal como preventivo",
            "Chorro de agua a presión moderada para retirarlos físicamente",
        ],
        "quimico": "Piretrinas naturales (Pyrethrum) o lambda-cihalotrina para infestaciones severas.",
        "prevencion": "Plantar albahaca o lavanda cerca — los repelen naturalmente. Las mariquitas son sus depredadores.",
    },
    "araña roja": {
        "nombre": "Araña roja (Tetranychus urticae)",
        "sintomas": "Punteado amarillo-plateado en hojas, telas finas en envés. Ambiente seco favorece su proliferación.",
        "organico": [
            "Aumentar la humedad ambiental (son vulnerables a la humedad)",
            "Aceite de neem + jabón + agua (aplicar al envés)",
            "Jabón potásico en spray al envés de las hojas",
            "Ácaros depredadores (Phytoseiulus persimilis) — disponibles en tiendas especializadas",
        ],
        "quimico": "Acaricida específico (abamectina o bifenazato). Rotar productos para evitar resistencias.",
        "prevencion": "Mantener humedad adecuada. Evitar ambientes muy secos con calefacción.",
    },
    "trips": {
        "nombre": "Trips (Thysanoptera)",
        "sintomas": "Rayaduras plateadas en hojas, puntos negros (excrementos), deformación de flores y brotes.",
        "organico": [
            "Trampas azules adhesivas (los atraen)",
            "Aceite de neem al envés de hojas semanalmente",
            "Spinosad orgánico (derivado de bacteria del suelo)",
            "Nemátodos entomopatógenos en sustrato (Steinernema feltiae)",
        ],
        "quimico": "Spinosad o imidacloprid para infestaciones graves. Tratar también el suelo.",
        "prevencion": "Inspección de plantas nuevas. Cuarentena de 2 semanas para plantas recién adquiridas.",
    },
    "mosca blanca": {
        "nombre": "Mosca blanca (Bemisia tabaci / Trialeurodes vaporariorum)",
        "sintomas": "Nube de pequeñas moscas blancas al mover la planta. Hojas amarillas, pegajosas y débiles.",
        "organico": [
            "Trampas amarillas pegajosas (muy efectivas)",
            "Jabón potásico en spray, especialmente al envés",
            "Aceite de neem + jabón semanal",
            "Extracto de canela (repelente natural)",
        ],
        "quimico": "Imidacloprid sistémico o bifentrina para infestaciones graves.",
        "prevencion": "Trampas amarillas preventivas. Evitar exceso de nitrógeno. Buena circulación de aire.",
    },
}


def identify_pest(symptoms: str, plant_name: str = "") -> str:
    """Identifica la plaga más probable según síntomas y da recomendaciones."""
    symptoms_lower = symptoms.lower()

    # Buscar coincidencias con el guía
    matched = []
    for key, info in PEST_GUIDE.items():
        if key in symptoms_lower or key.replace(" ", "") in symptoms_lower:
            matched.append(info)

    if not matched:
        # Búsqueda por síntomas parciales
        if "blanco" in symptoms_lower or "algodón" in symptoms_lower:
            matched.append(PEST_GUIDE["cochinilla"])
        elif "amarillo" in symptoms_lower and "peg" in symptoms_lower:
            matched.append(PEST_GUIDE["pulgon"])
        elif "plateado" in symptoms_lower or "tela" in symptoms_lower:
            matched.append(PEST_GUIDE["araña roja"])
        elif "rayad" in symptoms_lower or "plateado" in symptoms_lower:
            matched.append(PEST_GUIDE["trips"])
        elif "mosca" in symptoms_lower:
            matched.append(PEST_GUIDE["mosca blanca"])

    if not matched:
        return (
            f"Con los síntomas que describes{' en ' + plant_name if plant_name else ''}, "
            "necesito más información. ¿Puedes describir:\n"
            "- ¿El color de los insectos o manchas?\n"
            "- ¿En qué parte de la planta aparecen?\n"
            "- ¿Hay telarañas, pegajosidad o polvillo?\n"
            "Mientras tanto, como medida preventiva, aplica jabón potásico diluido en toda la planta."
        )

    info = matched[0]
    organico_list = "\n".join(f"  {i+1}. {r}" for i, r in enumerate(info["organico"]))

    return (
        f"🪲 **Plaga probable: {info['nombre']}**\n\n"
        f"**Síntomas típicos:** {info['sintomas']}\n\n"
        f"**🌿 Tratamiento orgánico (recomendado):**\n{organico_list}\n\n"
        f"**⚗️ Tratamiento químico** (solo si el orgánico no funciona después de 2-3 semanas):\n"
        f"  {info['quimico']}\n\n"
        f"**🛡️ Prevención futura:** {info['prevencion']}\n\n"
        f"_Aplica cualquier tratamiento por la mañana o al atardecer, nunca bajo sol directo._"
    )
