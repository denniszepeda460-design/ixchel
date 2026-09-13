import { Product, products } from "@/data/products";

export type PlantSize = "pequena" | "mediana" | "grande";

export interface Plant {
  id: string;
  name: string;
  subtitle: string;
  size: PlantSize;
  sizeLabel: string;
  price: number;
  description: string;
  image: string;
  transparentImage?: string; // Versión con fondo transparente recortado en /images/sin-fondo-plantas/trimmed/
  recommendedPlanterCategory: ("pequena" | "mediana" | "grande" | "colgante")[];
  careTip: string;
}

export interface ComboEvaluation {
  isIdeal: boolean;
  status: "ideal" | "warning";
  badgeText: string;
  title: string;
  message: string;
  suggestedPlant?: string;
  suggestedPlanter?: string;
}

export interface SurpriseCombo {
  id: string;
  name: string;
  tagline: string;
  plantId: string;
  planterSlug: string;
  comboPrice: number;
  badge: string;
  description: string;
}

export const availablePlants: Plant[] = [
  // 1. Callisia Pink
  {
    id: "planta-callisia",
    name: "Callisia Pink",
    subtitle: "Follaje tapizante y péndulo con destellos rosas y verdes",
    size: "pequena",
    sizeLabel: "Pequeña (Colgante)",
    price: 2.0,
    description:
      "Ramas densas de hojas diminutas variegadas que desbordan con gracia sobre los bordes de la maceta.",
    image: "/images/sin-fondo-plantas/trimmed/callisia-pink.png",
    transparentImage: "/images/sin-fondo-plantas/trimmed/callisia-pink.png",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Luz tamizada y riego cuando la superficie del sustrato esté seca.",
  },

  // 2. Echeveria Ives Fred Monstruosa
  {
    id: "planta-fred-ives",
    name: "Echeveria Ives Fred Monstruosa",
    subtitle: "Suculenta escultórica de hojas alargadas tornasol",
    size: "mediana",
    sizeLabel: "Mediana (Escultórica)",
    price: 2.25,
    description:
      "Variedad de colección con crecimiento exótico y tonalidades cobrizas y verdosas muy atractivas.",
    image: "/images/sin-fondo-plantas/trimmed/echeveria-ives-fred-monstruosa.png",
    transparentImage: "/images/sin-fondo-plantas/trimmed/echeveria-ives-fred-monstruosa.png",
    recommendedPlanterCategory: ["mediana", "pequena"],
    careTip: "Buena aireación y sustrato mineral con drenaje óptimo.",
  },

  // 3. Echeveria Lilac Mist
  {
    id: "planta-echeveria-lilac",
    name: "Echeveria Lilac Mist",
    subtitle: "Crasa compacta con hojas carnosas color niebla lila",
    size: "pequena",
    sizeLabel: "Pequeña (Compacta)",
    price: 1.75,
    description:
      "Hojas pruinosas agrupadas en roseta geométrica de porte limpio y tonos pastel.",
    image: "/images/sin-fondo-plantas/trimmed/echeveria-lilac-mist.png",
    transparentImage: "/images/sin-fondo-plantas/trimmed/echeveria-lilac-mist.png",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Regar directo al sustrato sin encharcar el cogollo central.",
  },

  // 4. Echeveria Serena
  {
    id: "planta-echeveria",
    name: "Echeveria Serena",
    subtitle: "Roseta carnosa en tonos lila y lavanda pastel",
    size: "pequena",
    sizeLabel: "Pequeña (Roseta)",
    price: 1.5,
    description:
      "Crasa noble de crecimiento contenido y simetría tornasolada. Perfecta para cuencos y macetas bajas.",
    image: "/images/sin-fondo-plantas/trimmed/echeveria-serena.png",
    transparentImage: "/images/sin-fondo-plantas/trimmed/echeveria-serena.png",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Riego cada 10 a 14 días cuando la tierra esté seca al tacto.",
  },

  // 5. Flor de las 11
  {
    id: "planta-flor-11",
    name: "Flor de las 11",
    subtitle: "Portulaca rastrera con flores diurnas de tonos cálidos",
    size: "pequena",
    sizeLabel: "Pequeña (Floración)",
    price: 1.5,
    description:
      "Tapiz botánico alegre con botones que abren hacia el mediodía regalando color continuo a tu espacio.",
    image: "/images/sin-fondo-plantas/trimmed/flor-de-las-11.png",
    transparentImage: "/images/sin-fondo-plantas/trimmed/flor-de-las-11.png",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Ama el sol y temperaturas templadas; regar con moderación.",
  },
];

