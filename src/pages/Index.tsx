import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "home" | "servers" | "settings";
type ConnectionStatus = "disconnected" | "connecting" | "connected";
type Protocol = "WireGuard" | "OpenVPN" | "IKEv2" | "SSTP";

interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  premium?: boolean;
}

const SERVERS: Server[] = [
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

const PROTOCOLS: Protocol[] = ["WireGuard", "OpenVPN", "IKEv2", "SSTP"];

const PROTOCOL_INFO: Record<Protocol, { desc: string; icon: string }> = {
  WireGuard: { desc: "Быстрый и современный", icon: "Zap" },
  OpenVPN: { desc: "Надёжный и гибкий", icon: "Shield" },
  IKEv2: { desc: "Стабильный на мобильных", icon: "Smartphone" },
  SSTP: { desc: "Обход файерволов", icon: "Unlock" },
};

function getPingColor(ping: number) {
  if (ping < 40) return "text-emerald-400";
  if (ping < 100) return "text-yellow-400";
  return "text-red-400";
}

function getLoadColor(load: number) {
  if (load < 50) return "bg-emerald-400";
  if (load < 75) return "bg-yellow-400";
  return "bg-red-400";
}

function HomeTab({
  status,
  selectedServer,
  onToggle,
  onServerClick,
}: {
  status: ConnectionStatus;
  selectedServer: Server;
  onToggle: () => void;
  onServerClick: () => void;
}) {
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div className="flex flex-col items-center px-5 pt-8 pb-6 gap-6">
      <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium transition-all duration-500 ${
            isConnected
              ? "border-emerald-500/40 text-emerald-400"
              : isConnecting
              ? "border-yellow-500/40 text-yellow-400"
              : "border-white/10 text-white/50"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected
                ? "bg-emerald-400 animate-pulse-dot"
                : isConnecting
                ? "bg-yellow-400 animate-pulse-dot"
                : "bg-white/30"
            }`}
          />
          {isConnected ? "Защищено" : isConnecting ? "Подключение..." : "Не защищено"}
        </div>
      </div>

      <div
        className="relative animate-fade-in-up opacity-0 delay-100"
        style={{ animationFillMode: "forwards" }}
      >
        {isConnected && (
          <>
            <div className="absolute inset-0 rounded-full ring-active opacity-60" />
            <div
              className="absolute -inset-4 rounded-full ring-active opacity-30"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}

        <button
          onClick={onToggle}
          className={`relative w-44 h-44 rounded-full transition-all duration-500 flex flex-col items-center justify-center gap-2 select-none active:scale-95
            ${
              isConnected
                ? "bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border-2 border-cyan-400/60 neon-glow"
                : isConnecting
                ? "bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 border-2 border-yellow-400/60"
                : "bg-gradient-to-br from-white/5 to-white/3 border-2 border-white/15 hover:border-white/30"
            }
          `}
        >
          {isConnecting ? (
            <div className="w-12 h-12 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full ring-connecting" />
          ) : (
            <Icon
              name="Power"
              size={48}
              className={`transition-all duration-500 ${isConnected ? "text-cyan-400" : "text-white/40"}`}
            />
          )}
          <span
            className={`text-sm font-semibold tracking-widest uppercase transition-all duration-500 ${
              isConnected ? "text-cyan-400" : isConnecting ? "text-yellow-400" : "text-white/40"
            }`}
          >
            {isConnected ? "Вкл" : isConnecting ? "..." : "Выкл"}
          </span>
        </button>
      </div>

      <div
        className="text-center animate-fade-in-up opacity-0 delay-200"
        style={{ animationFillMode: "forwards" }}
      >
        {isConnected ? (
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-white/40 uppercase tracking-widest">Ваш IP</p>
            <p className="text-2xl font-bold gradient-text">185.212.47.99</p>
            <p className="text-xs text-white/40">
              {selectedServer.flag} {selectedServer.city}, {selectedServer.country}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-white/40 uppercase tracking-widest">Ваш IP</p>
            <p className="text-xl font-bold text-white/30">◼◼◼.◼◼◼.◼◼◼.◼◼◼</p>
            <p className="text-xs text-white/30">Подключитесь для защиты</p>
          </div>
        )}
      </div>

      {isConnected && (
        <div
          className="grid grid-cols-3 gap-3 w-full animate-fade-in-up opacity-0 delay-300"
          style={{ animationFillMode: "forwards" }}
        >
          {[
            { label: "Пинг", value: `${selectedServer.ping} мс`, icon: "Activity" },
            { label: "Скорость", value: "94 Мб/с", icon: "TrendingUp" },
            { label: "Трафик", value: "1.2 ГБ", icon: "Database" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-3 text-center">
              <Icon name={stat.icon} size={16} className="text-cyan-400 mx-auto mb-1" />
              <p className="text-xs text-white/40">{stat.label}</p>
              <p className="text-sm font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <div
        className="w-full animate-fade-in-up opacity-0 delay-400"
        style={{ animationFillMode: "forwards" }}
      >
        <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Сервер</p>
        <button
          onClick={onServerClick}
          className="w-full glass glass-hover rounded-2xl p-4 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedServer.flag}</span>
            <div className="text-left">
              <p className="font-semibold text-white">{selectedServer.city}</p>
              <p className="text-xs text-white/40">{selectedServer.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${getPingColor(selectedServer.ping)}`}>
              {selectedServer.ping} мс
            </span>
            <Icon
              name="ChevronRight"
              size={16}
              className="text-white/30 group-hover:text-cyan-400 transition-colors"
            />
          </div>
        </button>
      </div>
    </div>
  );
}

