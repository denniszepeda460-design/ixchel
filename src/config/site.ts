export interface SiteConfig {
  name: string;
  wordmark: string;
  tagline: string;
  familyStoryCopy: string;
  whatsapp: {
    number: string; // E.164 international format without spaces, e.g. 50361100352
    display: string;
    altDisplay: string;
    greeting: string;
  };
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
    email: string;
  };
  location: {
    region: string;
    country: string;
    workshopNote: string;
  };
  checkoutMode: "whatsapp" | "stripe";
}

export const siteConfig: SiteConfig = {
  name: "Ixchel",
  wordmark: "ixchel",
  tagline: "Cada pieza está hecha con amor, inspirada en la conexión entre la tierra y la naturaleza.",
  familyStoryCopy:
    "Proyecto familiar de macetas artesanales. Cada pieza está hecha con dedicación y curada al sol, inspirada en la conexión sagrada entre la tierra, la luna y la vida verde.",
  whatsapp: {
    number: "50361100352",
    display: "+503 6110-0352",
    altDisplay: "+503 7726-9934",
    greeting: "¡Hola Ixchel! \u{1F335} Estoy visitando su sitio web y me gustaría hacerles una consulta sobre sus piezas artesanales.",
  },
  currency: {
    code: "USD",
    symbol: "$",
    locale: "es-SV",
  },
  social: {
    instagram: "https://www.instagram.com/ixchelsv/",
    facebook: "https://www.facebook.com/profile.php?id=61593977804758",
    tiktok: "#", // pendiente
    email: "hola@ixchel-artesanal.com",
  },
  location: {
    region: "Estudio Artesanal, La Libertad",
    country: "El Salvador",
    workshopNote: "Proyecto familiar de macetas. Envíos protegidos a todo el país.",
  },
  checkoutMode: "whatsapp",
};

export function formatPrice(amount: number): string {
  return `${siteConfig.currency.symbol}${amount.toFixed(2)}`;
}
