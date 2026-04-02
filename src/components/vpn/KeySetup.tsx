import { useState } from "react";
import Icon from "@/components/ui/icon";

interface KeySetupProps {
  vpnKey: string;
  onSave: (key: string) => void;
  onClose: () => void;
}

type KeyType = "outline" | "wireguard" | "unknown";

const PRESET_KEYS = [
  {
    name: "Рабочий",
    key: "https://connect.alpha-network.org/uhNAGRUWzp44XSEo",
    type: "Outline",
    badge: "✓ Проверен",
  },
];

function detectKeyType(key: string): KeyType {
  if (key.startsWith("ss://") || key.startsWith("ssconf://") || key.startsWith("https://connect.")) return "outline";
  if (key.includes("[Interface]") || key.includes("PrivateKey")) return "wireguard";
  return "unknown";
}

const EXAMPLES = {
  outline: "ss://Y2hhY2hhMjA...",
  wireguard: "[Interface]\nPrivateKey = ...\n\n[Peer]\nPublicKey = ...",
};

export default function KeySetup({ vpnKey, onSave, onClose }: KeySetupProps) {
  const [value, setValue] = useState(vpnKey);
  const [saved, setSaved] = useState(false);
  const [activeExample, setActiveExample] = useState<"outline" | "wireguard">("outline");

  const keyType = detectKeyType(value.trim());

  const handleSave = () => {
    onSave(value.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setValue("");
    onSave("");
  };

  return (
    <div className="flex flex-col px-5 pt-6 pb-6 gap-4 animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
      <div className="flex items-center gap-3 mb-1">
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Icon name="ArrowLeft" size={16} className="text-white/60" />
        </button>
        <h2 className="text-xl font-bold gradient-text">Мой VPN-ключ</h2>
      </div>

      {/* Preset keys */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Готовые ключи</p>
        <div className="flex flex-col gap-2">
          {PRESET_KEYS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setValue(preset.key)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left ${
                value === preset.key
                  ? "bg-emerald-500/15 border border-emerald-500/30"
                  : "bg-white/4 border border-white/8 hover:bg-white/8"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${value === preset.key ? "bg-emerald-400" : "bg-white/20"}`} />
                <div>
                  <p className={`text-sm font-semibold ${value === preset.key ? "text-emerald-400" : "text-white"}`}>
                    {preset.name}
                  </p>
                  <p className="text-[10px] text-white/30">{preset.type}</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                {preset.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Как это работает</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Вставьте ваш личный VPN-ключ от любого провайдера. Приложение сохранит его и будет использовать при подключении.
        </p>
        <a
          href="https://getoutline.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Получить бесплатный ключ Outline
          <Icon name="ExternalLink" size={11} />
        </a>
      </div>

      {/* Key type badge */}
      {value.trim().length > 0 && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium w-fit ${
          keyType === "outline" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
          keyType === "wireguard" ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" :
          "bg-white/5 border border-white/10 text-white/40"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            keyType === "outline" ? "bg-emerald-400" :
            keyType === "wireguard" ? "bg-cyan-400" : "bg-white/30"
          }`} />
          {keyType === "outline" ? "Outline / Shadowsocks" :
           keyType === "wireguard" ? "WireGuard конфиг" : "Тип не определён"}
        </div>
      )}

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Вставьте ваш VPN-ключ...\n\nПример: ${EXAMPLES[activeExample]}`}
          rows={6}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-cyan-400/50 transition-colors resize-none font-mono leading-relaxed"
        />
        {value.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Icon name="X" size={12} className="text-white/50" />
          </button>
        )}
      </div>

      {/* Examples toggle */}
      <div>
        <p className="text-xs text-white/30 mb-2">Примеры форматов:</p>
        <div className="flex gap-2">
          {(["outline", "wireguard"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveExample(type)}
              className={`text-xs px-3 py-1.5 rounded-xl transition-all duration-200 ${
                activeExample === type
                  ? "bg-cyan-500/15 border border-cyan-400/30 text-cyan-400"
                  : "bg-white/5 border border-white/8 text-white/30 hover:text-white/50"
              }`}
            >
              {type === "outline" ? "Outline" : "WireGuard"}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-white/20 mt-2 font-mono break-all">
          {EXAMPLES[activeExample].split("\n")[0]}
        </p>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={value.trim().length === 0 || saved}
        className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
          saved
            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
            : value.trim().length > 0
            ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white neon-glow active:scale-95"
            : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
        }`}
      >
        {saved ? "✓ Сохранено!" : "Сохранить ключ"}
      </button>

      {vpnKey && !saved && (
        <p className="text-center text-xs text-emerald-400/70">
          ✓ Ключ сохранён и активен
        </p>
      )}
    </div>
  );
}