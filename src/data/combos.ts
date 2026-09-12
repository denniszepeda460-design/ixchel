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
  image: string; // Transparent botanical layer
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
  {
    id: "planta-echeveria",
    name: "Suculenta Echeveria",
    subtitle: "Roseta compacta verde jade con puntas rosadas",
    size: "pequena",
    sizeLabel: "Pequeña (Compacta)",
    price: 1.5,
    description: "Crasa noble de crecimiento contenido. Perfecta para macetas bajas y cuencos decorativos.",
    image: "/images/plants/echeveria.svg",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Riego cada 10 a 14 días cuando la tierra esté seca al tacto.",
  },
  {
    id: "planta-cactus",
    name: "Mini Cactus San Pedro",
    subtitle: "Cuerpo estriado vertical con floración estival",
    size: "pequena",
    sizeLabel: "Pequeña (Vertical)",
    price: 1.5,
    description: "Estructura geométrica limpia que añade altura sin requerir gran volumen radicular.",
    image: "/images/plants/cactus.svg",
    recommendedPlanterCategory: ["pequena"],
    careTip: "Luz solar indirecta abundante y riego muy espaciado.",
  },
  {
    id: "planta-haworthia",
    name: "Haworthia Cebra",
    subtitle: "Hojas carnosas con franjas blancas en relieve",
    size: "pequena",
    sizeLabel: "Pequeña (Robusta)",
    price: 1.75,
    description: "Muy resistente a interiores. Sus líneas blancas combinan en contraste con macetas artesanales.",
    image: "/images/plants/haworthia.svg",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Tolera semisombra; mantener el sustrato drenante.",
  },
  {
    id: "planta-sedum",
    name: "Sedum Burrito",
    subtitle: "Tallos colgantes con hojitas carnosas tipo cuentas",
    size: "pequena",
    sizeLabel: "Pequeña (Colgante)",
    price: 1.5,
    description: "Genera un efecto cascada suave que desborda con gracia sobre los bordes de la maceta.",
    image: "/images/plants/sedum.svg",
    recommendedPlanterCategory: ["pequena", "colgante"],
    careTip: "Evitar manipular las hojas directamente para no desprenderlas.",
  },
  {
    id: "planta-string-of-hearts",
    name: "String of Hearts",
    subtitle: "Enredadera fina de hojas en forma de corazón",
    size: "pequena",
    sizeLabel: "Pequeña / Colgante",
    price: 2.0,
    description: "Guías delicadas de tonos plateados y púrpura que caen libremente creando un velo botánico.",
    image: "/images/plants/string-of-hearts.svg",
    recommendedPlanterCategory: ["colgante", "pequena"],
    careTip: "Excelente para estantes altos o macetas de pared.",
  },
  {
    id: "planta-peperomia",
    name: "Peperomia Sandía",
    subtitle: "Hojas ovaladas con franjas plateadas y tallos rojizos",
    size: "mediana",
    sizeLabel: "Mediana (Follaje)",
    price: 2.5,
    description: "Follaje denso y decorativo de copa redondeada. Exige mayor profundidad de cepellón.",
    image: "/images/plants/peperomia.svg",
    recommendedPlanterCategory: ["mediana"],
    careTip: "Mantener humedad ambiental sin encharcar las raíces.",
  },
  {
    id: "planta-pothos",
    name: "Pothos Dorado",
    subtitle: "Hojas acorazonadas variegadas con destellos amarillos",
    size: "mediana",
    sizeLabel: "Mediana (Vigorosa)",
    price: 2.5,
    description: "Planta trepadora o colgante sumamente adaptable. Desarrolla rápido su sistema radicular.",
    image: "/images/plants/pothos.svg",
    recommendedPlanterCategory: ["mediana", "colgante"],
    careTip: "Crece vigorosamente con riego semanal y buena luz difusa.",
  },
  {
    id: "planta-sansevieria",
    name: "Sansevieria Laurentii",
    subtitle: "Espadas verticales verdes con margen amarillo dorado",
    size: "grande",
    sizeLabel: "Grande (Arquitectónica)",
    price: 3.5,
    description: "Porte majestuoso y purificadora de aire. Requiere macetas firmes y amplias para anclarse.",
    image: "/images/plants/sansevieria.svg",
    recommendedPlanterCategory: ["mediana", "grande"],
    careTip: "Casi indestructible; regar únicamente cuando el sustrato esté seco.",
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
      suggestedPlant: "Suculenta Echeveria, Haworthia Cebra o Sedum Burrito",
      suggestedPlanter: "Combo Cestas Trenzadas, Vasija Curva Set o Cesta Grande",
    };
  }

  // 3. Planta Grande en Maceta Pequeña o Mediana
  if (plant.size === "grande") {
    if (planterCat === "pequena" || planterCat === "colgante") {
      return {
        isIdeal: false,
        status: "warning",
        badgeText: "Raíces comprometidas",
        title: "Capacidad Reducida",
        message:
          "Esta especie desarrolla tallos pesados y raíces profundas. En esta maceta pequeña podría desestabilizarse o requerir trasplante a corto plazo.",
        suggestedPlant: "Mini Cactus San Pedro o Haworthia Cebra",
        suggestedPlanter: "Combo Cestas Trenzadas o Cesta Grande Trenzada",
      };
    }
    return {
      isIdeal: true,
      status: "ideal",
      badgeText: "Ajuste viable",
      title: "Aceptable con Mantenimiento",
      message:
        "La planta cabe bien en este tamaño, aunque recomendamos poda ligera de raíces o trasplante en el transcurso de un año.",
    };
  }

  return {
    isIdeal: true,
    status: "ideal",
    badgeText: "Combinación viable",
    title: "Buena Elección",
    message: "Esta combinación es armoniosa para decorar tu hogar y cuidar de tus plantas.",
  };
}