export function evaluateCombo(plant: Plant, planter: Product): ComboEvaluation {
  const planterCat = planter.sizeCategory;

  // 1. Compatibilidad Ideal
  if (
    (plant.size === "pequena" && (planterCat === "pequena" || planterCat === "colgante")) ||
    (plant.size === "mediana" && planterCat === "mediana") ||
    (plant.size === "pequena" && planterCat === "mediana")
  ) {
    return {
      isIdeal: true,
      status: "ideal",
      badgeText: "Combinación ideal",
      title: "Equilibrio Botánico Perfecto",
      message:
        "El volumen radicular de esta planta se desarrollará pleno y cómodo en esta maceta. El drenaje y la profundidad son óptimos para su crecimiento saludable.",
    };
  }

  // 2. Planta Mediana en Maceta Pequeña
  if (plant.size === "mediana" && (planterCat === "pequena" || planterCat === "colgante")) {
    return {
      isIdeal: false,
      status: "warning",
      badgeText: "Crecimiento limitado",
      title: "Aviso de Compatibilidad",
      message:
        "Esta planta tiende a crecer más de lo que esta maceta permite cómodamente — sus raíces podrían quedar apretadas con el tiempo.",
      suggestedPlant: "Echeveria Serena, Echeveria Lilac Mist o Flor de las 11",
      suggestedPlanter: "Combo Cestas Trenzadas, Vasija Curva Set o Maceta Carrito Van Retro",
    };
  }

  // 3. Planta Grande en Maceta Pequeña o Mediana (Por si se añaden especies grandes a futuro)
  if (plant.size === "grande") {
    if (planterCat === "pequena" || planterCat === "colgante") {
      return {
        isIdeal: false,
        status: "warning",
        badgeText: "Raíces comprometidas",
        title: "Capacidad Reducida",
        message:
          "Esta especie desarrolla tallos pesados y raíces profundas. En esta maceta pequeña podría desestabilizarse o requerir trasplante a corto plazo.",
        suggestedPlant: "Echeveria Serena, Callisia Pink o Flor de las 11",
        suggestedPlanter: "Maceta Vasija Estilo Barro o Cesta Grande Trenzada",
      };
    }
    return {
      isIdeal: true,
      status: "ideal",
      badgeText: "Combinación equilibrada",
      title: "Desarrollo Óptimo",
      message:
        "Maceta espaciosa que ofrece suficiente anclaje para una planta de porte majestuoso.",
    };
  }

  return {
    isIdeal: true,
    status: "ideal",
    badgeText: "Armonía Botánica",
    title: "Buena Compatibilidad",
    message: "Esta combinación es armoniosa para decorar tu hogar y cuidar de tus plantas.",
  };
}

