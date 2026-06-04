"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, Mail, Shield, CreditCard, Lightbulb, Check } from "lucide-react";

interface AdminNotification {
  id: string;
  type: "contato" | "lgpd" | "pagamento" | "sugestao";
  title: string;
  description: string;
  href: string;
  createdAt: string;
}

const typeIcons = {
  contato: { icon: Mail, color: "text-blue-600", bg: "bg-blue-100" },
  lgpd: { icon: Shield, color: "text-purple-600", bg: "bg-purple-100" },
  pagamento: { icon: CreditCard, color: "text-green-600", bg: "bg-green-100" },
  sugestao: { icon: Lightbulb, color: "text-amber-600", bg: "bg-amber-100" },
};

const LAST_SEEN_KEY = "admin_notifications_last_seen";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min}min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/notifications");
      if (!res.ok) return;
      const data = await res.json();
      const items: AdminNotification[] = data.notifications || [];
      setNotifications(items);

      // Conta itens mais novos que a última visita
      const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY) || 0);
      const novos = items.filter((n) => new Date(n.createdAt).getTime() > lastSeen).length;
      setUnreadCount(novos);
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca ao montar + a cada 60s
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleOpen() {
    const next = !open;
    setOpen(next);
    if (next) {
      // Marca tudo como visto
      localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
      setUnreadCount(0);
    }
  }

  function handleClick(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpen}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#475569] hover:bg-gray-100 transition-colors"
        title="Notificações"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 px-0.5 items-center justify-center rounded-full bg-[#FF4D30] text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-[#0F172A]">Notificações</h3>
            {notifications.length > 0 && (
              <span className="text-xs text-[#94A3B8]">{notifications.length} recentes</span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[#94A3B8]">Carregando...</div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <Check className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm text-[#475569] font-medium">Tudo em dia!</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">Nenhuma notificação recente</p>
              </div>
            ) : (
              notifications.map((n) => {
                const { icon: Icon, color, bg } = typeIcons[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n.href)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A]">{n.title}</p>
                      <p className="text-xs text-[#64748B] truncate">{n.description}</p>
                    </div>
                    <span className="text-[10px] text-[#94A3B8] shrink-0 mt-0.5">{timeAgo(n.createdAt)}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
