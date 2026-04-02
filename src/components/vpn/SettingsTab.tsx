import Icon from "@/components/ui/icon";
import { Protocol, PROTOCOLS, PROTOCOL_INFO } from "./types";

interface SettingsTabProps {
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
  vpnKey: string;
  onKeySetup: () => void;
}

export default function SettingsTab({
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
  vpnKey,
  onKeySetup,
}: SettingsTabProps) {
  return (
    <div className="flex flex-col px-5 pt-6 pb-6 gap-5">
      <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <h2 className="text-xl font-bold gradient-text mb-5">Настройки</h2>

        {/* VPN Key Block */}
        <button
          onClick={onKeySetup}
          className="w-full glass glass-hover rounded-2xl p-4 flex items-center justify-between mb-4 group"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${vpnKey ? "bg-emerald-500/20" : "bg-white/5"}`}>
              <Icon name="KeyRound" size={14} className={vpnKey ? "text-emerald-400" : "text-white/30"} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Мой VPN-ключ</p>
              <p className="text-xs text-white/40">
                {vpnKey ? "✓ Ключ сохранён" : "Не настроен"}
              </p>
            </div>
          </div>
          <Icon name="ChevronRight" size={16} className="text-white/30 group-hover:text-cyan-400 transition-colors" />
        </button>

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
          <p className="text-xs text-white/30">RealVPN v1.0.0</p>
          <p className="text-[10px] text-white/20 mt-1">Ваши данные надёжно защищены</p>
          <a
            href="https://t.me/Germann12_21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-all duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.35l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.656.236z"/>
            </svg>
            @Germann12_21
          </a>
        </div>
      </div>
    </div>
  );
}