// 15 Combos Pre-armados y Pre-aprobados para el Modo Sorpresa (Exclusivamente con las 5 especies reales de Ixchel)
export const surpriseCombos: SurpriseCombo[] = [
  {
    id: "sorpresa-viajero-vintage",
    name: "El Viajero Vintage",
    tagline: "Echeveria Serena sobre Maceta Auto Retro",
    plantId: "planta-echeveria",
    planterSlug: "maceta-auto-retro",
    comboPrice: 5.0,
    badge: "Favorito Clásico",
    description:
      "Una roseta compacta que corona el asiento del auto clásico, creando una atmósfera nostálgica y encantadora.",
  },
  {
    id: "sorpresa-hogar-hadas",
    name: "Hogar de Hadas Encantado",
    tagline: "Flor de las 11 en Maceta Casa Hongo",
    plantId: "planta-flor-11",
    planterSlug: "maceta-casa-hongo",
    comboPrice: 4.49,
    badge: "Mágico",
    description:
      "La alegre floración diurna asoma sobre la techumbre de hongo como un destello vivo en esta casita de cuento.",
  },
  {
    id: "sorpresa-brisa-marina",
    name: "Brisa Marina Costera",
    tagline: "Echeveria Lilac Mist en Maceta Concha Orgánica",
    plantId: "planta-echeveria-lilac",
    planterSlug: "maceta-concha-organica",
    comboPrice: 4.25,
    badge: "Costero",
    description:
      "Los tonos niebla lila de la roseta parecen una perla botánica anidada en el cuenco protector de la caracola marina.",
  },
  {
    id: "sorpresa-ruta-camper",
    name: "Ruta Camper Bohemia",
    tagline: "Flor de las 11 en Maceta Carrito Van Retro",
    plantId: "planta-flor-11",
    planterSlug: "maceta-carrito-van-retro",
    comboPrice: 5.0,
    badge: "Aventura",
    description:
      "Una furgoneta lista para rodar con botones florales vivos que aportan alegría y color a cualquier rincón.",
  },
  {
    id: "sorpresa-canasto-natural",
    name: "Canasto Botánico Rústico",
    tagline: "Callisia Pink en Cesta Grande Trenzada",
    plantId: "planta-callisia",
    planterSlug: "cesta-grande-trenzada",
    comboPrice: 5.99,
    badge: "Elegancia Natural",
    description:
      "El follaje rosado y denso de la callisia llena generosamente el tazón trenzado con textura de mimbre artesanal.",
  },
  {
    id: "sorpresa-cascada-amor",
    name: "Cascada de Amor Colgante",
    tagline: "Callisia Pink en Maceta Vasija Estilo Barro Colgante",
    plantId: "planta-callisia",
    planterSlug: "maceta-vasija-estilo-barro",
    comboPrice: 5.99,
    badge: "Colgante",
    description:
      "Ramas delicadas de tonalidades rosa pastel que se derraman con gracia sobre el relieve tradicional en barro.",
  },
  {
    id: "sorpresa-escultura-curva",
    name: "Escultura Serena Curva",
    tagline: "Echeveria Ives Fred Monstruosa en Maceta Vasija Curva",
    plantId: "planta-fred-ives",
    planterSlug: "maceta-vasija-curva",
    comboPrice: 6.24,
    badge: "Zen",
    description:
      "Crecimiento escultórico exótico que resalta con elegancia pura frente a las líneas suaves de la vasija blanca.",
  },
  {
    id: "sorpresa-duo-rustico",
    name: "Dúo Silvestre en Cestas",
    tagline: "Echeveria Serena en Combo Cestas Trenzadas",
    plantId: "planta-echeveria",
    planterSlug: "combo-cestas-trenzadas",
    comboPrice: 6.5,
    badge: "Set Dúo",
    description:
      "Textura de canasta tradicional con rosetas carnosas que alegran escritorios y recibidores familiares.",
  },
  {
    id: "sorpresa-nido-silvestre",
    name: "Nido Silvestre Mini",
    tagline: "Echeveria Lilac Mist en Cesta Pequeña Trenzada",
    plantId: "planta-echeveria-lilac",
    planterSlug: "cesta-pequena-trenzada",
    comboPrice: 3.25,
    badge: "Mini Detalle",
    description:
      "Un formato íntimo y dulce para espacios reducidos o regalo botánico sorpresa.",
  },
  {
    id: "sorpresa-oasis-felino",
    name: "Tributo Gatuno Botánico",
    tagline: "Echeveria Serena en Florero Pata de Gato",
    plantId: "planta-echeveria",
    planterSlug: "florero-pata-de-gato",
    comboPrice: 3.49,
    badge: "Pet Friendly",
    description:
      "El toque tierno y juguetón de la patita de gato coronada por una simétrica roseta lila pastel.",
  },
  {
    id: "sorpresa-bosque-niebla",
    name: "Bosque Encantado en Casa",
    tagline: "Echeveria Lilac Mist en Maceta Casa Hongo",
    plantId: "planta-echeveria-lilac",
    planterSlug: "maceta-casa-hongo",
    comboPrice: 4.74,
    badge: "Fantasía",
    description:
      "La roseta compacta niebla lila brota sobre la techumbre de hongo creando un rincón de ensueño.",
  },
  {
    id: "sorpresa-safari-camper",
    name: "Safari Botánico Van",
    tagline: "Echeveria Ives Fred Monstruosa en Maceta Carrito Van Retro",
    plantId: "planta-fred-ives",
    planterSlug: "maceta-carrito-van-retro",
    comboPrice: 5.75,
    badge: "Explorador",
    description:
      "Porte audaz y silueta llamativa en una van clásica lista para conquistar tu repisa favorita.",
  },
  {
    id: "sorpresa-corazon-rosa",
    name: "Amor Botánico Callisia",
    tagline: "Callisia Pink en Maceta Corazón",
    plantId: "planta-callisia",
    planterSlug: "maceta-corazon",
    comboPrice: 3.5,
    badge: "Romántico",
    description:
      "Destellos rosados y hojas menudas que coronan la silueta de corazón, el detalle perfecto para regalar amor.",
  },
  {
    id: "sorpresa-jardin-concha",
    name: "Jardín Marino de Rosetas",
    tagline: "Echeveria Serena en Maceta Concha Orgánica",
    plantId: "planta-echeveria",
    planterSlug: "maceta-concha-organica",
    comboPrice: 4.0,
    badge: "Playa & Sol",
    description:
      "La roseta de echeveria parece una perla vegetal anidada en el cuenco protector de la caracola marina.",
  },
  {
    id: "sorpresa-tarde-de-te",
    name: "Tarde Botánica de Té",
    tagline: "Flor de las 11 en Maceta Tetera",
    plantId: "planta-flor-11",
    planterSlug: "maceta-tetera",
    comboPrice: 6.0,
    badge: "Edición Especial",
    description:
      "Flores alegres que brotan del interior de la tetera artesanal, evocando sobremesas acogedoras y cálidas.",
  },
];

