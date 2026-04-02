import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Server, getPingColor, getLoadColor } from "./types";

interface ServersTabProps {
  servers: Server[];
  selectedId: string;
  onSelect: (s: Server) => void;
}

export default function ServersTab({ servers, selectedId, onSelect }: ServersTabProps) {
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
