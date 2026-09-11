export interface PlantCare {
  light: string;
  watering: string;
  substrate: string;
  recommendedSpecies: string;
  careTip: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  price: number;
  dimensions: {
    height: string;
    diameter: string;
    capacity?: string;
    weight?: string;
  };
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
  craftProcess: string;
  plantCare: PlantCare;
}

export const products: Product[] = [
  {
    id: "ixchel-casita",
    slug: "maceta-casita",
    name: "Maceta Casita",
    subtitle: "Diseño arquitectónico artesanal para suculentas y cactus",
    shortDescription:
      "Maceta artesanal con orificio de drenaje funcional, pensada para cuidar las raíces de tus plantas.",
    description:
      "Elaborada cuidadosamente en nuestro estudio familiar. Su silueta en forma de casita aporta calidez a cualquier rincón botánico. Curada pacientemente al sol e inspirada en crear un auténtico hogar para tus plantas.",
    price: 4.5,
    dimensions: {
      height: "11.0 cm",
      diameter: "10.0 cm",
      capacity: "0.6 Litros",
      weight: "450 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (10 cm)",
    drainage: "Orificio central calibrado para flujo libre de agua y raíces sanas.",
    includesSaucer: false,
    images: ["/images/casita.png"],
    badge: "Favorita del Estudio",
    featured: true,
    inStock: true,
    craftProcess:
      "Moldeada con esmero, orificio de drenaje abierto a tiempo y curada por completo bajo el sol de La Libertad.",
    plantCare: {
      recommendedSpecies: "Suculentas compactas, Haworthia, Echeveria o Cactus miniatura",
      light: "Luz brillante indirecta con algunas horas de sol suave matutino.",
      watering: "Regar únicamente cuando el sustrato se sienta totalmente seco (cada 8 a 12 días).",
      substrate: "Mezcla porosa: sustrato mineral con perlita y gravilla volcánica.",
      careTip: "Ubícala en una ventana o repisa iluminada para mantener su forma compacta.",
    },
  },
  {
    id: "ixchel-concha",
    slug: "maceta-concha",
    name: "Maceta Concha",
    subtitle: "Silueta marina orgánica disponible en ediciones de color",
    shortDescription:
      "Relieves ondulados inspirados en las formas del mar, con drenaje funcional para raíces protegidas.",
    description:
      "Inspirada en las conchas marinas y la brisa costera. Su cuenco abierto y curvo permite que pequeñas plantas rastreras y crasas se desarrollen libremente. Disponible en café, rojo y azul.",
    price: 4.0,
    dimensions: {
      height: "9.0 cm",
      diameter: "13.0 cm",
      capacity: "0.7 Litros",
      weight: "520 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Café, Rojo, Azul)",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (13 cm)",
    drainage: "Orificio inferior de drenaje para evitar encharcamientos.",
    includesSaucer: false,
    images: ["/images/concha.png"],
    badge: "Edición de Color",
    featured: true,
    inStock: true,
    craftProcess:
      "Dando forma en pareja, curado completo al sol y acabado artesanal en tonos café, rojo o azul.",
    plantCare: {
      recommendedSpecies: "Sedum, Crasas en roseta o Peperomia prostrata",
      light: "Luz solar indirecta abundante.",
      watering: "Riego espaciado y directo al sustrato sin mojar el centro de las rosetas.",
      substrate: "Sustrato suelto con buen contenido de arena gruesa y piedra pómez.",
      careTip: "Su boca ancha es ideal para componer un mini arreglo de dos o tres suculentas complementarias.",
    },
  },
  {
    id: "ixchel-corazon",
    slug: "maceta-corazon",
    name: "Maceta Corazón",
    subtitle: "Un detalle botánico hecho con cariño familiar",
    shortDescription:
      "Maceta trabajada con paciencia y secada de forma natural, ideal para regalos botánicos.",
    description:
      "Una pieza tierna nacida de nuestro proyecto de pareja. Su contorno en forma de corazón abraza la raíz de plantas pequeñas y añade un detalle de amor a escritorios, veladores y estanterías.",
    price: 3.5,
    dimensions: {
      height: "8.5 cm",
      diameter: "11.0 cm",
      capacity: "0.5 Litros",
      weight: "400 g",
    },
    finish: "color",
    finishLabel: "Edición de Color",
    colors: ["Blanco Base", "Rojo", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (11 cm)",
    drainage: "Drenaje funcional calibrado para cuidar la salud radicular.",
    includesSaucer: false,
    images: ["/images/corazon.png"],
    badge: "Hecha con Cariño",
    featured: true,
    inStock: true,
    craftProcess:
      "Proceso cuidadoso pieza a pieza, curada al sol y terminada con detalle de color a mano.",
    plantCare: {
      recommendedSpecies: "Cactus corazón (Hoya kerrii), fitonias o mini crásulas",
      light: "Luz media a brillante sin sol directo quemante.",
      watering: "Riego moderado cada 10 a 14 días en interiores.",
      substrate: "Tierra nutritiva con fibra de coco y perlita.",
      careTip: "Perfecta para regalar en ocasiones especiales acompañada de una dedicatoria verde.",
    },
  },
  {
    id: "ixchel-cestas",
    slug: "maceta-cesta",
    name: "Maceta Cesta",
    subtitle: "Textura entrelazada de canasto tradicional con acabado rústico",
    shortDescription:
      "Relieves que evocan el tejido artesanal, combinando solidez y frescura para tus plantas.",
    description:
      "Diseñada con una textura en relieve que recuerda las cestas tradicionales. Su cuerpo resistente sostiene con firmeza plantas medianas, brindando una estética acogedora y serena.",
    price: 4.0,
    dimensions: {
      height: "12.0 cm",
      diameter: "13.5 cm",
      capacity: "0.9 Litros",
      weight: "620 g",
    },
    finish: "natural",
    finishLabel: "Acabado Texturizado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "mediana",
    sizeLabel: "Mediana (13.5 cm)",
    drainage: "Orificio inferior funcional para prevenir pudrición de raíces.",
    includesSaucer: false,
    images: ["/images/cestas.png"],
    badge: "Textura Rústica",
    featured: false,
    inStock: true,
    craftProcess:
      "Texturizado artesanal en molde, curado paciente al sol y revisión minuciosa antes del empaque.",
    plantCare: {
      recommendedSpecies: "Pothos, Peperomias variegadas o Helechos compactos",
      light: "Luz suave indirecta o semisombra iluminada.",
      watering: "Mantener el sustrato ligeramente húmedo sin llegar a saturar.",
      substrate: "Mezcla universal enriquecida con humus de lombriz.",
      careTip: "Limpia periódicamente la textura externa con un pincel suave seco para mantenerla impecable.",
    },
  },
  {
    id: "ixchel-carro",
    slug: "maceta-carro",
    name: "Maceta Carrito",
    subtitle: "Diseño temático vintage para espacios divertidos y llenos de vida",
    shortDescription:
      "Maceta lúdica inspirada en vehículos clásicos, curada al sol y terminada con detalle artesanal.",
    description:
      "Para quienes disfrutan de piezas originales y con personalidad. Su cavidad superior acoge suculentas o cactus que transforman el carrito en una pequeña camioneta llena de naturaleza.",
    price: 5.0,
    dimensions: {
      height: "9.5 cm",
      diameter: "14.0 cm",
      capacity: "0.6 Litros",
      weight: "550 g",
    },
    finish: "color",
    finishLabel: "Edición de Color (Café, Rojo, Azul)",
    colors: ["Blanco Base", "Rojo", "Azul", "Café"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (14 cm)",
    drainage: "Orificio de drenaje integrado para mantener sano el sustrato.",
    includesSaucer: false,
    images: ["/images/carro.png"],
    badge: "Diseño Temático",
    featured: false,
    inStock: true,
    craftProcess:
      "Dando forma en pareja, curado completo al sol y terminado con paleta de color a mano.",
    plantCare: {
      recommendedSpecies: "Sedum burrito, cactus globulares o Graptopetalum",
      light: "Luz directa suave o resolana intensa.",
      watering: "Dejar secar por completo entre riegos.",
      substrate: "Sustrato mineral de secado rápido.",
      careTip: "Ideal como punto de conversación en repisas infantiles, escritorios o recibidores.",
    },
  },
  {
    id: "ixchel-bus",
    slug: "maceta-bus",
    name: "Maceta Autobús",
    subtitle: "Silueta retro con carácter y presencia vegetal",
    shortDescription:
      "Maceta con diseño temático de autobús tradicional, con amplio espacio interior para suculentas.",
    description:
      "Con una marcada vibra retro, la Maceta Autobús permite sembrar pequeños arreglos botánicos o suculentas que simulan un jardín en movimiento. Trabajada con paciencia y secada al sol.",
    price: 5.0,
    dimensions: {
      height: "10.0 cm",
      diameter: "15.0 cm",
      capacity: "0.8 Litros",
      weight: "680 g",
    },
    finish: "color",
    finishLabel: "Edición de Color",
    colors: ["Blanco Base", "Azul", "Rojo", "Café"],
    sizeCategory: "mediana",
    sizeLabel: "Mediana (15 cm)",
    drainage: "Drenaje funcional para evitar acumulación dañina de agua.",
    includesSaucer: false,
    images: ["/images/bus.png"],
    badge: "Edición Retro",
    featured: false,
    inStock: true,
    craftProcess:
      "Vaciado en molde, curado natural al sol y detallado final a mano en nuestro espacio de trabajo.",
    plantCare: {
      recommendedSpecies: "Arreglo combinado de crasas miniatura o Sansevieria enana",
      light: "Luz brillante filtrada.",
      watering: "Riego controlado con regadera de cuello largo cada 10 a 14 días.",
      substrate: "Mezcla drenante con fibra de coco y piedra volcánica fina.",
      careTip: "Planta especies de diferentes tonalidades verdes para crear un contraste vivo y alegre.",
    },
  },
  {
    id: "ixchel-pata-de-gato",
    slug: "maceta-pata-de-gato",
    name: "Maceta Huella de Gato",
    subtitle: "Dedicada a los amantes de los felinos y la vida verde",
    shortDescription:
      "Maceta artesanal con relieve de huellita de gato, tierna y funcional para plantas pequeñas.",
    description:
      "Creada para celebrar el vínculo entre nuestros amigos de cuatro patas y el amor por las plantas. Su relieve en forma de huella felina destaca sobre el cuerpo sólido y curado al sol.",
    price: 3.5,
    dimensions: {
      height: "8.0 cm",
      diameter: "10.5 cm",
      capacity: "0.5 Litros",
      weight: "380 g",
    },
    finish: "color",
    finishLabel: "Edición de Color",
    colors: ["Blanco Base", "Café", "Rojo", "Azul"],
    sizeCategory: "pequena",
    sizeLabel: "Pequeña (10.5 cm)",
    drainage: "Orificio de drenaje en la base para riego seguro y sin estancamiento.",
    includesSaucer: false,
    images: ["/images/pata-de-gato.png"],
    badge: "Colección Mascotas",
    featured: false,
    inStock: true,
    craftProcess:
      "Curada al sol y terminada con detalle artesanal en nuestro estudio familiar en La Libertad.",
    plantCare: {
      recommendedSpecies: "Cactus no espinosos, Calathea pequeña o Peperomia obtusifolia",
      light: "Luz abundante indirecta.",
      watering: "Regar cuando los primeros 2 cm de tierra se sientan secos.",
      substrate: "Sustrato fértil aireado con perlita.",
      careTip: "Verifica que la planta que elijas sea pet-friendly si convives con gatitos curiosos.",
    },
  },
  {
    id: "ixchel-vacija",
    slug: "maceta-vasija",
    name: "Maceta Vasija",
    subtitle: "Silueta clásica inspirada en nuestras raíces",
    shortDescription:
      "Forma orgánica de cuello suave y base redondeada, curada al sol para resistir el paso del tiempo.",
    description:
      "Un tributo a las formas de vasijas tradicionales que honran nuestras raíces. Con proporciones equilibradas para plantas medianas, enredaderas o follajes densos, cuidando siempre la ventilación del sustrato.",
    price: 4.5,
    dimensions: {
      height: "13.5 cm",
      diameter: "14.0 cm",
      capacity: "1.2 Litros",
      weight: "750 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural",
    colors: ["Blanco Base", "Café"],
    sizeCategory: "mediana",
    sizeLabel: "Mediana (14 cm)",
    drainage: "Orificio central calibrado de drenaje para flujo óptimo de riego.",
    includesSaucer: false,
    images: ["/images/vacija.png"],
    badge: "Clásica de Raíces",
    featured: true,
    inStock: true,
    craftProcess:
      "Mezcla calibrada, moldeado en pareja, curado completo bajo el sol y pulido de detalles a mano.",
    plantCare: {
      recommendedSpecies: "String of Hearts, Pothos, Singonio o Monsterita Adansonii",
      light: "Luz indirecta brillante.",
      watering: "Riego profundo dejando drenar todo el exceso de agua por la base.",
      substrate: "Sustrato suelto enriquecido con corteza y perlita.",
      careTip: "Permite que las guías de las plantas colgantes caigan sobre el cuello curvo de la vasija.",
    },
  },
  {
    id: "ixchel-vacija-2",
    slug: "maceta-vasija-curva",
    name: "Maceta Vasija Curva",
    subtitle: "Elegancia rústica con líneas suaves y atemporales",
    shortDescription:
      "Variante de vasija artesanal con perfil estilizado, pensada para lucir plantas de porte erguido o colgante.",
    description:
      "Curada al sol en nuestro estudio de La Libertad, esta vasija destaca por su silueta curva de presencia serena. Su boca abierta facilita el trasplante y permite que las raíces crezcan cómodas y aireadas.",
    price: 5.0,
    dimensions: {
      height: "15.0 cm",
      diameter: "15.0 cm",
      capacity: "1.4 Litros",
      weight: "820 g",
    },
    finish: "natural",
    finishLabel: "Acabado Natural",
    colors: ["Blanco Base", "Café", "Azul"],
    sizeCategory: "mediana",
    sizeLabel: "Mediana (15 cm)",
    drainage: "Orificio central inferior anti-encharcamiento.",
    includesSaucer: false,
    images: ["/images/vacija_2.png"],
    badge: "Pieza Serenidad",
    featured: false,
    inStock: true,
    craftProcess:
      "Preparación de mezcla exacta, desmolde cuidadoso, curado al sol y revisión final.",
    plantCare: {
      recommendedSpecies: "Zamioculca (ZZ plant), Sansevieria cilíndrica o Maranta",
      light: "Tolera desde luz media hasta luz brillante indirecta.",
      watering: "Riego moderado a bajo: 1 vez cada 12 a 15 días.",
      substrate: "Mezcla universal con buena porosidad.",
      careTip: "Una de las piezas más estables y versátiles para decorar mesas auxiliares o repisas.",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