export interface PlanterVisualProfile {
  baseWidth: number;
  overlapRatio: number;
  xOffsetRatio: number;
  scaleMultiplier?: number;
}

export const PLANTER_VISUAL_PROFILE: Record<string, PlanterVisualProfile> = {
  "maceta-auto-retro": { baseWidth: 200, overlapRatio: 0.28, xOffsetRatio: -0.04 },
  "combo-cestas-trenzadas": { baseWidth: 220, overlapRatio: 0.40, xOffsetRatio: -0.18, scaleMultiplier: 0.70 },
  "maceta-vasija-curva": { baseWidth: 200, overlapRatio: 0.35, xOffsetRatio: 0 },
  "maceta-vasija-estilo-barro": { baseWidth: 200, overlapRatio: 0.22, xOffsetRatio: 0 },
  "maceta-carrito-van-retro": { baseWidth: 205, overlapRatio: 0.35, xOffsetRatio: -0.02 },
  "florero-pata-de-gato": { baseWidth: 110, overlapRatio: 0.12, xOffsetRatio: 0 },
  "maceta-casa-hongo": { baseWidth: 195, overlapRatio: 0.22, xOffsetRatio: 0 },
  "maceta-concha-organica": { baseWidth: 205, overlapRatio: 0.36, xOffsetRatio: -0.12 },
  "maceta-corazon": { baseWidth: 200, overlapRatio: 0.35, xOffsetRatio: 0 },
  "maceta-tetera": { baseWidth: 205, overlapRatio: 0.27, xOffsetRatio: 0 },
};

export const PLANT_ASPECT_RATIOS: Record<string, number> = {
  "planta-callisia": 1.468,
  "planta-fred-ives": 1.336,
  "planta-echeveria-lilac": 0.986,
  "planta-echeveria": 1.139,
  "planta-flor-11": 1.624,
};

export const PLANTER_ASPECT_RATIOS: Record<string, number> = {
  "maceta-auto-retro": 1.237,
  "combo-cestas-trenzadas": 1.656,
  "maceta-vasija-curva": 1.166,
  "maceta-vasija-estilo-barro": 1.029,
  "maceta-carrito-van-retro": 1.268,
  "florero-pata-de-gato": 0.541,
  "maceta-casa-hongo": 0.995,
  "maceta-concha-organica": 1.303,
  "maceta-corazon": 1.170,
  "maceta-tetera": 1.358,
};