function ServersTab({
  servers,
  selectedId,
  onSelect,
}: {
  servers: Server[];
  selectedId: string;
  onSelect: (s: Server) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = servers.filter(
    (s) =>
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col px-5 pt-6 pb-6 gap-4">
      <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <h2 className="text-xl font-bold gradient-text mb-4">Серверы</h2>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по стране или городу..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((server, i) => (
          <button
            key={server.id}
            onClick={() => onSelect(server)}
            className={`w-full animate-fade-in-up opacity-0 glass glass-hover rounded-2xl p-4 flex items-center justify-between transition-all duration-200 ${
              selectedId === server.id ? "border-cyan-400/50 bg-cyan-400/5 neon-glow" : ""
            }`}
            style={{ animationFillMode: "forwards", animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{server.flag}</span>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white text-sm">{server.city}</p>
                  {server.premium && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-medium">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/40">{server.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`text-sm font-semibold ${getPingColor(server.ping)}`}>
                  {server.ping} мс
                </p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getLoadColor(server.load)}`}
                      style={{ width: `${server.load}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/30">{server.load}%</span>
                </div>
              </div>
              {selectedId === server.id ? (
                <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-black" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-white/20" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({
  protocol,
  setProtocol,
  autoStart,
  setAutoStart,
  notifications,
  setNotifications,
  killSwitch,
  setKillSwitch,
  dnsLeak,
  setDnsLeak,
}: {
  protocol: Protocol;
  setProtocol: (p: Protocol) => void;
  autoStart: boolean;
  setAutoStart: (v: boolean) => void;
  notifications: boolean;
  setNotifications: (v: boolean) => void;
  killSwitch: boolean;
  setKillSwitch: (v: boolean) => void;
  dnsLeak: boolean;
  setDnsLeak: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col px-5 pt-6 pb-6 gap-5">
      <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <h2 className="text-xl font-bold gradient-text mb-5">Настройки</h2>

        <div className="glass rounded-2xl p-4 mb-4">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Протокол</p>
          <div className="grid grid-cols-2 gap-2">
            {PROTOCOLS.map((p) => (
              <button
                key={p}
                onClick={() => setProtocol(p)}
                className={`p-3 rounded-xl flex items-center gap-2 transition-all duration-200 text-left ${
                  protocol === p
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40 text-white"
                    : "bg-white/3 border border-white/8 text-white/50 hover:bg-white/6 hover:text-white/70"
                }`}
              >
                <Icon
                  name={PROTOCOL_INFO[p].icon}
                  size={16}
                  className={protocol === p ? "text-cyan-400" : "text-white/30"}
                />
                <div>
                  <p className="text-xs font-semibold">{p}</p>
                  <p className="text-[10px] text-white/30">{PROTOCOL_INFO[p].desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          {[
            { icon: "Play", label: "Автозапуск", desc: "Подключаться при старте", value: autoStart, onChange: setAutoStart },
            { icon: "Bell", label: "Уведомления", desc: "Статус подключения", value: notifications, onChange: setNotifications },
            { icon: "Sword", label: "Kill Switch", desc: "Блокировать трафик без VPN", value: killSwitch, onChange: setKillSwitch },
            { icon: "Eye", label: "DNS защита", desc: "Предотвращение DNS-утечек", value: dnsLeak, onChange: setDnsLeak },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className={`flex items-center justify-between p-4 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.value ? "bg-cyan-500/20" : "bg-white/5"}`}>
                  <Icon name={item.icon} size={14} className={item.value ? "text-cyan-400" : "text-white/30"} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => item.onChange(!item.value)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                  item.value ? "bg-gradient-to-r from-cyan-500 to-cyan-400 neon-glow" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                    item.value ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-4 mt-4 text-center">
          <p className="text-xs text-white/30">NovaPulse VPN v1.0.0</p>
          <p className="text-[10px] text-white/20 mt-1">Ваши данные надёжно защищены</p>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [protocol, setProtocol] = useState<Protocol>("WireGuard");
  const [autoStart, setAutoStart] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);
  const [dnsLeak, setDnsLeak] = useState(true);

  const handleToggle = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setTimeout(() => setStatus("connected"), 2000);
    } else {
      setStatus("disconnected");
    }
  };

  const handleSelectServer = (server: Server) => {
    setSelectedServer(server);
    setTab("home");
    if (status === "connected") {
      setStatus("connecting");
      setTimeout(() => setStatus("connected"), 1500);
    }
  };

  const NAV = [
    { id: "home" as Tab, icon: "Home", label: "Главная" },
    { id: "servers" as Tab, icon: "Globe", label: "Серверы" },
    { id: "settings" as Tab, icon: "Settings2", label: "Настройки" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl animate-gradient"
          style={{ background: "linear-gradient(135deg, #00f5ff, #a855f7)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-8 blur-3xl animate-gradient"
          style={{ background: "linear-gradient(135deg, #a855f7, #f0abfc)", animationDelay: "2s" }}
        />
      </div>

      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col"
        style={{
          minHeight: "780px",
          background: "rgba(10, 12, 20, 0.92)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(0,245,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00f5ff, #a855f7)" }}
            >
              <Icon name="Shield" size={14} className="text-black" />
            </div>
            <span className="font-bold text-sm tracking-wide gradient-text">NovaPulse</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-3 bg-white/20 rounded-full" />
            <div className="w-1 h-4 bg-white/30 rounded-full" />
            <div className="w-1 h-5 bg-white/50 rounded-full" />
            <div className="w-1 h-5 bg-white/70 rounded-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" key={tab}>
          {tab === "home" && (
            <HomeTab
              status={status}
              selectedServer={selectedServer}
              onToggle={handleToggle}
              onServerClick={() => setTab("servers")}
            />
          )}
          {tab === "servers" && (
            <ServersTab servers={SERVERS} selectedId={selectedServer.id} onSelect={handleSelectServer} />
          )}
          {tab === "settings" && (
            <SettingsTab
              protocol={protocol}
              setProtocol={setProtocol}
              autoStart={autoStart}
              setAutoStart={setAutoStart}
              notifications={notifications}
              setNotifications={setNotifications}
              killSwitch={killSwitch}
              setKillSwitch={setKillSwitch}
              dnsLeak={dnsLeak}
              setDnsLeak={setDnsLeak}
            />
          )}
        </div>

        <div
          className="flex items-center justify-around px-4 py-3 mx-4 mb-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 ${
                tab === item.id ? "bg-cyan-500/10" : "hover:bg-white/5"
              }`}
            >
              <Icon
                name={item.icon}
                size={20}
                className={tab === item.id ? "text-cyan-400" : "text-white/30"}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  tab === item.id ? "text-cyan-400" : "text-white/30"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
