import Icon from "@/components/ui/icon";
import { ConnectionStatus, Server, getPingColor } from "./types";

interface HomeTabProps {
  status: ConnectionStatus;
  selectedServer: Server;
  onToggle: () => void;
  onServerClick: () => void;
}

export default function HomeTab({ status, selectedServer, onToggle, onServerClick }: HomeTabProps) {
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