export function calculateComboComposition(
  plant: Plant,
  planter: Product,
  scale: number = 1.0
) {
  const profile = PLANTER_VISUAL_PROFILE[planter.slug] || {
    baseWidth: 200,
    overlapRatio: 0.25,
    xOffsetRatio: 0,
  };

  const planterAspect = PLANTER_ASPECT_RATIOS[planter.slug] || 1.2;
  const planterVisualWidth = Math.round(profile.baseWidth * scale);
  const planterVisualHeight = Math.round(planterVisualWidth / planterAspect);

  const text = `${planter.dimensions?.width || ""} ${planter.dimensions?.diameter || ""} ${planter.dimensions?.formatted || ""}`;
  const match = text.match(/([\d.]+)\s*cm/i);
  const planterWidthCm = match ? parseFloat(match[1]) : 9.5;

  let plantNominalCm = 8.5;
  if (plant.size === "pequena") plantNominalCm = 8.0;
  else if (plant.size === "mediana") plantNominalCm = 10.5;
  else if (plant.size === "grande") plantNominalCm = 13.5;

  const rawRatio = plantNominalCm / Math.max(planterWidthCm, 5.0);
  const multiplier = profile.scaleMultiplier || 1.0;
  const plantScaleFactor = Math.min(Math.max(rawRatio * multiplier, 0.55), 1.30);

  const plantAspect = PLANT_ASPECT_RATIOS[plant.id] || 1.2;
  const plantVisualWidth = Math.round(planterVisualWidth * plantScaleFactor);
  const plantVisualHeight = Math.round(plantVisualWidth / plantAspect);

  const effectiveMarginBottom = Math.round(planterVisualHeight * profile.overlapRatio);
  const effectiveXOffset = Math.round(planterVisualWidth * profile.xOffsetRatio);

  return {
    planterVisualWidth,
    planterVisualHeight,
    plantVisualWidth,
    plantVisualHeight,
    effectiveMarginBottom,
    effectiveXOffset,
  };
}

export function createComboCartProduct(
  plant: Plant,
  planter: Product,
  customName?: string,
  customPrice?: number
): Product {
  const isPendingPrice = planter.priceDisplay !== undefined || planter.price === 0;
  const calculatedPrice =
    customPrice ?? (planter.price > 0 ? Number((plant.price + planter.price).toFixed(2)) : plant.price);

  return {
    id: `combo-${plant.id}-${planter.id}`,
    slug: `combo-${plant.id}-${planter.id}`,
    name: customName || `Combo: ${plant.name} + ${planter.name}`,
    subtitle: `Planta viva aclimatada en maceta artesanal Ixchel`,
    shortDescription: `Pareja botánica lista para decorar: ${plant.name} cultivada especialmente para la silueta de ${planter.name}.`,
    description: `Combo especial preparado a mano por la familia Ixchel. Incluye la planta viva ${plant.name} y la maceta artesanal ${planter.name} con orificio de drenaje funcional calibrado.`,
    price: calculatedPrice,
    priceDisplay: isPendingPrice ? "[PENDIENTE: precio]" : undefined,
    transparentImage: planter.transparentImage,
    dimensions: planter.dimensions,
    finish: planter.finish,
    finishLabel: `Acabado ${planter.finishLabel}`,
    colors: planter.colors,
    sizeCategory: planter.sizeCategory,
    sizeLabel: `Combo (${planter.sizeLabel})`,
    drainage: planter.drainage,
    includesSaucer: planter.includesSaucer,
    images: planter.images,
    badge: "Combo Botánico",
    featured: false,
    inStock: true,
    craftProcess: `Selección de planta viva con cepellón sano, asentada en la maceta ${planter.name} con sustrato drenante.`,
    plantCare: {
      recommendedSpecies: `${plant.name} (${plant.subtitle})`,
      light: "Luz brillante filtrada o sol suave de mañana.",
      watering: plant.careTip,
      substrate: "Sustrato específico para plantas de interior y crasas.",
      careTip: plant.careTip,
    },
  };
}
