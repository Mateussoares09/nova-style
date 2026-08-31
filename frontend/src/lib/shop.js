export const API_BASE = "http://127.0.0.1:8000/api";

export const WHATSAPP_NUMBER = "244923000000";

export const fmtPrice = (p) =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(p);

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const EASE = [0.22, 1, 0.36, 1];