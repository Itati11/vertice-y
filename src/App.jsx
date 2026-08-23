import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard, CalendarDays, Repeat2, Bell, Users, LogOut,
  ChevronLeft, ChevronRight, Check, X, Plus, Trash2, Clock, Menu,
  ShieldCheck, UserCog, Wrench, Siren, GraduationCap, DollarSign, AlertTriangle
} from "lucide-react";

/* Isotipo real de VÉRTICE Y (flechas + Y), recortado con fondo transparente a partir del logo provisto */
const VERTICE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAABaCAYAAAAhD23hAAAqJElEQVR4nO2dd5xcZfX/P+c8907Z3exmS3bTCSpIAOEroPgTCyhRBBQBw1e+gAioFEGlB6LsrNKRgAoogkgRwQQsXysIAtIsNAsQaiB1S[...snip for brevity... zost]";

function VerticeMark({ size = 22, className = "" }) {
  return <img src={VERTICE_ICON} alt="Vértice Y" className={`vy-logo-mark ${className}`} style={{ height: size, width: "auto" }} />;
}

/* ---------------------------------------------------------------
   VÉRTICE Y — gestión de personal para estaciones de servicio
   Paleta: asfalto + señalética de surtidor (ámbar / acero / violeta)
--------------------------------------------------------------- */

const STORAGE_KEYS = {
  users: "vy_users",
  shifts: "vy_shifts",
  swaps: "vy_swaps",
  notifications: "vy_notifications",
  urgent: "vy_urgent",
  courses: "vy_courses",
  completions: "vy_completions",
};

const ROLE_LABEL = { admin: "Administrativo", full: "Empleado Full", playero: "Playero" };
const ROLE_ICON = { admin: ShieldCheck, full: UserCog, playero: Wrench };

const SHIFT_TYPES = {
  manana: { label: "Mañana", short: "MAÑ", start: "06:00", end: "14:00", varc: "--c-manana" },
  tarde: { label: "Tarde", short: "TAR", start: "14:00", end: "22:00", varc: "--c-tarde" },
  noche: { label: "Noche", short: "NOC", start: "22:00", end: "06:00", varc: "--c-noche" },
  franco: { label: "Franco", short: "FR", start: null, end: null, varc: "--c-franco" },
};

const DAYS_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DAYS_ES_SHORT = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MONTHS_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function pad(n) { return String(n).padStart(2, "0"); }
function toISO(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function fromISO(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function getMonday(d) { const x = new Date(d); const day = x.getDay(); const diff = day === 0 ? -6 : 1 - day; return addDays(x, diff); }
function displayDate(d) { return `${DAYS_ES_SHORT[d.getDay()]} ${d.getDate()} ${MONTHS_ES[d.getMonth()]}`; }
function sameDay(a, b) { return toISO(a) === toISO(b); }
function uid(prefix) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`; }
function formatMoney(n) { return `$ ${Number(n || 0).toLocaleString("es-AR")}`; }
function shiftHours(type) {
  const t = SHIFT_TYPES[type];
  if (!t || !t.start) return 0;
  const [sh, sm] = t.start.split(":").map(Number);
  const [eh, em] = t.end.split(":").map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff <= 0) diff += 24 * 60;
  return diff / 60;
}
// Empleados de franco y disponibles ese día (candidatos naturales para cubrir un turno urgente)
function francoEmployeesOn(users, shifts, date, excludeUserId) {
  return users.filter((u) => u.role !== "admin" && u.id !== excludeUserId &&
    shifts.some((s) => s.userId === u.id && s.date === date && s.type === "franco"));
}

// ... rest of file unchanged ...

function UrgentView({ users, shifts, urgentCalls, currentUser, isAdmin, onCreateUrgent, onOfferUrgent, onResolveUrgent, onCancelUrgent }) {
  const todayISO = toISO(new Date());

  const myUpcoming = !isAdmin ? shifts
    .filter((s) => s.userId === currentUser.id && s.date >= todayISO && s.type !== "franco")
    .sort((a, b) => a.date.localeCompare(b.date)) : [];

  const [shiftId, setShiftId] = useState("");
  const [manualDate, setManualDate] = useState(todayISO);
  const [manualType, setManualType] = useState("manana");
  const [bono, setBono] = useState(10000);
  const [note, setNote] = useState("");
  const [showForm, setShowForm] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (isAdmin) {
      onCreateUrgent({ requestedBy: currentUser.id, date: manualDate, type: manualType, bono: Number(bono) || 0, note, shiftId: null });
    } else {
      const shift = myUpcoming.find((s) => s.id === shiftId);
      if (!shift) return;
      onCreateUrgent({ requestedBy: currentUser.id, date: shift.date, type: shift.type, bono: Number(bono) || 0, note, shiftId: shift.id });
    }
    setShiftId(""); setNote(""); setBono(10000); setShowForm(false);
  }

  const relevant = isAdmin ? urgentCalls : urgentCalls.filter((c) =>
    c.requestedBy === currentUser.id ||
    c.candidateUserId === currentUser.id ||
    (c.status === "buscando" && shifts.some((s) => s.userId === currentUser.id && s.date === c.date && s.type === "franco"))
  );

  return (
    <div className="vy-view">
      <div className="vy-view-head">
        <h1>Turno Urgente</h1>
        <p>Cobertura inmediata con bono de incentivo para personal de franco disponible</p>
      </div>

      {!isAdmin && (
        <>
          {!showForm ? (
            <button className="vy-btn vy-btn-alarm-cta" onClick={() => setShowForm(true)}>
              <Siren size={18} /> Reportar turno urgente
            </button>
          ) : (
            <form className="vy-form vy-swap-form vy-urgent-form" onSubmit={submit}>
              <label className="vy-label">Tu turno a cubrir
                <select className="vy-input" value={shiftId} onChange={(e) => setShiftId(e.target.value)} required>
                  <option value="">Elegí un turno</option>
                  {myUpcoming.map((s) => {
                    const d = fromISO(s.date);
                    return <option key={s.id} value={s.id}>{displayDate(d)} · {SHIFT_TYPES[s.type].label}</option>;
                  })}
                </select>
              </label>

              <label className="vy-label">Bono ofrecido
                <input className="vy-input" type="number" min="0" step="500" value={bono} onChange={(e) => setBono(e.target.value)} />
              </label>

              <label className="vy-label">Motivo
                <input className="vy-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="¿Por qué es urgente?" />
              </label>

              <div className="vy-urgent-form-actions">
                <button className="vy-btn vy-btn-alarm" type="submit">
                  <Siren size={15} style={{ marginRight: 6 }} />
                  Enviar alarma a personal de franco
                </button>

                <button className="vy-btn-ghost" type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>

              <p className="vy-urgent-hint">
                Se notifica al instante a todo el personal que esté de franco ese día. El bono se autoriza bajo las normas de horas extra vigentes.
              </p>
            </form>
          )}
        </>
      )}

      <div className="vy-swap-list" style={{ marginTop: 18 }}>
        {relevant.length === 0 ? (
          <EmptyState icon={Siren} title="Sin llamados urgentes" hint="Cuando se reporte un turno urgente, va a aparecer acá con el bono ofrecido." />
        ) : relevant.slice().reverse().map((c) => (
          <UrgentCallCard
            key={c.id} call={c} users={users} shifts={shifts} currentUser={currentUser} isAdmin={isAdmin}
            onOfferUrgent={onOfferUrgent} onResolveUrgent={onResolveUrgent} onCancelUrgent={onCancelUrgent}
          />
        ))}
      </div>
    </div>
  );
}

// ... rest of file ...
