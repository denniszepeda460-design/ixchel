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
  formatted: string; // Formato consistente: "Ancho x Alto (cm/in)"
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
      recommendedSpecies: "Mini cactus globulares, Lithops o Sedum miniatura",
      light: "Luz solar indirecta brillante con algunas horas de resolana suave.",
      watering: "Riego controlado con cuentagotas o boquilla fina cada 12 a 15 días.",
      substrate: "Sustrato mineral poroso con gravilla fina y perlita.",
      careTip: "Ubícalo en tu escritorio o vitrina como punto focal vintage.",
    },
  },

  // 2. Combo Cestas Trenzadas (Grande + Pequeña)
  {
    id: "ixchel-combo-cestas",
    slug: "combo-cestas-trenzadas",
    name: "Combo Cestas Trenzadas (Grande + Pequeña)",
    subtitle: "Set de dos piezas con textura entrelazada tradicional",
    shortDescription:
      "Dúo de macetas con relieve que emula el tejido artesanal de canasto en dos tamaños complementarios.",
    description:
      "Este juego incluye las dos piezas: una cesta grande tipo tazón y una cesta pequeña decorativa. Ambas presentan un detallado acabado trenzado que aporta calidez rústica tanto juntas como ubicadas en distintos espacios de tu hogar.",
    price: 5.0,
    dimensions: {
      height: "Grande: 5.6 cm / Pequeña: 3.7 cm",
      diameter: "Grande: 8.8 cm / Pequeña: 6.3 cm",
      formatted: "Grande: 8.8 x 5.6 cm (3.46 x 2.2 in) · Pequeña: 6.3 x 3.7 cm (2.48 x 1.46 in)",
      formattedSummary: "Set 2 piezas (~8.8 / 6.3 cm)",
      isApproximate: true,
      approximateNote:
        "Medida aproximada basada en molde. El vertido y secado artesanal pueden generar variaciones milimétricas leves.",
      capacity: "0.6 Litros (total combo)",
      weight: "480 g",
    },
    finish: "natural",
    finishLabel: "Acabado Texturizado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "mediana",
    sizeLabel: "Set Combo (2 piezas)",
    drainage: "Drenaje funcional para suculentas o recipientes botánicos.",
    includesSaucer: false,
    images: ["/images/cestas.png"],
    badge: "Combo 2 Piezas",
    featured: true,
    inStock: true,
    craftProcess:
      "Texturizado artesanal en molde, curado completo al sol en pareja y revisión minuciosa antes de empacar.",
    plantCare: {
      recommendedSpecies: "Pothos mini, Peperomias compactas, Echeveria",
      light: "Luz suave filtrada o semisombra luminosa.",
      watering: "Regar cuando el sustrato se sienta seco al tacto.",
      substrate: "Mezcla universal enriquecida con fibra de coco.",
      careTip: "Limpia la textura trenzada periódicamente con un pincel suave seco.",
    },
  },

  // 3. Maceta Vasija Curva (Set L/S)
  {
    id: "ixchel-vasija-curva-set",
    slug: "maceta-vasija-curva",
    name: "Maceta Vasija Curva (Set L/S)",
    subtitle: "Juego de dos vasijas redondas lisas con boca ondulada orgánica",
    shortDescription:
      "Dúo de vasijas de silueta abombada y curvas limpias, en dos tamaños L y S para arreglos escalonados.",
    description:
      "Conjunto de dos vasijas inspiradas en cuencos botánicos tradicionales. Su delicado borde ondulado acompaña el crecimiento de plantas colgantes o crasas, creando una composición armónica en repisas o mesas.",
    price: 3.99,
    dimensions: {
      height: "Mold L: 6.3 cm / Mold S: 5.6 cm",
      diameter: "Mold L: 9.6 cm / Mold S: 8.4 cm",
      formatted: "Mold L: 9.6 x 6.3 cm (3.78 x 2.48 in) · Mold S: 8.4 x 5.6 cm (3.31 x 2.2 in)",
      formattedSummary: "Set L/S (~9.6 / 8.4 cm)",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde.",
      capacity: "0.7 Litros (set)",
      weight: "520 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "mediana",
    sizeLabel: "Set L/S",
    drainage: "Orificio central inferior para flujo óptimo de riego.",
    includesSaucer: false,
    images: ["/images/vacija.png"],
    badge: "Set de 2 Vasijas",
    featured: true,
    inStock: true,
    craftProcess:
      "Preparación de mezcla exacta, desmolde cuidadoso, curado al sol y revisión final.",
    plantCare: {
      recommendedSpecies: "String of Hearts, Pothos o mini Sansevieria",
      light: "Luz natural indirecta.",
      watering: "Riego profundo dejando drenar el exceso.",
      substrate: "Mezcla drenante con perlita y tierra vegetal.",
      careTip: "Permite que las ramas caigan suavemente sobre el borde ondulado.",
    },
  },

  // 4. Maceta Vasija Estilo Barro Colgante
  {
    id: "ixchel-vasija-estilo-barro",
    slug: "maceta-vasija-estilo-barro",
    name: "Maceta Vasija Estilo Barro Colgante",
    subtitle: "Textura de puntos y ondas en relieve inspirada en alfarería ancestral",
    shortDescription:
      "Vasija globular con relieves tradicionales ornamentales y cuello curvo, diseñada para lucir colgada o sobre repisa.",
    description:
      "Una pieza con personalidad que honra el legado de la alfarería. Sus grabados en ondas y esferas en relieve aportan volumen y riqueza táctil, mientras su forma globular resguarda la humedad equilibrada del sustrato.",
    price: 3.99,
    dimensions: {
      height: "6.8 cm (2.68 in)",
      diameter: "8.3 cm (3.27 in) de ancho",
      width: "8.3 cm (3.27 in)",
      formatted: "8.3 x 6.8 cm (3.27 x 2.68 in)",
      formattedSummary: "~8.3 x 6.8 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde.",
      capacity: "0.4 Litros",
      weight: "340 g",
    },
    finish: "natural",
    finishLabel: "Acabado Artesanal con Relieve",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "colgante",
    sizeLabel: "Colgante (~8.3 x 6.8 cm)",
    drainage: "Orificio inferior funcional para prevenir encharcamientos.",
    includesSaucer: false,
    images: ["/images/vacija_2.png"],
    badge: "Relieve Tradicional",
    featured: false,
    inStock: true,
    craftProcess:
      "Vaciado cuidadoso para preservar cada detalle en relieve y secado natural.",
    plantCare: {
      recommendedSpecies: "Ceropegia woodii, Sedum burrito o Fitonias",
      light: "Luz brillante tamizada.",
      watering: "Riego moderado cada 10 a 12 días.",
      substrate: "Mezcla ligera y aireada.",
      careTip: "Ideal para colgar cerca de una ventana o en un soporte macramé.",
    },
  },

  // 5. Maceta Carrito Van Retro
  {
    id: "ixchel-carrito-van-retro",
    slug: "maceta-carrito-van-retro",
    name: "Maceta Carrito Van Retro",
    subtitle: "Furgoneta camper vintage con ventanas y puerta lateral detalladas",
    shortDescription:
      "Maceta temática en forma de van clásica, espaciosa y perfecta para crear un mini jardín rodante de suculentas.",
    description:
      "Inspirada en las legendarias furgonetas camper. Cuenta con una cavidad generosa para plantar suculentas variadas o cactus. Cada línea de carrocería y rueda está moldeada con definición para destacar en cualquier ambiente.",
    price: 3.5,
    dimensions: {
      height: "5.6 cm (2.2 in)",
      diameter: "9.9 cm (3.9 in) de ancho",
      width: "9.9 cm (3.9 in)",
      formatted: "9.9 x 5.6 cm (3.9 x 2.2 in)",
      formattedSummary: "9.9 x 5.6 cm",
      isApproximate: false,
      capacity: "0.35 Litros",
      weight: "310 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Blanco, Rojo, Azul, Café)",
    colors: ["Blanco Base", "Rojo", "Azul", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (9.9 x 5.6 cm)",
    drainage: "Drenaje inferior para salud radicular.",
    includesSaucer: false,
    images: ["/images/bus.png"],
    badge: "Diseño Camper",
    featured: false,
    inStock: true,
    craftProcess:
      "Moldeo de alta fidelidad, pulido artesanal y curado completo al sol.",
    plantCare: {
      recommendedSpecies: "Suculentas en roseta, Crassula ovata mini o Haworthia",
      light: "Luz directa suave o resolana intensa.",
      watering: "Dejar secar el sustrato por completo entre riegos.",
      substrate: "Sustrato mineral de secado rápido.",
      careTip: "Excelente como regalo para viajeros y amantes de los autos retro.",
    },
  },

  // 6. Florero Pata de Gato
  {
    id: "ixchel-pata-de-gato",
    slug: "florero-pata-de-gato",
    name: "Florero Pata de Gato",
    subtitle: "Molde de silicona flexible / pieza decorativa para amantes de los felinos",
    shortDescription:
      "Diseño erguido con huella felina tridimensional, ideal para flores secas, ramitas o pequeñas varas botánicas.",
    description:
      "Una de las piezas más adorables de la colección. Diseñada con relieves suaves de almohadillas y garras estilizadas. Nota importante: Se suministra como molde de silicona flexible para elaboración artesanal.",
    price: 1.99,
    dimensions: {
      height: "8.9 cm (3.5 in)",
      diameter: "6.2 cm (2.44 in) de ancho",
      width: "6.2 cm (2.44 in)",
      formatted: "6.2 x 8.9 cm (2.44 x 3.5 in)",
      formattedSummary: "~6.2 x 8.9 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde (6.2 x 8.9 cm).",
      disclaimer: "Solo molde de silicona, no incluye producto terminado ni arreglos florales.",
      capacity: "0.2 Litros",
      weight: "180 g",
    },
    finish: "color",
    finishLabel: "Molde de Silicona / Colección Mascotas",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeño (~6.2 x 8.9 cm)",
    drainage: "Cuerpo cilíndrico decorativo sin perforación de drenaje.",
    includesSaucer: false,
    images: ["/images/pata-de-gato.png"],
    badge: "Solo Molde",
    featured: false,
    inStock: true,
    craftProcess:
      "Molde de silicona de alta elasticidad, durable y de fácil desmolde para yeso, cemento o resina.",
    plantCare: {
      recommendedSpecies: "Flores secas, ramitas de lavanda o eucalipto",
      light: "Ubicación decorativa en interiores.",
      watering: "No requiere riego; pensado para arreglos secos.",
      substrate: "No aplica.",
      careTip: "Un detalle encantador para escritorios y mesas de noche.",
    },
  },

  // 8. Cesta Pequeña Trenzada
  {
    id: "ixchel-cesta-pequena",
    slug: "cesta-pequena-trenzada",
    name: "Cesta Pequeña Trenzada",
    subtitle: "Cuenco compacto individual con textura entrelazada artesanal",
    shortDescription:
      "Cesta individual con borde trenzado y textura de mimbre, ideal para mini macetas de 5 a 6 cm o escritorio.",
    description:
      "Pieza compacta y delicada. Su cavidad interior (~7.5 cm) acomoda perfectamente una pequeña suculenta o sirve como accesorio botánico y organizador sobre cualquier superficie.",
    price: 1.5,
    dimensions: {
      height: "3.0 cm (1.18 in)",
      diameter: "6.5 cm (2.56 in) [Diámetro interior ~7.5 cm / 2.95 in]",
      width: "6.5 cm (2.56 in)",
      formatted: "6.5 x 3.0 cm (2.56 x 1.18 in) [Interior ~7.5 cm / 2.95 in]",
      formattedSummary: "~6.5 x 3.0 cm",
      isApproximate: true,
      approximateNote: "Medida aproximada basada en molde (diámetro interior ~7.5 cm).",
      capacity: "0.15 Litros",
      weight: "140 g",
    },
    finish: "natural",
    finishLabel: "Acabado Texturizado",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Mini (~6.5 x 3.0 cm)",
    drainage: "Drenaje funcional para maceta pequeña.",
    includesSaucer: false,
    images: ["/images/cesta-pequena.png"],
    badge: "Mini Cesta",
    featured: false,
    inStock: true,
    craftProcess:
      "Elaboración cuidada en molde de relieve trenzado, curado natural al sol.",
    plantCare: {
      recommendedSpecies: "Echeveria mini, Sedum o Haworthia fasciata",
      light: "Luz solar indirecta abundante.",
      watering: "Riego espaciado con rociador o pipeta cada 10 días.",
      substrate: "Sustrato mineral con piedra pómez fina.",
      careTip: "Ideal para iluminar pequeños espacios de trabajo.",
    },
  },

  // 9. Cesta Grande Trenzada
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
      recommendedSpecies: "Arreglo de suculentas, Kalanchoe o Peperomia",
      light: "Luz natural brillante.",
      watering: "Riego moderado cuando el sustrato esté seco.",
      substrate: "Mezcla porosa rica en nutrientes.",
      careTip: "Su boca ancha permite plantar dos variedades complementarias.",
    },
  },

  // 10. Maceta Casa Hongo Encantada
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
      recommendedSpecies: "Suculentas compactas, Haworthia o Echeveria",
      light: "Luz brillante indirecta.",
      watering: "Regar cada 8 a 12 días dejando secar el sustrato.",
      substrate: "Mezcla con perlita y tierra de hojas.",
      careTip: "Colócala junto a una pequeña planta trepadora para completar el efecto de cuento.",
    },
  },

  // 11. Maceta Concha Orgánica
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
      recommendedSpecies: "Sedum, Crasas en roseta o Peperomia prostrata",
      light: "Luz solar indirecta abundante.",
      watering: "Riego espaciado y directo al sustrato.",
      substrate: "Sustrato suelto con arena gruesa y piedra pómez.",
      careTip: "Su apertura horizontal permite admirar las rosetas desde arriba.",
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
      (slug === "maceta-corazon" && p.slug === "combo-cestas-trenzadas") ||
      (slug === "maceta-bus" && p.slug === "maceta-carrito-van-retro") ||
      (slug === "maceta-bus-retro" && p.slug === "maceta-carrito-van-retro") ||
      (slug === "maceta-vasija" && p.slug === "maceta-vasija-estilo-barro") ||
      (slug === "maceta-pata-de-gato" && p.slug === "florero-pata-de-gato")
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