// 15 Combos Pre-armados y Pre-aprobados para el Modo Sorpresa
export const surpriseCombos: SurpriseCombo[] = [
  {
    id: "sorpresa-viajero-vintage",
    name: "El Viajero Vintage",
    tagline: "Suculenta Echeveria sobre Maceta Auto Retro",
    plantId: "planta-echeveria",
    planterSlug: "maceta-auto-retro",
    comboPrice: 5.0,
    badge: "Favorito Clásico",
    description: "Una roseta compacta que corona el asiento del auto clásico, creando una atmósfera nostálgica y encantadora.",
  },
  {
    id: "sorpresa-hogar-hadas",
    name: "Hogar de Hadas Encantado",
    tagline: "Mini Cactus San Pedro en Maceta Casa Hongo",
    plantId: "planta-cactus",
    planterSlug: "maceta-casa-hongo",
    comboPrice: 4.49,
    badge: "Mágico",
    description: "El mini cactus asoma por el techo de hongo como una chimenea viva en esta casita de cuento.",
  },
  {
    id: "sorpresa-brisa-marina",
    name: "Brisa Marina Costera",
    tagline: "Sedum Burrito en Maceta Concha Orgánica",
    plantId: "planta-sedum",
    planterSlug: "maceta-concha-organica",
    comboPrice: 4.0,
    badge: "Costero",
    description: "Las cuentas carnosas del sedum caen suavemente sobre el contorno nacarado de la concha marina.",
  },
  {
    id: "sorpresa-ruta-camper",
    name: "Ruta Camper Bohemia",
    tagline: "Haworthia Cebra en Maceta Carrito Van Retro",
    plantId: "planta-haworthia",
    planterSlug: "maceta-carrito-van-retro",
    comboPrice: 5.25,
    badge: "Aventura",
    description: "Una furgoneta lista para rodar con una resistente haworthia que simula equipaje verde en el techo.",
  },
  {
    id: "sorpresa-canasto-natural",
    name: "Canasto Botánico Rústico",
    tagline: "Peperomia Sandía en Cesta Grande Trenzada",
    plantId: "planta-peperomia",
    planterSlug: "cesta-grande-trenzada",
    comboPrice: 6.49,
    badge: "Elegancia Natural",
    description: "Las hojas rayadas de la peperomia llenan generosamente el tazón trenzado con textura de mimbre.",
  },
  {
    id: "sorpresa-cascada-corazones",
    name: "Cascada de Amor Familiar",
    tagline: "String of Hearts en Maceta Vasija Estilo Barro Colgante",
    plantId: "planta-string-of-hearts",
    planterSlug: "maceta-vasija-estilo-barro",
    comboPrice: 5.99,
    badge: "Colgante",
    description: "Guías con hojas en forma de corazón que se derraman sobre el relieve tradicional en barro.",
  },
  {
    id: "sorpresa-serenidad-curva",
    name: "Serenidad Orgánica",
    tagline: "Pothos Dorado en Maceta Vasija Curva (Set L/S)",
    plantId: "planta-pothos",
    planterSlug: "maceta-vasija-curva",
    comboPrice: 6.49,
    badge: "Zen",
    description: "Hojas acorazonadas que contrastan con las curvas suaves y la boca ondulada de la vasija blanca.",
  },
  {
    id: "sorpresa-duo-rustico",
    name: "Dúo Silvestre en Cestas",
    tagline: "Suculenta Echeveria en Combo Cestas Trenzadas",
    plantId: "planta-echeveria",
    planterSlug: "combo-cestas-trenzadas",
    comboPrice: 6.5,
    badge: "Set Dúo",
    description: "Textura de canasta tradicional con plantas carnosas que alegran escritorios y recibidores.",
  },
  {
    id: "sorpresa-nido-silvestre",
    name: "Nido Silvestre Mini",
    tagline: "Haworthia Cebra en Cesta Pequeña Trenzada",
    plantId: "planta-haworthia",
    planterSlug: "cesta-pequena-trenzada",
    comboPrice: 3.25,
    badge: "Mini Detalle",
    description: "Un formato íntimo y dulce para espacios reducidos o regalo botánico sorpresa.",
  },
  {
    id: "sorpresa-oasis-felino",
    name: "Tributo Gatuno Silvestre",
    tagline: "String of Hearts en Florero Pata de Gato",
    plantId: "planta-string-of-hearts",
    planterSlug: "florero-pata-de-gato",
    comboPrice: 3.99,
    badge: "Mascotas",
    description: "Tallos sutiles que surgen de la huella felina, un homenaje a los compañeros de cuatro patas.",
  },
  {
    id: "sorpresa-jardin-hadas",
    name: "Jardín Secreto de Hadas",
    tagline: "Haworthia Cebra en Maceta Casa Hongo Encantada",
    plantId: "planta-haworthia",
    planterSlug: "maceta-casa-hongo",
    comboPrice: 4.74,
    badge: "Cuento Vivo",
    description: "Las líneas de la haworthia imitan pinos mágicos junto a la puerta de la casita hongo.",
  },
  {
    id: "sorpresa-perla-costera",
    name: "Perla de la Costa",
    tagline: "Suculenta Echeveria en Maceta Concha Orgánica",
    plantId: "planta-echeveria",
    planterSlug: "maceta-concha-organica",
    comboPrice: 4.0,
    badge: "Mar y Tierra",
    description: "Una roseta perfecta reposando en el cuenco de la caracola marina curada al sol.",
  },
  {
    id: "sorpresa-aventura-van",
    name: "Viaje Botánico Rodante",
    tagline: "Mini Cactus San Pedro en Maceta Carrito Van Retro",
    plantId: "planta-cactus",
    planterSlug: "maceta-carrito-van-retro",
    comboPrice: 5.0,
    badge: "Aventura",
    description: "Un cactus erguido que viaja en la furgoneta clásica rumbo a nuevos horizontes verdes.",
  },
  {
    id: "sorpresa-bosque-rustico",
    name: "Bosque Artesanal en Tazón",
    tagline: "Pothos Dorado en Cesta Grande Trenzada",
    plantId: "planta-pothos",
    planterSlug: "cesta-grande-trenzada",
    comboPrice: 6.49,
    badge: "Frondoso",
    description: "Volumen verde abundante contenido en un tazón trenzado que evoca la cestería de pueblo.",
  },
  {
    id: "sorpresa-reliquia-retro",
    name: "Reliquia Verde de Colección",
    tagline: "Sedum Burrito en Maceta Auto Retro",
    plantId: "planta-sedum",
    planterSlug: "maceta-auto-retro",
    comboPrice: 5.0,
    badge: "Colección",
    description: "El auto vintage transportando un cargamento de brotes frescos de sedum en su cabina.",
  },
];

