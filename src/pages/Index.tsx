import { useState } from "react";
import Icon from "@/components/ui/icon";
import HomeTab from "@/components/vpn/HomeTab";
import ServersTab from "@/components/vpn/ServersTab";
import SettingsTab from "@/components/vpn/SettingsTab";
import KeySetup from "@/components/vpn/KeySetup";
import { Tab, ConnectionStatus, Protocol, Server, SERVERS } from "@/components/vpn/types";

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [protocol, setProtocol] = useState<Protocol>("WireGuard");
  const [autoStart, setAutoStart] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);
  const [dnsLeak, setDnsLeak] = useState(true);
  const [vpnKey, setVpnKey] = useState("https://connect.alpha-network.org/uhNAGRUWzp44XSEo");
  const [showKeySetup, setShowKeySetup] = useState(false);

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
            <span className="font-bold text-sm tracking-wide gradient-text">RealVPN</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-3 bg-white/20 rounded-full" />
            <div className="w-1 h-4 bg-white/30 rounded-full" />
            <div className="w-1 h-5 bg-white/50 rounded-full" />
            <div className="w-1 h-5 bg-white/70 rounded-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" key={tab + String(showKeySetup)}>
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
          {tab === "settings" && !showKeySetup && (
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
              vpnKey={vpnKey}
              onKeySetup={() => setShowKeySetup(true)}
            />
          )}
          {tab === "settings" && showKeySetup && (
            <KeySetup
              vpnKey={vpnKey}
              onSave={setVpnKey}
              onClose={() => setShowKeySetup(false)}
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