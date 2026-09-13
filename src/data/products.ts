export interface PlantCare {
  light: string;
  watering: string;
  substrate: string;
  recommendedSpecies: string;
  careTip: string;
}

export interface ProductDimensions {
  height: string;
  diameter: string;
  width?: string;
  formatted: string; // Formato consistente: "Ancho x Alto (cm/in)" o "[PENDIENTE: medidas]"
  formattedSummary?: string;
  isApproximate?: boolean;
  approximateNote?: string;
  disclaimer?: string;
  capacity?: string;
  weight?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  price: number;
  priceDisplay?: string; // Placeholder explícito si el precio está pendiente: "[PENDIENTE: precio]"
  transparentImage?: string; // Ruta a la versión sin fondo en /images/sin-fondo-macetas/
  dimensions: ProductDimensions;
  finish: "natural" | "color";
  finishLabel: string;
  colors: string[];
  sizeCategory: "pequena" | "mediana" | "grande" | "colgante";
  sizeLabel: string;
  drainage: string;
  includesSaucer: boolean;
  images: string[];
  badge?: string;
  featured: boolean;
  inStock: boolean;
  onSale?: boolean;
  regularPrice?: number;
  salePrice?: number;
  craftProcess: string;
  plantCare: PlantCare;
}

export function getDiscountPercentage(product: Product): number | null {
  if (!product.onSale || !product.regularPrice || !product.salePrice) return null;
  return Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100);
}