export function createComboCartProduct(
  plant: Plant,
  planter: Product,
  customName?: string,
  customPrice?: number
): Product {
  const price = customPrice ?? Number((plant.price + planter.price).toFixed(2));
  const name = customName ?? `Combo: ${plant.name} + ${planter.name}`;

  return {
    id: `combo-${plant.id}-${planter.id}-${Date.now()}`,
    slug: planter.slug,
    name,
    subtitle: `Planta viva (${plant.name}) en maceta artesanal (${planter.name})`,
    shortDescription: `Combo completo: incluye la planta ${plant.name} y la pieza artesanal ${planter.name}. Coordinación en punto de encuentro o envío seguro.`,
    description: `Este combo une la belleza de la planta viva ${plant.name} con la maceta artesanal ${planter.name}. Diseñado en armonía para embellecer tu hogar desde el primer día.`,
    price,
    dimensions: {
      ...planter.dimensions,
      formatted: `${planter.dimensions.formatted} (Planta: ${plant.sizeLabel})`,
      disclaimer: "Combo con planta viva. Se coordina preferentemente en punto de encuentro.",
    },
    finish: planter.finish,
    finishLabel: `Combo Planta + ${planter.finishLabel}`,
    colors: planter.colors,
    sizeCategory: planter.sizeCategory,
    sizeLabel: `Combo (${planter.sizeLabel})`,
    drainage: planter.drainage,
    includesSaucer: planter.includesSaucer,
    images: planter.images,
    badge: "Combo Planta + Maceta",
    featured: false,
    inStock: true,
    craftProcess: planter.craftProcess,
    plantCare: {
      ...planter.plantCare,
      recommendedSpecies: plant.name,
      careTip: `${plant.careTip} Asegúrate de que el sustrato mantenga buen drenaje en la ${planter.name}.`,
    },
  };
}
