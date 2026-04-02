export type Tab = "home" | "servers" | "settings";
export type ConnectionStatus = "disconnected" | "connecting" | "connected";
export type Protocol = "WireGuard" | "OpenVPN" | "IKEv2" | "SSTP";

export interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  premium?: boolean;
}

export const SERVERS: Server[] = [
  { id: "1", country: "Нидерланды", city: "Амстердам", flag: "🇳🇱", ping: 18, load: 42 },
  { id: "2", country: "Германия", city: "Франкфурт", flag: "🇩🇪", ping: 22, load: 67 },
  { id: "3", country: "США", city: "Нью-Йорк", flag: "🇺🇸", ping: 95, load: 55, premium: true },
  { id: "4", country: "США", city: "Лос-Анджелес", flag: "🇺🇸", ping: 120, load: 38, premium: true },
  { id: "5", country: "Великобритания", city: "Лондон", flag: "🇬🇧", ping: 35, load: 71 },
  { id: "6", country: "Франция", city: "Париж", flag: "🇫🇷", ping: 28, load: 49 },
  { id: "7", country: "Швейцария", city: "Цюрих", flag: "🇨🇭", ping: 31, load: 33 },
  { id: "8", country: "Япония", city: "Токио", flag: "🇯🇵", ping: 185, load: 44, premium: true },
  { id: "9", country: "Сингапур", city: "Сингапур", flag: "🇸🇬", ping: 160, load: 29 },
  { id: "10", country: "Канада", city: "Торонто", flag: "🇨🇦", ping: 108, load: 51 },
];

export const PROTOCOLS: Protocol[] = ["WireGuard", "OpenVPN", "IKEv2", "SSTP"];

export const PROTOCOL_INFO: Record<Protocol, { desc: string; icon: string }> = {
  WireGuard: { desc: "Быстрый и современный", icon: "Zap" },
  OpenVPN: { desc: "Надёжный и гибкий", icon: "Shield" },
  IKEv2: { desc: "Стабильный на мобильных", icon: "Smartphone" },
  SSTP: { desc: "Обход файерволов", icon: "Unlock" },
};

export function getPingColor(ping: number) {
  if (ping < 40) return "text-emerald-400";
  if (ping < 100) return "text-yellow-400";
  return "text-red-400";
}

export function getLoadColor(load: number) {
  if (load < 50) return "bg-emerald-400";
  if (load < 75) return "bg-yellow-400";
  return "bg-red-400";
}