export const products: Product[] = [
  // 1. Maceta Auto Retro (Vintage 1930s)
  {
    id: "ixchel-auto-retro",
    slug: "maceta-auto-retro",
    name: "Maceta Auto Retro",
    subtitle: "Diseño temático clásico de auto vintage para mini suculentas",
    shortDescription:
      "Pieza artesanal inspirada en autos clásicos de época, con proporciones ideales para cactus y suculentas miniatura.",
    description:
      "Elaborada con esmero en nuestro estudio familiar. Su detallada silueta evoca los automóviles clásicos de colección, transformando cualquier repisa o rincón botánico en un espacio nostálgico y lleno de encanto.",
    price: 3.5,
    transparentImage: "/images/sin-fondo-macetas/trimmed/carro-sin-fondo.png",
    dimensions: {
      height: "4.9 cm (1.93 in)",
      diameter: "10.5 cm (4.13 in) de ancho",
      width: "10.5 cm (4.13 in)",
      formatted: "10.5 x 4.9 cm (4.13 x 1.93 in)",
      formattedSummary: "10.5 x 4.9 cm",
      isApproximate: false,
      capacity: "0.25 Litros",
      weight: "220 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Blanco, Café, Rojo, Azul)",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (10.5 x 4.9 cm)",
    drainage: "Orificio inferior calibrado para drenaje libre de agua.",
    includesSaucer: false,
    images: ["/images/carro.png"],
    badge: "Diseño Retro",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeado minucioso de carrocería, perforación de drenaje y curado paciente al sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Echeveria Serena, Echeveria Lilac Mist o crasas miniatura",
      light: "Luz solar directa suave o resolana brillante.",
      watering: "Riego espaciado con rociador o pipeta cada 10 a 14 días.",
      substrate: "Sustrato mineral con piedra pómez fina.",
      careTip: "Ideal para iluminar pequeños escritorios o estantes luminosos.",
    },
  },

  // 2. Combo Cestas Trenzadas (Grande + Pequeña)
  // [NOTA: "canastas.png" muestra el set de 2 cestas juntas; mapeado al Combo. Marcar para revisión si requiere archivo individual]
  {
    id: "ixchel-cestas",
    slug: "combo-cestas-trenzadas",
    name: "Combo Cestas Trenzadas (Grande + Pequeña)",
    subtitle: "Set de dos macetas nido con textura de cordón trenzado",
    shortDescription:
      "Dúo armónico de cuencos artesanales con acabado rústico trenzado, perfectos para lucir en pareja.",
    description:
      "Elaboradas en nuestro taller familiar en La Libertad. Su textura entrelazada aporta calidez artesanal y una superficie táctil agradable. Incluye dos tamaños complementarios para crear composiciones botánicas equilibradas.",
    price: 5.0,
    transparentImage: "/images/sin-fondo-macetas/trimmed/canastas.png",
    dimensions: {
      height: "Grande: 5.6 cm / Pequeña: 3.7 cm",
      diameter: "Grande: 8.8 cm / Pequeña: 6.3 cm",
      width: "Grande: 8.8 cm / Pequeña: 6.3 cm",
      formatted: "Grande: 8.8 x 5.6 cm (3.46 x 2.2 in) · Pequeña: 6.3 x 3.7 cm (2.48 x 1.46 in)",
      formattedSummary: "Set 2 piezas (~8.8 / 6.3 cm)",
      isApproximate: true,
      approximateNote: "Medidas aproximadas basadas en dimensiones de molde.",
      capacity: "0.4L (Grande) / 0.15L (Pequeña)",
      weight: "480 g (set)",
    },
    finish: "natural",
    finishLabel: "Acabado Texturizado Natural",
    colors: ["Blanco Base", "Café", "Rojo"],
    sizeCategory: "pequena",
    sizeLabel: "Set Combo (2 piezas)",
    drainage: "Ambas piezas con orificio central inferior.",
    includesSaucer: false,
    images: ["/images/cestas.png"],
    badge: "Set Dúo",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeado en parejas, desmolde manual con cuidado de trama trenzada y curado al sol.",
    plantCare: {
      recommendedSpecies: "Echeveria Serena en la pequeña, Callisia Pink en la grande",
      light: "Luz brillante filtrada.",
      watering: "Riego profundo dejando escurrir el exceso cada 8 a 10 días.",
      substrate: "Mezcla porosa rica en nutrientes.",
      careTip: "Ubícalas juntas para crear un juego dinámico de alturas en tu mesa o repisa.",
    },
  },

  // 3. Maceta Vasija Curva (Redonda Lisa, Set 2 piezas L/S)
  {
    id: "ixchel-vacija-curva",
    slug: "maceta-vasija-curva",
    name: "Maceta Vasija Curva (Set L/S)",
    subtitle: "Vasijas lisas de cuello ondulado tipo cuenco tradicional",
    shortDescription:
      "Forma redondeada con suave reborde ondeado en la boca, pensada para lucir rosetas o plantas péndulas.",
    description:
      "Inspirada en las tinajas tradicionales de nuestra tierra. El perfil redondeado ofrece una cámara radicular generosa y estable, mientras que el ribete superior ondulado enmarca con delicadeza cualquier follaje.",
    price: 3.99,
    transparentImage: "/images/sin-fondo-macetas/trimmed/maceta-vasija-curva.png",
    dimensions: {
      height: "Mold L: 6.3 cm / Mold S: 5.6 cm",
      diameter: "Mold L: 9.6 cm / Mold S: 8.4 cm",
      width: "Mold L: 9.6 cm / Mold S: 8.4 cm",
      formatted: "Mold L: 9.6 x 6.3 cm (3.78 x 2.48 in) · Mold S: 8.4 x 5.6 cm (3.31 x 2.2 in)",
      formattedSummary: "Set L/S (~9.6 / 8.4 cm)",
      isApproximate: true,
      approximateNote: "Medidas basadas en molde (L: 9.6x6.3 cm / S: 8.4x5.6 cm).",
      capacity: "0.5 Litros",
      weight: "390 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Set L/S (~9.6 cm)",
    drainage: "Orificio central inferior anti-encharcamiento.",
    includesSaucer: false,
    images: ["/images/vacija.png"],
    badge: "Set 2 Vasijas",
    featured: true,
    inStock: true,
    craftProcess:
      "Vaciado cuidadoso, pulido de ribete superior ondeado y curado bajo el sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Callisia Pink, Echeveria Lilac Mist o Flor de las 11",
      light: "Luz indirecta abundante.",
      watering: "Riego moderado 1 vez por semana según clima.",
      substrate: "Sustrato suelto enriquecido con perlita.",
      careTip: "Excelente para colocar en esquinas de escritorios o recibidores acogedores.",
    },
  },

  // 4. Maceta Vasija Estilo Barro Colgante
  {
    id: "ixchel-vacija-estilo-barro",
    slug: "maceta-vasija-estilo-barro",
    name: "Maceta Vasija Estilo Barro Colgante",
    subtitle: "Vasija esférica con orificios laterales para colgar con cuerda",
    shortDescription:
      "Diseño tradicional suspendible con silueta globosa, perfecta para enredaderas y cascadas de verde.",
    description:
      "Un homenaje a la alfarería ancestral con vocación aérea. Sus pasadores laterales permiten suspenderla con mecate de yute o cordón de algodón natural, optimizando el espacio vertical de tu hogar.",
    price: 3.99,
    transparentImage: "/images/sin-fondo-macetas/trimmed/maceta-vasija-estilo-barro-colgante.png",
    dimensions: {
      height: "6.8 cm (2.68 in)",
      diameter: "8.3 cm (3.27 in)",
      width: "8.3 cm (3.27 in)",
      formatted: "8.3 x 6.8 cm (3.27 x 2.68 in)",
      formattedSummary: "~8.3 x 6.8 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde (8.3 x 6.8 cm).",
      capacity: "0.35 Litros",
      weight: "310 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural / Textura Barro",
    colors: ["Blanco Base", "Café", "Rojo"],
    sizeCategory: "colgante",
    sizeLabel: "Colgante (~8.3 x 6.8 cm)",
    drainage: "Orificio inferior funcional con drenaje activo.",
    includesSaucer: false,
    images: ["/images/vacija_2.png"],
    badge: "Apta para Colgar",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeado con refuerzo en puntos de suspensión y perforación de drenaje inferior.",
    plantCare: {
      recommendedSpecies: "Callisia Pink o Flor de las 11",
      light: "Luz brillante filtrada sin sol abrasador directo.",
      watering: "Riego controlado con pipeta para evitar goteo excesivo.",
      substrate: "Sustrato liviano de alta aireación.",
      careTip: "Cuelga cerca de una ventana donde las guías puedan descender con libertad.",
    },
  },

  // 5. Maceta Carrito Van Retro
  {
    id: "ixchel-carrito-van-retro",
    slug: "maceta-carrito-van-retro",
    name: "Maceta Carrito Van Retro",
    subtitle: "Van clásica camper con detalles moldeados en carrocería",
    shortDescription:
      "Maceta temática en forma de van clásica, espaciosa y perfecta para crear un mini jardín rodante de suculentas.",
    description:
      "Para espíritus viajeros y amantes de lo retro. Su amplia apertura superior permite sembrar varias suculentas en armonía, simulando un camper cargado de vida y aventura.",
    price: 3.5,
    transparentImage: "/images/sin-fondo-macetas/trimmed/maceta-carrito-van-retro.png",
    dimensions: {
      height: "5.6 cm (2.2 in)",
      diameter: "9.9 cm (3.9 in) de largo",
      width: "9.9 cm (3.9 in)",
      formatted: "9.9 x 5.6 cm (3.9 x 2.2 in)",
      formattedSummary: "9.9 x 5.6 cm",
      isApproximate: false,
      capacity: "0.3 Litros",
      weight: "270 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Blanco, Rojo, Azul, Café)",
    colors: ["Blanco Base", "Rojo", "Azul", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (9.9 x 5.6 cm)",
    drainage: "Drenaje funcional en la base para cuidar raíces.",
    includesSaucer: false,
    images: ["/images/bus.png"],
    badge: "Edición Camper",
    featured: false,
    inStock: true,
    craftProcess:
      "Vaciado detallado de carrocería, perforación inferior y curado al sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Crassula ovata mini, Kalanchoe o Graptopetalum",
      light: "Luz abundante indirecta.",
      watering: "Regar cada 10 días dejando secar totalmente la tierra.",
      substrate: "Sustrato mineral con piedra pómez fina.",
      careTip: "Siembra 2 variedades contrastantes para un efecto camper florido.",
    },
  },

  // 6. Florero Pata de Gato (Solo Molde)
  {
    id: "ixchel-pata-de-gato",
    slug: "florero-pata-de-gato",
    name: "Florero Pata de Gato",
    subtitle: "Silueta alargada con relieve de huellitas felinas (Solo Molde de Silicona)",
    shortDescription:
      "Molde de silicona flexible de alta precisión para fabricar floreros o lapiceros en forma de patita de gato.",
    description:
      "Molde de silicona para crear piezas decorativas con relieve felino. Permite vaciar resina, yeso o cemento blanco con facilidad gracias a su flexibilidad y desmolde suave.",
    price: 1.99,
    transparentImage: "/images/sin-fondo-macetas/trimmed/florero-pata-de-gato.png",
    dimensions: {
      height: "8.9 cm (3.5 in)",
      diameter: "6.2 cm (2.44 in)",
      width: "6.2 cm (2.44 in)",
      formatted: "6.2 x 8.9 cm (2.44 x 3.5 in)",
      formattedSummary: "~6.2 x 8.9 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada del molde de silicona (6.2 x 8.9 cm).",
      disclaimer: "Solo molde de silicona, no incluye producto terminado ni flores.",
      capacity: "Molde estándar",
      weight: "110 g",
    },
    finish: "natural",
    finishLabel: "Molde de Silicona Flexible",
    colors: ["Blanco Base"],
    sizeCategory: "pequena",
    sizeLabel: "Molde (~6.2 x 8.9 cm)",
    drainage: "Molde para vaciado artesanal.",
    includesSaucer: false,
    images: ["/images/pata-de-gato.png"],
    badge: "Solo Molde",
    featured: false,
    inStock: true,
    craftProcess:
      "Silicona duradera, resistente a vaciados repetidos de resina, cemento o cera.",
    plantCare: {
      recommendedSpecies: "Compatible con esquejes en agua o flor seca tras el vaciado",
      light: "Conservar el molde en lugar fresco y seco.",
      watering: "Lavar con agua tibia y jabón suave tras cada uso.",
      substrate: "Apto para yeso cerámico, resina epóxica o cemento blanco.",
      careTip: "Aplica desmoldante ligero para alargar la vida útil de los relieves.",
    },
  },

  // 7. Cesta Pequeña Trenzada
  // [PENDIENTE: falta versión sin fondo] - Se mantiene foto de catálogo normal como respaldo
  {
    id: "ixchel-cesta-pequena",
    slug: "cesta-pequena-trenzada",
    name: "Cesta Pequeña Trenzada",
    subtitle: "Cuenco individual con relieve trenzado para escritorio",
    shortDescription:
      "Maceta pequeña tipo cestita tejida, ideal para plantas suculentas de inicio o souvenirs artesanales.",
    description:
      "Pieza compacta elaborada con patrón de tejido rústico en relieve. Su tamaño contenido es perfecto para una roseta individual en escritorios, ventanas y mesitas de noche.",
    price: 1.5,
    dimensions: {
      height: "3.0 cm (1.18 in)",
      diameter: "6.5 cm (2.56 in) · Interior ~7.5 cm (2.95 in)",
      width: "6.5 cm (2.56 in)",
      formatted: "6.5 x 3.0 cm (2.56 x 1.18 in)",
      formattedSummary: "~6.5 x 3.0 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde (6.5 x 3.0 cm).",
      capacity: "0.15 Litros",
      weight: "160 g",
    },
    finish: "natural",
    finishLabel: "Acabado Texturizado Natural",
    colors: ["Blanco Base", "Café", "Rojo"],
    sizeCategory: "pequena",
    sizeLabel: "Mini (~6.5 x 3.0 cm)",
    drainage: "Orificio central calibrado en la base.",
    includesSaucer: false,
    images: ["/images/cesta-pequena.png"],
    badge: "Miniatura",
    featured: false,
    inStock: true,
    craftProcess:
      "Moldeado minucioso de textura trenzada y curado al sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Echeveria Serena o Echeveria Lilac Mist",
      light: "Luz brillante indirecta.",
      watering: "Riego medido con pipeta cada 10 días.",
      substrate: "Sustrato mineral con piedra pómez fina.",
      careTip: "Ideal para iluminar pequeños espacios de trabajo.",
    },
  },

  // 8. Cesta Grande Trenzada
  // [PENDIENTE: falta versión sin fondo] - Se mantiene foto de catálogo normal como respaldo
  {
    id: "ixchel-cesta-grande",
    slug: "cesta-grande-trenzada",
    name: "Cesta Grande Trenzada",
    subtitle: "Tazón de boca ancha con relieve trenzado profundo",
    shortDescription:
      "Maceta tipo canasto de mayor capacidad, perfecta para crasas de porte medio o grupos de mini plantas.",
    description:
      "De proporciones amplias y estables. El borde en cordón trenzado y el tejido lateral confieren resistencia y una atmósfera artesanal acogedora a tu rincón verde favorito.",
    price: 3.99,
    dimensions: {
      height: "5.6 cm (2.2 in)",
      diameter: "8.8 cm (3.46 in)",
      width: "8.8 cm (3.46 in)",
      formatted: "8.8 x 5.6 cm (3.46 x 2.2 in)",
      formattedSummary: "8.8 x 5.6 cm",
      isApproximate: false,
      capacity: "0.4 Litros",
      weight: "340 g",
    },
    finish: "natural",
    finishLabel: "Acabado Texturizado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Tazón (8.8 x 5.6 cm)",
    drainage: "Orificio central inferior.",
    includesSaucer: false,
    images: ["/images/cesta-grande.png"],
    badge: "Textura Rústica",
    featured: false,
    inStock: true,
    craftProcess:
      "Texturizado de alta definición, orificio abierto a tiempo y curado al sol.",
    plantCare: {
      recommendedSpecies: "Echeveria Ives Fred Monstruosa o Callisia Pink",
      light: "Luz natural brillante.",
      watering: "Riego moderado cuando el sustrato esté seco.",
      substrate: "Mezcla porosa rica en nutrientes.",
      careTip: "Su boca ancha permite plantar dos variedades complementarias.",
    },
  },

  // 9. Maceta Casa Hongo Encantada
  {
    id: "ixchel-casa-hongo",
    slug: "maceta-casa-hongo",
    name: "Maceta Casa Hongo Encantada",
    subtitle: "Fairy House de cuento de hadas con tejado de seta, puerta y ventana",
    shortDescription:
      "Diseño de fantasía con techo en forma de hongo y detalles esculpidos a mano, ideal para mini jardines de ensueño.",
    description:
      "Nuestra pieza más mágica. Su techo de hongo adornado con sutiles corazones corona una pequeña casita con ventana arqueada y puerta de cuento. La boca superior acoge una suculenta o helecho miniatura simulando la copa del hongo.",
    price: 2.99,
    transparentImage: "/images/sin-fondo-macetas/trimmed/maceta-casa-hongo-encantada.png",
    dimensions: {
      height: "7.6 cm (2.99 in)",
      diameter: "8.6 cm (3.38 in) de ancho",
      width: "8.6 cm (3.38 in)",
      formatted: "8.6 x 7.6 cm (3.38 x 2.99 in)",
      formattedSummary: "8.6 x 7.6 cm",
      isApproximate: false,
      capacity: "0.35 Litros",
      weight: "290 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural / Color",
    colors: ["Blanco Base", "Café", "Rojo"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (8.6 x 7.6 cm)",
    drainage: "Orificio de drenaje calibrado en la base.",
    includesSaucer: false,
    images: ["/images/casita.png"],
    badge: "Favorita del Estudio",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeada con esmero en nuestro taller familiar, curada bajo el sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Flor de las 11 o Echeveria Lilac Mist",
      light: "Luz brillante indirecta.",
      watering: "Regar cada 8 a 12 días dejando secar el sustrato.",
      substrate: "Mezcla con perlita y tierra de hojas.",
      careTip: "Colócala junto a una pequeña planta trepadora para completar el efecto de cuento.",
    },
  },

  // 10. Maceta Concha Orgánica
  {
    id: "ixchel-concha-organica",
    slug: "maceta-concha-organica",
    name: "Maceta Concha Orgánica",
    subtitle: "Forma marina estilizada con boca ondulada y textura en espiral",
    shortDescription:
      "Maceta escultórica en forma de caracola marina, ideal para plantas rastreras, suculentas o follaje delicado.",
    description:
      "Inspirada en las conchas marinas de la costa salvadoreña. Su silueta envolvente ofrece un cuenco protector para especies de raíces superficiales, combinando belleza orgánica y funcionalidad.",
    price: 2.5,
    transparentImage: "/images/sin-fondo-macetas/trimmed/maceta-concha-organica.png",
    dimensions: {
      height: "3.5 cm (1.38 in)",
      diameter: "12.5 cm (4.92 in) de largo · Prof. 6.1 cm (2.4 in)",
      width: "12.5 cm (4.92 in)",
      formatted: "12.5 x 3.5 cm (4.92 x 1.38 in) · Profundidad: 6.1 cm (2.4 in)",
      formattedSummary: "~12.5 x 3.5 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde (12.5 x 6.1 x 3.5 cm).",
      capacity: "0.3 Litros",
      weight: "260 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Blanco, Café, Rojo, Azul)",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Orgánica (~12.5 x 3.5 cm)",
    drainage: "Orificio inferior para flujo adecuado de riego.",
    includesSaucer: false,
    images: ["/images/concha.png"],
    badge: "Edición Marina",
    featured: true,
    inStock: true,
    craftProcess:
      "Dando forma en pareja, curado completo al sol y pulido manual de aristas.",
    plantCare: {
      recommendedSpecies: "Echeveria Lilac Mist o Callisia Pink",
      light: "Luz solar indirecta abundante.",
      watering: "Riego espaciado y directo al sustrato.",
      substrate: "Sustrato suelto con arena gruesa y piedra pómez.",
      careTip: "Su apertura horizontal permite admirar las rosetas desde arriba.",
    },
  },

  // 11. Maceta Corazón (Restaurada)
  {
    id: "ixchel-corazon",
    slug: "maceta-corazon",
    name: "Maceta Corazón",
    subtitle: "Silueta acorazonada con relieve trenzado artesanal",
    shortDescription:
      "Maceta en forma de corazón con borde de cordón trenzado, perfecta para regalos con sentimiento y parejas botánicas.",
    description:
      "Pieza artesanal moldeada con dedicación en nuestro estudio familiar. Su silueta de corazón y relieve trenzado crean un cuenco cálido y romántico para tus plantas favoritas.",
    price: 1.5,
    transparentImage: "/images/sin-fondo-macetas/trimmed/corazon.png",
    dimensions: {
      height: "3.0 cm (1.18 in)",
      diameter: "6.5 cm (2.56 in) · Base 7.5 cm (2.95 in)",
      width: "6.5 cm (2.56 in)",
      formatted: "6.5 x 3.0 cm (2.56 x 1.18 in) · Base: 7.5 cm",
      formattedSummary: "6.5 x 3.0 cm (base 7.5 cm)",
      isApproximate: false,
      capacity: "0.15 Litros",
      weight: "210 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Blanco, Café, Rojo, Azul)",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (6.5 x 3.0 cm)",
    drainage: "Orificio inferior para drenaje funcional.",
    includesSaucer: false,
    images: ["/images/corazon.png"],
    badge: "Colección Afecto",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeado en silueta de corazón, texturizado de cordón trenzado y curado bajo el sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Callisia Pink o Echeveria Serena",
      light: "Luz brillante indirecta.",
      watering: "Riego moderado cuando el sustrato esté seco.",
      substrate: "Sustrato mineral poroso.",
      careTip: "Combínala con una planta colgante como Callisia Pink para resaltar su silueta de corazón.",
    },
  },

  // 12. Maceta Tetera (Nueva incorporación)
  {
    id: "ixchel-tetera",
    slug: "maceta-tetera",
    name: "Maceta Tetera",
    subtitle: "Diseño temático de regadera tetera con corazón frontal en relieve",
    shortDescription:
      "Encantadora maceta con asa, boquilla y corazón frontal, evocando la calidez del té y el cuidado de las plantas.",
    description:
      "Nuestra nueva pieza temática inspirada en el rincón botánico del hogar. Su silueta con asa curva, caño vertedor y corazón grabado en el cuerpo le da un aire campestre nostálgico que deleita en cualquier ventana o terraza.",
    price: 4.5,
    transparentImage: "/images/sin-fondo-macetas/trimmed/tetera.png",
    dimensions: {
      height: "8.5 cm (3.35 in)",
      diameter: "11.3 cm (4.45 in) · Asa 6.9 cm (2.72 in)",
      width: "11.3 cm (4.45 in)",
      formatted: "11.3 x 8.5 cm (4.45 x 3.35 in) · Asa: 6.9 cm",
      formattedSummary: "11.3 x 8.5 cm (asa 6.9 cm)",
      isApproximate: false,
      capacity: "0.35 Litros",
      weight: "280 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Blanco, Café, Rojo, Azul)",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (11.3 x 8.5 cm)",
    drainage: "Orificio de drenaje en la base.",
    includesSaucer: false,
    images: ["/images/tetera.png"],
    badge: "Novedad del Taller",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeado con detalle de asa y boquilla, grabado de corazón frontal y curado al sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Callisia Pink, Echeveria Serena o Flor de las 11",
      light: "Luz natural difusa.",
      watering: "Regar directo a la tierra evitando encharcar.",
      substrate: "Mezcla aireada con perlita.",
      careTip: "Planta una variedad con caída hacia el frente opuesto al asa para equilibrar su silueta.",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(
    (p) =>
      p.slug === slug ||
      // Compatibilidad con URLs anteriores
      (slug === "maceta-casita" && p.slug === "maceta-casa-hongo") ||
      (slug === "maceta-concha" && p.slug === "maceta-concha-organica") ||
      (slug === "maceta-carro" && p.slug === "maceta-auto-retro") ||
      (slug === "maceta-cesta" && p.slug === "combo-cestas-trenzadas") ||
      (slug === "maceta-bus" && p.slug === "maceta-carrito-van-retro") ||
      (slug === "maceta-bus-retro" && p.slug === "maceta-carrito-van-retro") ||
      (slug === "maceta-vasija" && p.slug === "maceta-vasija-estilo-barro") ||
      (slug === "maceta-pata-de-gato" && p.slug === "florero-pata-de-gato")
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
