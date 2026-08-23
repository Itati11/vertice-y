[FULL FIimport React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard, CalendarDays, Repeat2, Bell, Users, LogOut,
  ChevronLeft, ChevronRight, Check, X, Plus, Trash2, Clock, Menu,
  ShieldCheck, UserCog, Wrench, Siren, GraduationCap, DollarSign, AlertTriangle
} from "lucide-react";

/* Isotipo real de VÉRTICE Y (flechas + Y), recortado con fondo transparente a partir del logo provisto */
const VERTICE_ICON = "data:image/png;base64,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";

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

function seedUsers() {
  return [
    { id: "u1", username: "admin", password: "admin123", name: "Marina Ibarra", role: "admin" },
    { id: "u2", username: "jrodriguez", password: "1234", name: "Julián Rodríguez", role: "full" },
    { id: "u3", username: "lgomez", password: "1234", name: "Lucía Gómez", role: "full" },
    { id: "u4", username: "mcabrera", password: "1234", name: "Matías Cabrera", role: "playero" },
    { id: "u5", username: "sfernandez", password: "1234", name: "Sofía Fernández", role: "playero" },
    { id: "u6", username: "dperez", password: "1234", name: "Diego Pérez", role: "playero" },
  ];
}

function seedShifts(users) {
  const pattern = ["manana", "manana", "tarde", "tarde", "noche", "noche", "franco"];
  const monday = getMonday(new Date());
  const employees = users.filter((u) => u.role !== "admin");
  const shifts = [];
  employees.forEach((emp, idx) => {
    for (let d = -7; d < 14; d++) {
      const date = addDays(monday, d);
      const type = pattern[(d + idx * 2 + pattern.length * 10) % pattern.length];
      shifts.push({ id: uid("s"), userId: emp.id, date: toISO(date), type });
    }
  });
  return shifts;
}

function seedSwaps(users, shifts) {
  const julian = users.find((u) => u.username === "jrodriguez");
  const lucia = users.find((u) => u.username === "lgomez");
  const target = shifts.find((s) => s.userId === julian.id && fromISO(s.date) > new Date() && s.type !== "franco");
  if (!target) return [];
  return [{
    id: uid("sw"), shiftId: target.id, fromUserId: julian.id, toUserId: lucia.id,
    note: "Tengo un turno médico, ¿me lo cambiás?", status: "pending", createdAt: new Date().toISOString(),
  }];
}

// Notificaciones "push" que dispara un llamado urgente hacia el personal de franco disponible
function buildUrgentNotifications(urgentCall, users, shifts) {
  const requester = users.find((u) => u.id === urgentCall.requestedBy);
  const admin = users.find((u) => u.role === "admin");
  const candidates = francoEmployeesOn(users, shifts, urgentCall.date, urgentCall.requestedBy);
  const d = fromISO(urgentCall.date);
  const notifs = candidates.map((c) => ({
    id: uid("n"), userId: c.id, kind: "urgent", urgentCallId: urgentCall.id, read: false, createdAt: new Date().toISOString(),
    message: `🚨 Turno urgente ${displayDate(d)} (${SHIFT_TYPES[urgentCall.type].label}) — Bono de ${formatMoney(urgentCall.bono)} si lo cubrís.`,
  }));
  if (admin) {
    notifs.push({
      id: uid("n"), userId: admin.id, kind: "urgent", urgentCallId: urgentCall.id, read: false, createdAt: new Date().toISOString(),
      message: `Se lanzó un llamado urgente${requester ? ` de ${requester.name}` : ""} para el ${displayDate(d)}.`,
    });
  }
  return notifs;
}

function seedUrgentCalls(users, shifts) {
  const sofia = users.find((u) => u.username === "sfernandez");
  if (!sofia) return { calls: [], notifs: [] };
  const target = shifts.find((s) => s.userId === sofia.id && fromISO(s.date) >= new Date() && s.type !== "franco");
  if (!target) return { calls: [], notifs: [] };
  const call = {
    id: uid("uc"), shiftId: target.id, requestedBy: sofia.id, date: target.date, type: target.type,
    bono: 15000, note: "Turno médico de urgencia, no llego a cubrir mi turno.",
    status: "buscando", candidateUserId: null, createdAt: new Date().toISOString(),
  };
  return { calls: [call], notifs: buildUrgentNotifications(call, users, shifts) };
}

// Notificaciones al asignar un curso obligatorio a los roles destino
function buildCourseNotifications(course, users) {
  const targets = users.filter((u) => u.role !== "admin" && course.targetRoles.includes(u.role));
  const d = fromISO(course.dueDate);
  return targets.map((u) => ({
    id: uid("n"), userId: u.id, kind: "course", courseId: course.id, read: false, createdAt: new Date().toISOString(),
    message: `📚 Curso obligatorio pendiente: "${course.name}". Vence el ${displayDate(d)}.`,
  }));
}

function seedCourses(users) {
  const dueDate = toISO(addDays(new Date(), 5));
  const course = {
    id: uid("c"), name: "Manejo seguro de combustibles e hidrocarburos", dueDate,
    targetRoles: ["full", "playero"], createdAt: new Date().toISOString(),
  };
  return { courses: [course], notifs: buildCourseNotifications(course, users) };
}

function seedNotifications(users) {
  const lucia = users.find((u) => u.username === "lgomez");
  const matias = users.find((u) => u.username === "mcabrera");
  return [
    { id: uid("n"), userId: lucia.id, message: "Julián Rodríguez te pidió cubrir un turno. Respondé si lo aceptás.", read: false, createdAt: new Date().toISOString() },
    { id: uid("n"), userId: matias.id, message: "Se actualizó tu cronograma de la próxima semana.", read: false, createdAt: new Date().toISOString() },
  ];
}

async function loadKey(key, seedFn) {
  try {
    const res = await window.storage.get(key, true);
    if (res && res.value) return JSON.parse(res.value);
    return null;
  } catch (e) {
    return null;
  }
}
async function saveKey(key, value) {
  try { await window.storage.set(key, JSON.stringify(value), true); } catch (e) { /* noop */ }
}

/* ---------------------------- UI atoms ---------------------------- */

function RoleBadge({ role }) {
  const Icon = ROLE_ICON[role] || Users;
  return (
    <span className="vy-badge" style={{ borderColor: "var(--border)" }}>
      <Icon size={12} style={{ marginRight: 5 }} />
      {ROLE_LABEL[role]}
    </span>
  );
}

function ShiftPill({ type, muted }) {
  const t = SHIFT_TYPES[type];
  if (!t) return <span className="vy-pill vy-pill-empty">—</span>;
  return (
    <span
      className={`vy-pill${type === "franco" ? " vy-pill-franco" : ""}`}
      style={{ "--pill-color": `var(${t.varc})`, opacity: muted ? 0.45 : 1 }}
    >
      {t.short}
    </span>
  );
}

function StatusDot({ status }) {
  const map = { activo: "var(--c-green)", proximo: "var(--c-amber)", inactivo: "var(--text-dim)" };
  return <span className="vy-dot" style={{ background: map[status] || map.inactivo }} />;
}

function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="vy-empty">
      <Icon size={28} strokeWidth={1.5} />
      <div className="vy-empty-title">{title}</div>
      {hint && <div className="vy-empty-hint">{hint}</div>}
    </div>
  );
}

/* ---------------------------- Login ---------------------------- */

function LoginScreen({ users, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const u = users.find((x) => x.username.toLowerCase() === username.trim().toLowerCase() && x.password === password);
    if (!u) { setError("Usuario o contraseña incorrectos."); return; }
    setError("");
    onLogin(u);
  }

  return (
    <div className="vy-login-wrap">
      <div className="vy-login-card">
        <div className="vy-brand">
          <VerticeMark size={30} />
          <div>
            <div className="vy-brand-name">VÉRTICE Y</div>
            <div className="vy-brand-sub">Gestión de personal &amp; turnos</div>
          </div>
        </div>

        <form onSubmit={submit} className="vy-form">
          <label className="vy-label">Usuario
            <input className="vy-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ej. jrodriguez" autoFocus />
          </label>
          <label className="vy-label">Contraseña
            <input className="vy-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
          </label>
          {error && <div className="vy-error">{error}</div>}
          <button className="vy-btn vy-btn-primary" type="submit">Ingresar</button>
        </form>

        <div className="vy-demo">
          <div className="vy-demo-title">Accesos de prueba</div>
          <div className="vy-demo-grid">
            {users.map((u) => (
              <button key={u.id} className="vy-demo-chip" onClick={() => onLogin(u)}>
                <span>{u.name.split(" ")[0]}</span>
                <em>{ROLE_LABEL[u.role]}</em>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Dashboard ---------------------------- */

function shiftStatusFor(type, now) {
  if (type === "franco" || !type) return "inactivo";
  const t = SHIFT_TYPES[type];
  const [sh, sm] = t.start.split(":").map(Number);
  const [eh, em] = t.end.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = sh * 60 + sm;
  let end = eh * 60 + em;
  if (end <= start) end += 24 * 60; // overnight (noche)
  let c = cur;
  if (type === "noche" && c < start) c += 24 * 60;
  if (c >= start && c <= end) return "activo";
  if (c < start && start - c <= 120) return "proximo";
  return "inactivo";
}

function Dashboard({ users, shifts, swaps, urgentCalls, courses, completions, currentUser, isAdmin, onOfferUrgent, onNavigate }) {
  const now = new Date();
  const todayISO = toISO(now);
  const employees = users.filter((u) => u.role !== "admin");

  const todayRows = employees.map((emp) => {
    const shift = shifts.find((s) => s.userId === emp.id && s.date === todayISO);
    return { emp, shift, status: shiftStatusFor(shift?.type, now) };
  }).sort((a, b) => (a.status === "activo" ? -1 : 1) - (b.status === "activo" ? -1 : 1));

  const myToday = shifts.find((s) => s.userId === currentUser.id && s.date === todayISO);
  const myStatus = shiftStatusFor(myToday?.type, now);

  const activeCount = todayRows.filter((r) => r.status === "activo").length;
  const francosCount = shifts.filter((s) => s.date === todayISO && s.type === "franco").length;
  const pendingSwaps = swaps.filter((s) => s.status === "accepted").length;
  const urgentToAuthorize = urgentCalls.filter((c) => c.status === "pendiente_autorizacion").length;
  const overdueCoursesTotal = isAdmin ? 0 : courses.filter((c) =>
    c.targetRoles.includes(currentUser.role) && c.dueDate < todayISO &&
    !completions.some((cm) => cm.courseId === c.id && cm.userId === currentUser.id)
  ).length;

  // Llamados urgentes donde puedo ofrecerme (estoy de franco hoy/ese día y disponible)
  const myUrgentOffers = !isAdmin ? urgentCalls.filter((c) =>
    c.status === "buscando" && c.requestedBy !== currentUser.id &&
    shifts.some((s) => s.userId === currentUser.id && s.date === c.date && s.type === "franco")
  ) : [];

  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

  return (
    <div className="vy-view">
      <div className="vy-view-head">
        <h1>Panel</h1>
        <p>{DAYS_ES[now.getDay()]} {now.getDate()} de {["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][now.getMonth()]}</p>
      </div>

      {myUrgentOffers.map((c) => {
        const d = fromISO(c.date);
        return (
          <div key={c.id} className="vy-alarm-banner">
            <Siren size={20} className="vy-alarm-icon" />
            <div className="vy-alarm-body">
              <div className="vy-alarm-title">Turno urgente — {displayDate(d)} · {SHIFT_TYPES[c.type].label}</div>
              <div className="vy-alarm-sub">{userMap[c.requestedBy]?.name} necesita reemplazo. Bono de incentivo: <b>{formatMoney(c.bono)}</b> (sujeto a autorización como hora extra).</div>
            </div>
            <button className="vy-btn vy-btn-alarm" onClick={() => onOfferUrgent(c.id, currentUser.id)}>Quiero cubrir</button>
          </div>
        );
      })}

      {overdueCoursesTotal > 0 && (
        <div className="vy-warn-banner" onClick={() => onNavigate("courses")}>
          <GraduationCap size={18} />
          <span>Tenés {overdueCoursesTotal} curso{overdueCoursesTotal > 1 ? "s" : ""} obligatorio{overdueCoursesTotal > 1 ? "s" : ""} sin realizar y vencido{overdueCoursesTotal > 1 ? "s" : ""}.</span>
          <ChevronRight size={16} />
        </div>
      )}

      {currentUser.role !== "admin" && (
        <div className="vy-mytoday">
          <StatusDot status={myStatus} />
          <div>
            <div className="vy-mytoday-label">Tu estado hoy</div>
            <div className="vy-mytoday-value">
              {myToday ? (myToday.type === "franco" ? "Franco" : `${SHIFT_TYPES[myToday.type].label} · ${SHIFT_TYPES[myToday.type].start}–${SHIFT_TYPES[myToday.type].end}`) : "Sin asignar"}
            </div>
          </div>
        </div>
      )}

      <div className="vy-stats">
        <div className="vy-stat"><span>{activeCount}</span><label>En turno ahora</label></div>
        <div className="vy-stat"><span>{francosCount}</span><label>Francos hoy</label></div>
        {currentUser.role === "admin" && <div className="vy-stat vy-stat-alert"><span>{pendingSwaps}</span><label>Cambios por autorizar</label></div>}
        {currentUser.role === "admin" && <div className="vy-stat vy-stat-alarm"><span>{urgentToAuthorize}</span><label>Bonos urgentes por autorizar</label></div>}
      </div>

      <div className="vy-board">
        <div className="vy-board-head">
          <Clock size={14} />
          <span>Tablero de estación — hoy</span>
        </div>
        <div className="vy-board-rows">
          {todayRows.map(({ emp, shift, status }) => (
            <div key={emp.id} className="vy-board-row">
              <StatusDot status={status} />
              <span className="vy-board-name">{emp.name}</span>
              <RoleBadge role={emp.role} />
              <span className="vy-board-time font-mono">
                {shift ? (shift.type === "franco" ? "FRANCO" : `${SHIFT_TYPES[shift.type].start} – ${SHIFT_TYPES[shift.type].end}`) : "— sin asignar —"}
              </span>
              <ShiftPill type={shift?.type} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Mi Cronograma ---------------------------- */

function ScheduleView({ users, shifts, currentUser, isAdmin }) {
  const employees = users.filter((u) => u.role !== "admin");
  const [selectedUserId, setSelectedUserId] = useState(currentUser.role === "admin" ? employees[0]?.id : currentUser.id);
  const [weekOffset, setWeekOffset] = useState(0);

  const monday = addDays(getMonday(new Date()), weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const person = users.find((u) => u.id === selectedUserId) || currentUser;

  return (
    <div className="vy-view">
      <div className="vy-view-head">
        <h1>Cronograma</h1>
        <p>Semana del {displayDate(weekDays[0])} al {displayDate(weekDays[6])}</p>
      </div>

      <div className="vy-toolbar">
        {isAdmin && (
          <select className="vy-input vy-select" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        )}
        <div className="vy-weeknav">
          <button className="vy-icon-btn" onClick={() => setWeekOffset((w) => w - 1)}><ChevronLeft size={16} /></button>
          <button className="vy-btn-ghost" onClick={() => setWeekOffset(0)}>Hoy</button>
          <button className="vy-icon-btn" onClick={() => setWeekOffset((w) => w + 1)}><ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="vy-week-grid">
        {weekDays.map((day) => {
          const iso = toISO(day);
          const shift = shifts.find((s) => s.userId === person.id && s.date === iso);
          const isToday = sameDay(day, new Date());
          return (
            <div key={iso} className={`vy-day-card${isToday ? " vy-day-today" : ""}`}>
              <div className="vy-day-head">
                <span className="vy-day-dow">{DAYS_ES_SHORT[day.getDay()]}</span>
                <span className="vy-day-num">{day.getDate()}</span>
              </div>
              {shift ? (
                <>
                  <ShiftPill type={shift.type} />
                  <div className="vy-day-time font-mono">
                    {shift.type === "franco" ? "Libre" : `${SHIFT_TYPES[shift.type].start}–${SHIFT_TYPES[shift.type].end}`}
                  </div>
                </>
              ) : <div className="vy-day-time" style={{ color: "var(--text-dim)" }}>Sin asignar</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------- Francos ---------------------------- */

function FrancosView({ users, shifts, currentUser, isAdmin }) {
  const employees = users.filter((u) => u.role !== "admin");
  const [selectedUserId, setSelectedUserId] = useState(currentUser.role === "admin" ? employees[0]?.id : currentUser.id);
  const person = users.find((u) => u.id === selectedUserId) || currentUser;
  const todayISO = toISO(new Date());

  const francos = shifts
    .filter((s) => s.userId === person.id && s.type === "franco" && s.date >= todayISO)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="vy-view">
      <div className="vy-view-head">
        <h1>Francos</h1>
        <p>Próximos días libres</p>
      </div>
      {isAdmin && (
        <select className="vy-input vy-select" style={{ marginBottom: 16 }} value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      )}
      {francos.length === 0 ? (
        <EmptyState icon={CalendarDays} title="Sin francos próximos" hint="Cuando se asignen días libres, van a aparecer acá." />
      ) : (
        <div className="vy-franco-list">
          {francos.map((f) => {
            const d = fromISO(f.date);
            return (
              <div key={f.id} className="vy-franco-item">
                <CalendarDays size={16} />
                <span>{DAYS_ES[d.getDay()]}, {d.getDate()} de {MONTHS_ES[d.getMonth()]}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Cambios de turno ---------------------------- */

function SwapsView({ users, shifts, swaps, currentUser, isAdmin, onCreateSwap, onCoworkerRespond, onResolveSwap }) {
  const employees = users.filter((u) => u.role !== "admin");
  const todayISO = toISO(new Date());
  const [shiftId, setShiftId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [note, setNote] = useState("");

  const myUpcoming = shifts
    .filter((s) => s.userId === currentUser.id && s.date >= todayISO && s.type !== "franco")
    .sort((a, b) => a.date.localeCompare(b.date));

  const coworkers = employees.filter((e) => e.id !== currentUser.id);

  function submit(e) {
    e.preventDefault();
    if (!shiftId || !toUserId) return;
    onCreateSwap({ shiftId, toUserId, note, fromUserId: currentUser.id });
    setShiftId(""); setToUserId(""); setNote("");
  }

  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
  const shiftMap = Object.fromEntries(shifts.map((s) => [s.id, s]));

  const relevantSwaps = isAdmin
    ? swaps
    : swaps.filter((s) => s.fromUserId === currentUser.id || s.toUserId === currentUser.id);

  const statusLabel = {
    pending: "Pendiente de aceptación",
    accepted: "Pendiente de autorización",
    declined: "Rechazado por compañero/a",
    approved: "Autorizado",
    rejected: "Rechazado por administración",
  };

  return (
    <div className="vy-view">
      <div className="vy-view-head">
        <h1>Cambios de turno</h1>
        <p>{isAdmin ? "Autorizá los cambios ya aceptados por el compañero/a" : "Pedí un cambio o respondé a los que te llegan"}</p>
      </div>

      {!isAdmin && (
        <form className="vy-form vy-swap-form" onSubmit={submit}>
          <label className="vy-label">Tu turno a ceder
            <select className="vy-input" value={shiftId} onChange={(e) => setShiftId(e.target.value)} required>
              <option value="">Elegí un turno</option>
              {myUpcoming.map((s) => {
                const d = fromISO(s.date);
                return <option key={s.id} value={s.id}>{displayDate(d)} · {SHIFT_TYPES[s.type].label}</option>;
              })}
            </select>
          </label>
          <label className="vy-label">Compañero/a
            <select className="vy-input" value={toUserId} onChange={(e) => setToUserId(e.target.value)} required>
              <option value="">Elegí a quién pedirle</option>
              {coworkers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="vy-label">Nota (opcional)
            <input className="vy-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Contale el motivo" />
          </label>
          <button className="vy-btn vy-btn-primary" type="submit"><Repeat2 size={15} style={{ marginRight: 6 }} />Enviar solicitud</button>
        </form>
      )}

      <div className="vy-swap-list">
        {relevantSwaps.length === 0 ? (
          <EmptyState icon={Repeat2} title="No hay solicitudes" hint={isAdmin ? "Cuando un cambio sea aceptado por el compañero/a, va a aparecer acá para autorizar." : "Todavía no pediste ni recibiste ningún cambio."} />
        ) : relevantSwaps.slice().reverse().map((s) => {
          const shift = shiftMap[s.shiftId];
          const from = userMap[s.fromUserId];
          const to = userMap[s.toUserId];
          if (!shift || !from || !to) return null;
          const d = fromISO(shift.date);
          const iAmReceiver = !isAdmin && s.toUserId === currentUser.id;
          return (
            <div key={s.id} className="vy-swap-card">
              <div className="vy-swap-top">
                <span className={`vy-status vy-status-${s.status}`}>{statusLabel[s.status]}</span>
                <span className="vy-swap-date font-mono">{displayDate(d)}</span>
              </div>
              <div className="vy-swap-body">
                <b>{from.name}</b> le pide a <b>{to.name}</b> cubrir su turno <ShiftPill type={shift.type} />
              </div>
              {s.note && <div className="vy-swap-note">"{s.note}"</div>}

              {iAmReceiver && s.status === "pending" && (
                <div className="vy-swap-actions">
                  <button className="vy-btn vy-btn-approve" onClick={() => onCoworkerRespond(s.id, "accepted")}><Check size={14} /> Aceptar</button>
                  <button className="vy-btn vy-btn-reject" onClick={() => onCoworkerRespond(s.id, "declined")}><X size={14} /> No aceptar</button>
                </div>
              )}

              {isAdmin && s.status === "accepted" && (
                <div className="vy-swap-actions">
                  <button className="vy-btn vy-btn-approve" onClick={() => onResolveSwap(s.id, "approved")}><Check size={14} /> Autorizar</button>
                  <button className="vy-btn vy-btn-reject" onClick={() => onResolveSwap(s.id, "rejected")}><X size={14} /> Rechazar</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------- Turno Urgente (bono de incentivo) ---------------------------- */

const URGENT_STATUS_LABEL = {
  buscando: "Buscando reemplazo",
  pendiente_autorizacion: "Pendiente de autorización",
  autorizado: "Autorizado",
  cancelado: "Cancelado",
};

function UrgentCallCard({ call, users, shifts, currentUser, isAdmin, onOfferUrgent, onResolveUrgent, onCancelUrgent }) {
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
  const requester = userMap[call.requestedBy];
  const candidate = call.candidateUserId ? userMap[call.candidateUserId] : null;
  const d = fromISO(call.date);
  const iAmEligible = !isAdmin && call.status === "buscando" && call.requestedBy !== currentUser.id &&
    shifts.some((s) => s.userId === currentUser.id && s.date === call.date && s.type === "franco");
  const iAmRequester = call.requestedBy === currentUser.id;

  return (
    <div className={`vy-urgent-card${call.status === "buscando" ? " vy-urgent-card-live" : ""}`}>
      <div className="vy-swap-top">
        <span className={`vy-status vy-status-urgent-${call.status}`}>{URGENT_STATUS_LABEL[call.status]}</span>
        <span className="vy-swap-date font-mono">{displayDate(d)}</span>
      </div>
      <div className="vy-swap-body">
        <b>{requester?.name}</b> necesita cubrir su turno <ShiftPill type={call.type} /> — bono <b className="vy-bono">{formatMoney(call.bono)}</b>
      </div>
      {call.note && <div className="vy-swap-note">"{call.note}"</div>}
      {candidate && (call.status === "pendiente_autorizacion" || call.status === "autorizado") && (
        <div className="vy-swap-note">Se ofreció: <b>{candidate.name}</b> · {shiftHours(call.type)} hs extra</div>
      )}

      {iAmEligible && (
        <div className="vy-swap-actions">
          <button className="vy-btn vy-btn-alarm" onClick={() => onOfferUrgent(call.id, currentUser.id)}><Siren size={14} /> Quiero cubrir</button>
        </div>
      )}

      {isAdmin && call.status === "pendiente_autorizacion" && (
        <div className="vy-swap-actions">
          <button className="vy-btn vy-btn-approve" onClick={() => onResolveUrgent(call.id, "autorizado")}><DollarSign size={14} /> Autorizar bono</button>
          <button className="vy-btn vy-btn-reject" onClick={() => onResolveUrgent(call.id, "rechazado")}><X size={14} /> Rechazar oferta</button>
        </div>
      )}

      {(isAdmin || iAmRequester) && (call.status === "buscando" || call.status === "pendiente_autorizacion") && (
        <button className="vy-btn-ghost vy-cancel-link" onClick={() => onCancelUrgent(call.id)}>Cancelar llamado</button>
      )}
    </div>
  );
}

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

      {!showForm ? (
        <button className="vy-btn vy-btn-alarm-cta" onClick={() => setShowForm(true)}>
          <Siren size={18} /> Reportar turno urgente
        </button>
      ) : (
        <form className="vy-form vy-swap-form vy-urgent-form" onSubmit={submit}>
          {isAdmin ? (
            <>
              <label className="vy-label">Fecha
                <input className="vy-input" type="date" value={manualDate} onChange={(e) => setManualDate(e.target.value)} required />
              </label>
              <label className="vy-label">Turno a cubrir
                <select className="vy-input" value={manualType} onChange={(e) => setManualType(e.target.value)}>
                  <option value="manana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="noche">Noche</option>
                </select>
              </label>
            </>
          ) : (
            <label className="vy-label">Tu turno a cubrir
              <select className="vy-input" value={shiftId} onChange={(e) => setShiftId(e.target.value)} required>
                <option value="">Elegí un turno</option>
                {myUpcoming.map((s) => {
                  const d = fromISO(s.date);
                  return <option key={s.id} value={s.id}>{displayDate(d)} · {SHIFT_TYPES[s.type].label}</option>;
                })}
              </select>
            </label>
          )}
          <label className="vy-label">Bono ofrecido
            <input className="vy-input" type="number" min="0" step="500" value={bono} onChange={(e) => setBono(e.target.value)} />
          </label>
          <label className="vy-label">Motivo
            <input className="vy-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="¿Por qué es urgente?" />
          </label>
          <div className="vy-urgent-form-actions">
            <button className="vy-btn vy-btn-alarm" type="submit"><Siren size={15} style={{ marginRight: 6 }} />Enviar alarma a personal de franco</button>
            <button className="vy-btn-ghost" type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
          <p className="vy-urgent-hint">Se notifica al instante a todo el personal que esté de franco ese día. El bono se autoriza bajo las normas de horas extra vigentes.</p>
        </form>
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

/* ---------------------------- Capacitaciones obligatorias ---------------------------- */

function CoursesView({ users, courses, completions, currentUser, isAdmin, onCreateCourse, onDeleteCourse, onMarkComplete }) {
  const todayISO = toISO(new Date());
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState(todayISO);
  const [target, setTarget] = useState("all");

  function submit(e) {
    e.preventDefault();
    if (!name || !dueDate) return;
    const targetRoles = target === "all" ? ["full", "playero"] : [target];
    onCreateCourse({ name, dueDate, targetRoles });
    setName(""); setDueDate(todayISO); setTarget("all");
  }

  if (isAdmin) {
    const employees = users.filter((u) => u.role !== "admin");
    return (
      <div className="vy-view">
        <div className="vy-view-head"><h1>Capacitaciones</h1><p>Cursos obligatorios y su cumplimiento</p></div>

        <form className="vy-form vy-personnel-form" onSubmit={submit}>
          <label className="vy-label">Nombre del curso
            <input className="vy-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="ej. Manejo de extintores" />
          </label>
          <label className="vy-label">Fecha límite
            <input className="vy-input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
          <label className="vy-label">Dirigido a
            <select className="vy-input" value={target} onChange={(e) => setTarget(e.target.value)}>
              <option value="all">Todo el personal</option>
              <option value="full">Solo Empleados Full</option>
              <option value="playero">Solo Playeros</option>
            </select>
          </label>
          <button className="vy-btn vy-btn-primary" type="submit"><Plus size={15} style={{ marginRight: 6 }} />Asignar curso</button>
        </form>

        <div className="vy-course-list">
          {courses.length === 0 ? (
            <EmptyState icon={GraduationCap} title="Sin capacitaciones cargadas" />
          ) : courses.map((c) => {
            const targets = employees.filter((e) => c.targetRoles.includes(e.role));
            const done = targets.filter((e) => completions.some((cm) => cm.courseId === c.id && cm.userId === e.id));
            const overdue = c.dueDate < todayISO;
            const d = fromISO(c.dueDate);
            return (
              <div key={c.id} className="vy-course-card">
                <div className="vy-course-top">
                  <div>
                    <div className="vy-course-name">{c.name}</div>
                    <div className="vy-course-meta font-mono">Vence {displayDate(d)} · {done.length}/{targets.length} completado</div>
                  </div>
                  <button className="vy-icon-btn vy-icon-btn-danger" onClick={() => onDeleteCourse(c.id)}><Trash2 size={15} /></button>
                </div>
                <div className="vy-course-people">
                  {targets.map((e) => {
                    const isDone = done.some((d2) => d2.id === e.id);
                    return (
                      <span key={e.id} className={`vy-course-chip${isDone ? " vy-course-chip-done" : overdue ? " vy-course-chip-overdue" : ""}`}>
                        {e.name}{isDone ? " ✓" : overdue ? " · vencido" : ""}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const mine = courses.filter((c) => c.targetRoles.includes(currentUser.role));

  return (
    <div className="vy-view">
      <div className="vy-view-head"><h1>Capacitaciones</h1><p>Cursos obligatorios asignados a vos</p></div>
      {mine.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No tenés cursos asignados" />
      ) : (
        <div className="vy-course-list">
          {mine.map((c) => {
            const isDone = completions.some((cm) => cm.courseId === c.id && cm.userId === currentUser.id);
            const overdue = !isDone && c.dueDate < todayISO;
            const d = fromISO(c.dueDate);
            return (
              <div key={c.id} className="vy-course-card">
                <div className="vy-course-top">
                  <div>
                    <div className="vy-course-name">{c.name}</div>
                    <div className="vy-course-meta font-mono">Vence {displayDate(d)}</div>
                  </div>
                  <span className={`vy-status ${isDone ? "vy-status-approved" : overdue ? "vy-status-declined" : "vy-status-pending"}`}>
                    {isDone ? "Completado" : overdue ? "No realizado" : "Pendiente"}
                  </span>
                </div>
                {!isDone && (
                  <div className="vy-swap-actions">
                    <button className="vy-btn vy-btn-approve" onClick={() => onMarkComplete(c.id, currentUser.id)}><Check size={14} /> Marcar como realizado</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Notificaciones ---------------------------- */

function NotificationsView({ notifications, currentUser, onMarkRead, urgentCalls, onOfferUrgent, courses, completions, onMarkComplete }) {
  const mine = notifications.filter((n) => n.userId === currentUser.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const callMap = Object.fromEntries((urgentCalls || []).map((c) => [c.id, c]));
  const courseMap = Object.fromEntries((courses || []).map((c) => [c.id, c]));

  return (
    <div className="vy-view">
      <div className="vy-view-head"><h1>Notificaciones</h1><p>Novedades sobre tu turno</p></div>
      {mine.length === 0 ? (
        <EmptyState icon={Bell} title="Sin notificaciones" hint="Te vamos a avisar acá ante cualquier novedad." />
      ) : (
        <div className="vy-notif-list">
          {mine.map((n) => {
            const isUrgent = n.kind === "urgent";
            const isCourse = n.kind === "course";
            const call = isUrgent ? callMap[n.urgentCallId] : null;
            const course = isCourse ? courseMap[n.courseId] : null;
            const canOffer = isUrgent && call && call.status === "buscando" && call.requestedBy !== currentUser.id;
            const canComplete = isCourse && course && !completions.some((cm) => cm.courseId === course.id && cm.userId === currentUser.id);
            return (
              <div
                key={n.id}
                className={`vy-notif-item${n.read ? "" : " vy-notif-unread"}${isUrgent ? " vy-notif-urgent" : ""}${isCourse ? " vy-notif-course" : ""}`}
                onClick={() => onMarkRead(n.id)}
              >
                {isUrgent ? <Siren size={16} className="vy-notif-kind-icon" /> : isCourse ? <GraduationCap size={16} className="vy-notif-kind-icon" /> : (!n.read && <span className="vy-dot" style={{ background: "var(--c-amber)" }} />)}
                <div style={{ flex: 1 }}>
                  <div className="vy-notif-msg">{n.message}</div>
                  <div className="vy-notif-time">{new Date(n.createdAt).toLocaleString("es-AR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
                  {canOffer && (
                    <button className="vy-btn vy-btn-alarm vy-notif-action" onClick={(e) => { e.stopPropagation(); onOfferUrgent(call.id, currentUser.id); }}>
                      <Siren size={13} /> Quiero cubrir
                    </button>
                  )}
                  {canComplete && (
                    <button className="vy-btn vy-btn-approve vy-notif-action" onClick={(e) => { e.stopPropagation(); onMarkComplete(course.id, currentUser.id); }}>
                      <Check size={13} /> Marcar como realizado
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Admin: Personal ---------------------------- */

function PersonnelView({ users, onAddUser, onDeleteUser }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("1234");
  const [role, setRole] = useState("playero");
  const employees = users.filter((u) => u.role !== "admin");

  function submit(e) {
    e.preventDefault();
    if (!name || !username) return;
    onAddUser({ id: uid("u"), name, username, password, role });
    setName(""); setUsername(""); setPassword("1234"); setRole("playero");
  }

  return (
    <div className="vy-view">
      <div className="vy-view-head"><h1>Personal</h1><p>Alta y baja de empleados</p></div>

      <form className="vy-form vy-personnel-form" onSubmit={submit}>
        <label className="vy-label">Nombre completo
          <input className="vy-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" />
        </label>
        <label className="vy-label">Usuario
          <input className="vy-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="usuario de acceso" />
        </label>
        <label className="vy-label">Contraseña
          <input className="vy-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="vy-label">Rol
          <select className="vy-input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="playero">Playero</option>
            <option value="full">Empleado Full</option>
            <option value="admin">Administrativo</option>
          </select>
        </label>
        <button className="vy-btn vy-btn-primary" type="submit"><Plus size={15} style={{ marginRight: 6 }} />Agregar</button>
      </form>

      <div className="vy-person-list">
        {users.map((u) => (
          <div key={u.id} className="vy-person-row">
            <div>
              <div className="vy-person-name">{u.name}</div>
              <div className="vy-person-user font-mono">@{u.username}</div>
            </div>
            <RoleBadge role={u.role} />
            {u.role !== "admin" && (
              <button className="vy-icon-btn vy-icon-btn-danger" onClick={() => onDeleteUser(u.id)}><Trash2 size={15} /></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Admin: Turnos ---------------------------- */

function ShiftEditorView({ users, shifts, onCycleShift }) {
  const employees = users.filter((u) => u.role !== "admin");
  const [weekOffset, setWeekOffset] = useState(0);
  const monday = addDays(getMonday(new Date()), weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const order = ["manana", "tarde", "noche", "franco"];

  return (
    <div className="vy-view">
      <div className="vy-view-head"><h1>Editor de turnos</h1><p>Tocá una celda para rotar el tipo de turno</p></div>

      <div className="vy-toolbar">
        <div className="vy-weeknav">
          <button className="vy-icon-btn" onClick={() => setWeekOffset((w) => w - 1)}><ChevronLeft size={16} /></button>
          <button className="vy-btn-ghost" onClick={() => setWeekOffset(0)}>Semana actual</button>
          <button className="vy-icon-btn" onClick={() => setWeekOffset((w) => w + 1)}><ChevronRight size={16} /></button>
        </div>
        <span className="vy-toolbar-hint">{displayDate(weekDays[0])} – {displayDate(weekDays[6])}</span>
      </div>

      <div className="vy-editor-table-wrap">
        <table className="vy-editor-table">
          <thead>
            <tr>
              <th>Empleado</th>
              {weekDays.map((d) => <th key={toISO(d)}>{DAYS_ES_SHORT[d.getDay()]} {d.getDate()}</th>)}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="vy-editor-name">{emp.name}</td>
                {weekDays.map((d) => {
                  const iso = toISO(d);
                  const shift = shifts.find((s) => s.userId === emp.id && s.date === iso);
                  const type = shift?.type || "franco";
                  const next = order[(order.indexOf(type) + 1) % order.length];
                  return (
                    <td key={iso}>
                      <button
                        className="vy-editor-cell"
                        onClick={() => onCycleShift(emp.id, iso, shift?.id, next)}
                        title={`Cambiar a ${SHIFT_TYPES[next].label}`}
                      >
                        <ShiftPill type={type} />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------- App shell ---------------------------- */

const NAV_BASE = [
  { key: "dashboard", label: "Panel", icon: LayoutDashboard },
  { key: "schedule", label: "Mi Cronograma", icon: CalendarDays },
  { key: "francos", label: "Francos", icon: CalendarDays },
  { key: "swaps", label: "Cambios de Turno", icon: Repeat2 },
  { key: "urgent", label: "Turno Urgente", icon: Siren, alarm: true },
  { key: "courses", label: "Capacitaciones", icon: GraduationCap },
  { key: "notifications", label: "Notificaciones", icon: Bell },
];
const NAV_ADMIN = [
  { key: "personnel", label: "Personal", icon: Users },
  { key: "editor", label: "Editor de Turnos", icon: Wrench },
];

export default function VerticeYApp() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [urgentCalls, setUrgentCalls] = useState([]);
  const [courses, setCourses] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      let u = await loadKey(STORAGE_KEYS.users);
      if (!u) { u = seedUsers(); await saveKey(STORAGE_KEYS.users, u); }

      let s = await loadKey(STORAGE_KEYS.shifts);
      if (!s) { s = seedShifts(u); await saveKey(STORAGE_KEYS.shifts, s); }

      let sw = await loadKey(STORAGE_KEYS.swaps);
      if (!sw) { sw = seedSwaps(u, s); await saveKey(STORAGE_KEYS.swaps, sw); }

      let n = await loadKey(STORAGE_KEYS.notifications);
      const isNewNotifs = !n;
      if (isNewNotifs) n = seedNotifications(u);
      let notifsDirty = isNewNotifs;

      let uc = await loadKey(STORAGE_KEYS.urgent);
      if (!uc) {
        const seeded = seedUrgentCalls(u, s);
        uc = seeded.calls;
        n = [...n, ...seeded.notifs];
        notifsDirty = true;
        await saveKey(STORAGE_KEYS.urgent, uc);
      }

      let co = await loadKey(STORAGE_KEYS.courses);
      if (!co) {
        const seeded = seedCourses(u);
        co = seeded.courses;
        n = [...n, ...seeded.notifs];
        notifsDirty = true;
        await saveKey(STORAGE_KEYS.courses, co);
      }

      let cm = await loadKey(STORAGE_KEYS.completions);
      if (!cm) { cm = []; await saveKey(STORAGE_KEYS.completions, cm); }

      if (notifsDirty) await saveKey(STORAGE_KEYS.notifications, n);

      setUsers(u); setShifts(s); setSwaps(sw); setNotifications(n);
      setUrgentCalls(uc); setCourses(co); setCompletions(cm);
      setLoading(false);
    })();
  }, []);

  const isAdmin = currentUser?.role === "admin";
  const nav = isAdmin ? [...NAV_BASE, ...NAV_ADMIN] : NAV_BASE;
  const unreadCount = notifications.filter((n) => n.userId === currentUser?.id && !n.read).length;

  const todayISO = toISO(new Date());
  const urgentBadgeCount = !currentUser ? 0 : isAdmin
    ? urgentCalls.filter((c) => c.status === "pendiente_autorizacion").length
    : urgentCalls.filter((c) => (
        (c.status === "buscando" && c.requestedBy !== currentUser.id &&
          shifts.some((s) => s.userId === currentUser.id && s.date === c.date && s.type === "franco")) ||
        (c.requestedBy === currentUser.id && (c.status === "buscando" || c.status === "pendiente_autorizacion"))
      )).length;
  const overdueCoursesCount = !currentUser || isAdmin ? 0 : courses.filter((c) =>
    c.targetRoles.includes(currentUser.role) && c.dueDate < todayISO &&
    !completions.some((cm) => cm.courseId === c.id && cm.userId === currentUser.id)
  ).length;

  const handleLogin = useCallback((u) => { setCurrentUser(u); setView("dashboard"); }, []);
  const handleLogout = useCallback(() => { setCurrentUser(null); setView("dashboard"); }, []);

  const handleCreateSwap = useCallback((payload) => {
    const swap = { id: uid("sw"), status: "pending", createdAt: new Date().toISOString(), ...payload };
    setSwaps((prev) => { const next = [...prev, swap]; saveKey(STORAGE_KEYS.swaps, next); return next; });
    const from = users.find((u) => u.id === payload.fromUserId);
    const newNotifs = [
      { id: uid("n"), userId: payload.toUserId, message: `${from.name} te pidió cubrir un turno. Respondé si lo aceptás.`, read: false, createdAt: new Date().toISOString() },
    ];
    setNotifications((prev) => { const next = [...prev, ...newNotifs]; saveKey(STORAGE_KEYS.notifications, next); return next; });
  }, [users]);

  // El compañero/a receptor acepta o rechaza antes de que pase a autorización administrativa
  const handleCoworkerRespond = useCallback((swapId, response) => {
    setSwaps((prev) => {
      const swap = prev.find((s) => s.id === swapId);
      const nextStatus = response === "accepted" ? "accepted" : "declined";
      const next = prev.map((s) => (s.id === swapId ? { ...s, status: nextStatus } : s));
      saveKey(STORAGE_KEYS.swaps, next);

      const from = users.find((u) => u.id === swap?.fromUserId);
      const to = users.find((u) => u.id === swap?.toUserId);
      const admin = users.find((u) => u.role === "admin");
      const newNotifs = [];
      if (nextStatus === "accepted") {
        if (from) newNotifs.push({ id: uid("n"), userId: from.id, message: `${to?.name} aceptó cubrir tu turno. Ahora falta la autorización de administración.`, read: false, createdAt: new Date().toISOString() });
        if (admin) newNotifs.push({ id: uid("n"), userId: admin.id, message: `${to?.name} aceptó cubrirle el turno a ${from?.name}. Falta tu autorización.`, read: false, createdAt: new Date().toISOString() });
      } else {
        if (from) newNotifs.push({ id: uid("n"), userId: from.id, message: `${to?.name} no aceptó cubrir tu turno.`, read: false, createdAt: new Date().toISOString() });
      }
      setNotifications((prevN) => { const nextN = [...prevN, ...newNotifs]; saveKey(STORAGE_KEYS.notifications, nextN); return nextN; });
      return next;
    });
  }, [users]);

  // El administrador autoriza (o rechaza) un cambio que ya fue aceptado por el compañero/a
  const handleResolveSwap = useCallback((swapId, status) => {
    setSwaps((prev) => {
      const swap = prev.find((s) => s.id === swapId);
      const next = prev.map((s) => (s.id === swapId ? { ...s, status } : s));
      saveKey(STORAGE_KEYS.swaps, next);

      if (swap && status === "approved") {
        setShifts((prevShifts) => {
          const nextShifts = prevShifts.map((sh) => sh.id === swap.shiftId ? { ...sh, userId: swap.toUserId } : sh);
          saveKey(STORAGE_KEYS.shifts, nextShifts);
          return nextShifts;
        });
      }
      const from = users.find((u) => u.id === swap?.fromUserId);
      const to = users.find((u) => u.id === swap?.toUserId);
      const verb = status === "approved" ? "autorizado" : "rechazado";
      const newNotifs = [];
      if (from) newNotifs.push({ id: uid("n"), userId: from.id, message: `Administración ${verb} tu cambio de turno con ${to?.name}.`, read: false, createdAt: new Date().toISOString() });
      if (to) newNotifs.push({ id: uid("n"), userId: to.id, message: `Administración ${verb} el cambio de turno con ${from?.name}.`, read: false, createdAt: new Date().toISOString() });
      setNotifications((prevN) => { const nextN = [...prevN, ...newNotifs]; saveKey(STORAGE_KEYS.notifications, nextN); return nextN; });
      return next;
    });
  }, [users]);

  const handleMarkRead = useCallback((id) => {
    setNotifications((prev) => { const next = prev.map((n) => n.id === id ? { ...n, read: true } : n); saveKey(STORAGE_KEYS.notifications, next); return next; });
  }, []);

  const handleAddUser = useCallback((u) => {
    setUsers((prev) => { const next = [...prev, u]; saveKey(STORAGE_KEYS.users, next); return next; });
  }, []);

  const handleDeleteUser = useCallback((id) => {
    setUsers((prev) => { const next = prev.filter((u) => u.id !== id); saveKey(STORAGE_KEYS.users, next); return next; });
    setShifts((prev) => { const next = prev.filter((s) => s.userId !== id); saveKey(STORAGE_KEYS.shifts, next); return next; });
  }, []);

  const handleCycleShift = useCallback((userId, date, shiftId, nextType) => {
    setShifts((prev) => {
      let next;
      if (shiftId) next = prev.map((s) => s.id === shiftId ? { ...s, type: nextType } : s);
      else next = [...prev, { id: uid("s"), userId, date, type: nextType }];
      saveKey(STORAGE_KEYS.shifts, next);
      return next;
    });
  }, []);

  /* -------- Turno urgente con bono de incentivo -------- */

  const handleCreateUrgent = useCallback((payload) => {
    const call = {
      id: uid("uc"), status: "buscando", candidateUserId: null, createdAt: new Date().toISOString(), ...payload,
    };
    setUrgentCalls((prev) => { const next = [...prev, call]; saveKey(STORAGE_KEYS.urgent, next); return next; });
    const notifs = buildUrgentNotifications(call, users, shifts);
    setNotifications((prevN) => { const nextN = [...prevN, ...notifs]; saveKey(STORAGE_KEYS.notifications, nextN); return nextN; });
  }, [users, shifts]);

  // Un empleado de franco se ofrece a cubrir el llamado urgente
  const handleOfferUrgent = useCallback((urgentCallId, candidateUserId) => {
    setUrgentCalls((prev) => {
      const call = prev.find((c) => c.id === urgentCallId);
      if (!call || call.status !== "buscando") return prev; // ya fue tomado
      const next = prev.map((c) => c.id === urgentCallId ? { ...c, status: "pendiente_autorizacion", candidateUserId } : c);
      saveKey(STORAGE_KEYS.urgent, next);

      const requester = users.find((u) => u.id === call.requestedBy);
      const candidate = users.find((u) => u.id === candidateUserId);
      const admin = users.find((u) => u.role === "admin");
      const d = fromISO(call.date);
      const newNotifs = [];
      if (admin) newNotifs.push({ id: uid("n"), userId: admin.id, kind: "urgent", urgentCallId, read: false, createdAt: new Date().toISOString(), message: `${candidate?.name} se ofreció a cubrir el turno urgente del ${displayDate(d)} por ${formatMoney(call.bono)}. Falta tu autorización.` });
      if (requester) newNotifs.push({ id: uid("n"), userId: requester.id, kind: "urgent", urgentCallId, read: false, createdAt: new Date().toISOString(), message: `${candidate?.name} se ofreció a cubrir tu turno. Queda pendiente la autorización de administración.` });
      setNotifications((prevN) => { const nextN = [...prevN, ...newNotifs]; saveKey(STORAGE_KEYS.notifications, nextN); return nextN; });
      return next;
    });
  }, [users]);

  // El administrador autoriza el bono (bajo normas de horas extra) y reasigna el turno, o rechaza la oferta
  const handleResolveUrgent = useCallback((urgentCallId, decision) => {
    setUrgentCalls((prev) => {
      const call = prev.find((c) => c.id === urgentCallId);
      if (!call) return prev;
      const next = prev.map((c) => c.id === urgentCallId
        ? (decision === "autorizado" ? { ...c, status: "autorizado" } : { ...c, status: "buscando", candidateUserId: null })
        : c);
      saveKey(STORAGE_KEYS.urgent, next);

      const requester = users.find((u) => u.id === call.requestedBy);
      const candidate = users.find((u) => u.id === call.candidateUserId);
      const newNotifs = [];

      if (decision === "autorizado" && candidate) {
        setShifts((prevShifts) => {
          let nextShifts = prevShifts.filter((s) => !(s.userId === candidate.id && s.date === call.date));
          if (call.shiftId) nextShifts = nextShifts.map((s) => s.id === call.shiftId ? { ...s, userId: candidate.id, type: call.type } : s);
          else nextShifts = [...nextShifts, { id: uid("s"), userId: candidate.id, date: call.date, type: call.type }];
          saveKey(STORAGE_KEYS.shifts, nextShifts);
          return nextShifts;
        });
        if (candidate) newNotifs.push({ id: uid("n"), userId: candidate.id, kind: "urgent", urgentCallId, read: false, createdAt: new Date().toISOString(), message: `Administración autorizó tu bono de ${formatMoney(call.bono)} por cubrir el turno como hora extra. ¡Gracias!` });
        if (requester) newNotifs.push({ id: uid("n"), userId: requester.id, kind: "urgent", urgentCallId, read: false, createdAt: new Date().toISOString(), message: `Tu turno urgente quedó cubierto por ${candidate.name}.` });
      } else {
        if (candidate) newNotifs.push({ id: uid("n"), userId: candidate.id, kind: "urgent", urgentCallId, read: false, createdAt: new Date().toISOString(), message: `Tu oferta para cubrir el turno urgente no fue autorizada. Se sigue buscando reemplazo.` });
        if (requester) newNotifs.push({ id: uid("n"), userId: requester.id, kind: "urgent", urgentCallId, read: false, createdAt: new Date().toISOString(), message: `La oferta recibida no fue autorizada. Seguimos buscando quién cubra tu turno.` });
      }
      setNotifications((prevN) => { const nextN = [...prevN, ...newNotifs]; saveKey(STORAGE_KEYS.notifications, nextN); return nextN; });
      return next;
    });
  }, [users]);

  const handleCancelUrgent = useCallback((urgentCallId) => {
    setUrgentCalls((prev) => { const next = prev.map((c) => c.id === urgentCallId ? { ...c, status: "cancelado" } : c); saveKey(STORAGE_KEYS.urgent, next); return next; });
  }, []);

  /* -------- Capacitaciones obligatorias -------- */

  const handleCreateCourse = useCallback((payload) => {
    const course = { id: uid("c"), createdAt: new Date().toISOString(), ...payload };
    setCourses((prev) => { const next = [...prev, course]; saveKey(STORAGE_KEYS.courses, next); return next; });
    const notifs = buildCourseNotifications(course, users);
    setNotifications((prevN) => { const nextN = [...prevN, ...notifs]; saveKey(STORAGE_KEYS.notifications, nextN); return nextN; });
  }, [users]);

  const handleDeleteCourse = useCallback((courseId) => {
    setCourses((prev) => { const next = prev.filter((c) => c.id !== courseId); saveKey(STORAGE_KEYS.courses, next); return next; });
    setCompletions((prev) => { const next = prev.filter((cm) => cm.courseId !== courseId); saveKey(STORAGE_KEYS.completions, next); return next; });
  }, []);

  const handleMarkCourseComplete = useCallback((courseId, userId) => {
    setCompletions((prev) => {
      if (prev.some((c) => c.courseId === courseId && c.userId === userId)) return prev;
      const next = [...prev, { id: uid("cm"), courseId, userId, completedAt: new Date().toISOString() }];
      saveKey(STORAGE_KEYS.completions, next);
      return next;
    });
  }, []);

  if (loading) {
    return (
      <div className="vy-root vy-loading">
        <GlobalStyle />
        <VerticeMark size={40} className="vy-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="vy-root">
        <GlobalStyle />
        <LoginScreen users={users} onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="vy-root">
      <GlobalStyle />
      <div className="vy-shell">
        <aside className={`vy-sidebar${sidebarOpen ? " vy-sidebar-open" : ""}`}>
          <div className="vy-brand vy-brand-side">
            <VerticeMark size={26} />
            <div>
              <div className="vy-brand-name">VÉRTICE Y</div>
              <div className="vy-brand-sub">{ROLE_LABEL[currentUser.role]}</div>
            </div>
          </div>
          <nav className="vy-nav">
            {nav.map((item) => {
              const badgeCount = item.key === "notifications" ? unreadCount
                : item.key === "urgent" ? urgentBadgeCount
                : item.key === "courses" && !isAdmin ? overdueCoursesCount
                : 0;
              return (
                <button
                  key={item.key}
                  className={`vy-nav-item${view === item.key ? " vy-nav-item-active" : ""}`}
                  onClick={() => { setView(item.key); setSidebarOpen(false); }}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  {badgeCount > 0 && <span className={`vy-nav-badge${item.alarm ? " vy-nav-badge-alarm" : ""}`}>{badgeCount}</span>}
                </button>
              );
            })}
          </nav>
          <button className="vy-nav-item vy-logout" onClick={handleLogout}>
            <LogOut size={16} /><span>Cerrar sesión</span>
          </button>
        </aside>

        <div className="vy-main">
          <header className="vy-topbar">
            <button className="vy-icon-btn vy-only-mobile" onClick={() => setSidebarOpen((v) => !v)}><Menu size={18} /></button>
            <div className="vy-topbar-user">
              <div className="vy-avatar">{currentUser.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</div>
              <div>
                <div className="vy-topbar-name">{currentUser.name}</div>
                <RoleBadge role={currentUser.role} />
              </div>
            </div>
          </header>

          <main className="vy-content">
            {view === "dashboard" && (
              <Dashboard
                users={users} shifts={shifts} swaps={swaps} urgentCalls={urgentCalls} courses={courses} completions={completions}
                currentUser={currentUser} isAdmin={isAdmin} onOfferUrgent={handleOfferUrgent} onNavigate={setView}
              />
            )}
            {view === "schedule" && <ScheduleView users={users} shifts={shifts} currentUser={currentUser} isAdmin={isAdmin} />}
            {view === "francos" && <FrancosView users={users} shifts={shifts} currentUser={currentUser} isAdmin={isAdmin} />}
            {view === "swaps" && (
              <SwapsView
                users={users} shifts={shifts} swaps={swaps} currentUser={currentUser} isAdmin={isAdmin}
                onCreateSwap={handleCreateSwap} onCoworkerRespond={handleCoworkerRespond} onResolveSwap={handleResolveSwap}
              />
            )}
            {view === "urgent" && (
              <UrgentView
                users={users} shifts={shifts} urgentCalls={urgentCalls} currentUser={currentUser} isAdmin={isAdmin}
                onCreateUrgent={handleCreateUrgent} onOfferUrgent={handleOfferUrgent}
                onResolveUrgent={handleResolveUrgent} onCancelUrgent={handleCancelUrgent}
              />
            )}
            {view === "courses" && (
              <CoursesView
                users={users} courses={courses} completions={completions} currentUser={currentUser} isAdmin={isAdmin}
                onCreateCourse={handleCreateCourse} onDeleteCourse={handleDeleteCourse} onMarkComplete={handleMarkCourseComplete}
              />
            )}
            {view === "notifications" && (
              <NotificationsView
                notifications={notifications} currentUser={currentUser} onMarkRead={handleMarkRead}
                urgentCalls={urgentCalls} onOfferUrgent={handleOfferUrgent}
                courses={courses} completions={completions} onMarkComplete={handleMarkCourseComplete}
              />
            )}
            {view === "personnel" && isAdmin && <PersonnelView users={users} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />}
            {view === "editor" && isAdmin && <ShiftEditorView users={users} shifts={shifts} onCycleShift={handleCycleShift} />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Styles ---------------------------- */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

      .vy-root {
        --bg: #ffffff;
        --surface: #f6f7fb;
        --surface-alt: #edeff5;
        --border: #dde1ea;
        --text: #23234f;
        --text-dim: #6b6f8a;
        --c-amber: #f0a202;
        --c-tarde: #b2ffff;
        --c-noche: #7f00ff;
        --c-franco: #9aa0b4;
        --c-green: #3fa35a;
        --c-red: #d6553f;
        --c-manana: var(--c-amber);
        font-family: 'Inter', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        width: 100%;
      }
      .vy-root * { box-sizing: border-box; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }
      .vy-loading { display: flex; align-items: center; justify-content: center; height: 100vh; color: var(--c-amber); }
      .vy-spin { animation: vy-pulse 1.1s ease-in-out infinite; }
      @keyframes vy-pulse { 0%, 100% { opacity: 0.45; transform: scale(0.96); } 50% { opacity: 1; transform: scale(1.03); } }
      .vy-logo-mark { display: inline-block; object-fit: contain; }

      /* Login */
      .vy-login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;
        background: radial-gradient(circle at 20% 10%, rgba(240,162,2,0.06), transparent 45%), var(--bg); }
      .vy-login-card { width: 100%; max-width: 380px; background: var(--surface); border: 1px solid var(--border);
        border-radius: 14px; padding: 28px 26px; }
      .vy-brand { display: flex; align-items: center; gap: 10px; color: var(--c-amber); margin-bottom: 22px; }
      .vy-brand-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 19px; letter-spacing: 0.04em; color: var(--text); }
      .vy-brand-sub { font-size: 11.5px; color: var(--text-dim); margin-top: 1px; }
      .vy-form { display: flex; flex-direction: column; gap: 14px; }
      .vy-label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-dim); }
      .vy-input { background: var(--surface); border: 1px solid var(--border); color: var(--text); border-radius: 8px;
        padding: 10px 12px; font-size: 14px; font-family: inherit; outline: none; transition: border-color .15s; }
      .vy-input:focus-visible { border-color: var(--c-amber); }
      .vy-select { cursor: pointer; }
      .vy-error { font-size: 12.5px; color: var(--c-red); }
      .vy-btn { border: none; border-radius: 8px; padding: 10px 16px; font-size: 14px; font-weight: 600;
        cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-family: inherit; transition: filter .15s, transform .1s; }
      .vy-btn:active { transform: translateY(1px); }
      .vy-btn-primary { background: var(--c-amber); color: #1a1200; }
      .vy-btn-primary:hover { filter: brightness(1.08); }
      .vy-btn-approve { background: rgba(63,163,90,0.16); color: var(--c-green); border: 1px solid rgba(63,163,90,0.35); }
      .vy-btn-reject { background: rgba(214,85,63,0.14); color: var(--c-red); border: 1px solid rgba(214,85,63,0.35); }
      .vy-btn-ghost { background: transparent; color: var(--text-dim); border: 1px solid var(--border); border-radius: 8px; padding: 7px 12px; font-size: 12.5px; cursor: pointer; font-family: inherit; }
      .vy-btn-ghost:hover { color: var(--text); border-color: var(--c-amber); }

      .vy-demo { margin-top: 22px; padding-top: 18px; border-top: 1px dashed var(--border); }
      .vy-demo-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 10px; }
      .vy-demo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .vy-demo-chip { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 10px;
        text-align: left; cursor: pointer; color: var(--text); font-family: inherit; }
      .vy-demo-chip:hover { border-color: var(--c-amber); }
      .vy-demo-chip span { display: block; font-size: 13px; font-weight: 600; }
      .vy-demo-chip em { font-style: normal; font-size: 10.5px; color: var(--text-dim); }

      /* Shell */
      .vy-shell { display: flex; min-height: 100vh; }
      .vy-sidebar { width: 232px; background: var(--surface); border-right: 1px solid var(--border);
        display: flex; flex-direction: column; padding: 20px 14px; flex-shrink: 0; }
      .vy-brand-side { padding: 0 6px; margin-bottom: 24px; }
      .vy-nav { display: flex; flex-direction: column; gap: 3px; flex: 1; }
      .vy-nav-item { display: flex; align-items: center; gap: 10px; background: transparent; border: none;
        color: var(--text-dim); padding: 9px 10px; border-radius: 8px; font-size: 13.5px; cursor: pointer;
        text-align: left; font-family: inherit; position: relative; }
      .vy-nav-item:hover { background: var(--surface-alt); color: var(--text); }
      .vy-nav-item-active { background: rgba(240,162,2,0.12); color: var(--c-amber); }
      .vy-nav-badge { margin-left: auto; background: var(--c-red); color: #fff; font-size: 10px; font-weight: 700;
        border-radius: 999px; padding: 1px 6px; }
      .vy-logout { margin-top: 8px; border-top: 1px solid var(--border); padding-top: 14px; }

      .vy-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
      .vy-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 26px;
        border-bottom: 1px solid var(--border); }
      .vy-topbar-user { display: flex; align-items: center; gap: 10px; }
      .vy-avatar { width: 34px; height: 34px; border-radius: 999px; background: var(--surface-alt); border: 1px solid var(--border);
        display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--c-amber); font-family: 'Space Grotesk', sans-serif; }
      .vy-topbar-name { font-size: 13.5px; font-weight: 600; }
      .vy-only-mobile { display: none; }

      .vy-content { padding: 26px; overflow-y: auto; flex: 1; }
      .vy-view-head { margin-bottom: 20px; }
      .vy-view-head h1 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; margin: 0 0 4px; }
      .vy-view-head p { margin: 0; color: var(--text-dim); font-size: 13px; }

      .vy-badge { display: inline-flex; align-items: center; font-size: 10.5px; padding: 3px 8px; border-radius: 999px;
        border: 1px solid var(--border); color: var(--text-dim); background: var(--surface-alt); white-space: nowrap; }

      .vy-pill { --pill-color: var(--text-dim); display: inline-flex; align-items: center; justify-content: center;
        font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; letter-spacing: 0.03em;
        color: var(--text); background: color-mix(in srgb, var(--pill-color) 22%, var(--surface));
        border: 1px solid var(--pill-color); border-radius: 5px; padding: 2px 7px; min-width: 38px; }
      .vy-pill-franco { border-style: dashed; opacity: 0.75; }
      .vy-pill-empty { color: var(--text-dim); border: 1px dashed var(--border); border-radius: 5px; padding: 2px 7px; }

      .vy-dot { width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0; }

      .vy-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px;
        padding: 46px 20px; color: var(--text-dim); border: 1px dashed var(--border); border-radius: 12px; }
      .vy-empty-title { color: var(--text); font-size: 14px; font-weight: 600; }
      .vy-empty-hint { font-size: 12.5px; max-width: 280px; }

      /* Dashboard */
      .vy-mytoday { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border);
        border-radius: 12px; padding: 14px 16px; margin-bottom: 18px; }
      .vy-mytoday-label { font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; }
      .vy-mytoday-value { font-size: 15px; font-weight: 600; margin-top: 2px; }
      .vy-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 22px; }
      .vy-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; }
      .vy-stat span { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: var(--c-amber); }
      .vy-stat-alert span { color: var(--c-red); }
      .vy-stat label { font-size: 11.5px; color: var(--text-dim); }

      .vy-board { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
      .vy-board-head { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--border);
        color: var(--text-dim); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.06em; }
      .vy-board-rows { display: flex; flex-direction: column; }
      .vy-board-row { display: grid; grid-template-columns: 8px 1fr auto auto auto; align-items: center; gap: 12px;
        padding: 11px 16px; border-bottom: 1px solid var(--border); }
      .vy-board-row:last-child { border-bottom: none; }
      .vy-board-name { font-size: 13.5px; font-weight: 500; }
      .vy-board-time { font-size: 12px; color: var(--text-dim); }

      /* Schedule */
      .vy-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
      .vy-toolbar-hint { font-size: 12.5px; color: var(--text-dim); }
      .vy-weeknav { display: flex; align-items: center; gap: 8px; }
      .vy-icon-btn { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 8px;
        width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
      .vy-icon-btn:hover { color: var(--text); border-color: var(--c-amber); }
      .vy-icon-btn-danger:hover { color: var(--c-red); border-color: var(--c-red); }

      .vy-week-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }
      .vy-day-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px; text-align: center; }
      .vy-day-today { border-color: var(--c-amber); }
      .vy-day-head { display: flex; justify-content: center; align-items: baseline; gap: 5px; margin-bottom: 10px; }
      .vy-day-dow { font-size: 10.5px; text-transform: uppercase; color: var(--text-dim); }
      .vy-day-num { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; }
      .vy-day-time { font-size: 10.5px; color: var(--text-dim); margin-top: 8px; }

      /* Francos */
      .vy-franco-list { display: flex; flex-direction: column; gap: 8px; }
      .vy-franco-item { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border);
        border-radius: 10px; padding: 12px 14px; font-size: 13.5px; color: var(--c-amber); }

      /* Swaps */
      .vy-swap-form { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px; margin-bottom: 22px; }
      .vy-swap-list { display: flex; flex-direction: column; gap: 10px; }
      .vy-swap-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; }
      .vy-swap-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
      .vy-status { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; padding: 3px 9px; border-radius: 999px; font-weight: 600; }
      .vy-status-pending { background: rgba(240,162,2,0.14); color: var(--c-amber); }
      .vy-status-accepted { background: rgba(178,255,255,0.14); color: var(--c-tarde); }
      .vy-status-approved { background: rgba(63,163,90,0.14); color: var(--c-green); }
      .vy-status-declined, .vy-status-rejected { background: rgba(214,85,63,0.14); color: var(--c-red); }
      .vy-swap-date { font-size: 11.5px; color: var(--text-dim); }
      .vy-swap-body { font-size: 13.5px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .vy-swap-note { font-size: 12.5px; color: var(--text-dim); margin-top: 6px; font-style: italic; }
      .vy-swap-actions { display: flex; gap: 8px; margin-top: 12px; }
      .vy-swap-actions .vy-btn { font-size: 12.5px; padding: 7px 12px; }

      /* Notifications */
      .vy-notif-list { display: flex; flex-direction: column; gap: 8px; }
      .vy-notif-item { display: flex; align-items: flex-start; gap: 10px; background: var(--surface); border: 1px solid var(--border);
        border-radius: 10px; padding: 12px 14px; cursor: pointer; }
      .vy-notif-unread { border-color: rgba(240,162,2,0.4); }
      .vy-notif-item .vy-dot { margin-top: 5px; }
      .vy-notif-msg { font-size: 13.5px; }
      .vy-notif-time { font-size: 11px; color: var(--text-dim); margin-top: 3px; }

      /* Personnel */
      .vy-personnel-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;
        background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px; margin-bottom: 22px; align-items: end; }
      .vy-person-list { display: flex; flex-direction: column; gap: 8px; }
      .vy-person-row { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border);
        border-radius: 10px; padding: 11px 14px; }
      .vy-person-name { font-size: 13.5px; font-weight: 500; }
      .vy-person-user { font-size: 11px; color: var(--text-dim); }
      .vy-person-row .vy-badge { margin-left: auto; }

      /* Editor */
      .vy-editor-table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 12px; }
      .vy-editor-table { width: 100%; border-collapse: collapse; background: var(--surface); }
      .vy-editor-table th { text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em;
        color: var(--text-dim); padding: 10px 12px; border-bottom: 1px solid var(--border); white-space: nowrap; }
      .vy-editor-table td { padding: 8px 10px; border-bottom: 1px solid var(--border); }
      .vy-editor-name { font-size: 12.5px; font-weight: 500; white-space: nowrap; }
      .vy-editor-cell { background: transparent; border: none; cursor: pointer; padding: 2px; }

      /* Alarma / Turno urgente */
      .vy-nav-badge-alarm { background: var(--c-red); animation: vy-alarm-blink 1.4s ease-in-out infinite; }
      @keyframes vy-alarm-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

      .vy-alarm-banner { display: flex; align-items: center; gap: 12px; background: rgba(214,85,63,0.12);
        border: 1px solid var(--c-red); border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;
        animation: vy-alarm-pulse 1.6s ease-in-out infinite; }
      @keyframes vy-alarm-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(214,85,63,0.35); } 50% { box-shadow: 0 0 0 6px rgba(214,85,63,0); } }
      .vy-alarm-icon { color: var(--c-red); flex-shrink: 0; }
      .vy-alarm-body { flex: 1; }
      .vy-alarm-title { font-weight: 700; font-size: 13.5px; color: var(--c-red); }
      .vy-alarm-sub { font-size: 12.5px; color: var(--text-dim); margin-top: 2px; }
      .vy-btn-alarm { background: var(--c-red); color: #fff; }
      .vy-btn-alarm:hover { filter: brightness(1.1); }
      .vy-btn-alarm-cta { background: var(--c-red); color: #fff; padding: 12px 20px; font-size: 14.5px; margin-bottom: 18px;
        animation: vy-alarm-pulse 1.8s ease-in-out infinite; }

      .vy-warn-banner { display: flex; align-items: center; gap: 10px; background: rgba(240,162,2,0.1);
        border: 1px solid var(--c-amber); color: var(--c-amber); border-radius: 10px; padding: 11px 14px;
        margin-bottom: 18px; font-size: 13px; cursor: pointer; }
      .vy-warn-banner:hover { background: rgba(240,162,2,0.16); }
      .vy-warn-banner span { flex: 1; }

      .vy-stat-alarm span { color: var(--c-red); }

      .vy-urgent-form { border-color: var(--c-red); }
      .vy-urgent-form-actions { display: flex; gap: 10px; align-items: center; }
      .vy-urgent-hint { font-size: 11.5px; color: var(--text-dim); margin: 4px 0 0; }

      .vy-urgent-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; }
      .vy-urgent-card-live { border-color: rgba(214,85,63,0.5); }
      .vy-bono { color: var(--c-amber); }
      .vy-cancel-link { margin-top: 10px; font-size: 11.5px; padding: 5px 10px; }

      .vy-status-urgent-buscando { background: rgba(214,85,63,0.14); color: var(--c-red); }
      .vy-status-urgent-pendiente_autorizacion { background: rgba(240,162,2,0.14); color: var(--c-amber); }
      .vy-status-urgent-autorizado { background: rgba(63,163,90,0.14); color: var(--c-green); }
      .vy-status-urgent-cancelado { background: rgba(139,148,160,0.14); color: var(--text-dim); }

      /* Capacitaciones */
      .vy-course-list { display: flex; flex-direction: column; gap: 10px; }
      .vy-course-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; }
      .vy-course-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
      .vy-course-name { font-size: 13.5px; font-weight: 600; }
      .vy-course-meta { font-size: 11px; color: var(--text-dim); margin-top: 3px; }
      .vy-course-people { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
      .vy-course-chip { font-size: 10.5px; padding: 3px 8px; border-radius: 999px; border: 1px solid var(--border); color: var(--text-dim); }
      .vy-course-chip-done { border-color: var(--c-green); color: var(--c-green); }
      .vy-course-chip-overdue { border-color: var(--c-red); color: var(--c-red); }

      .vy-notif-urgent { border-color: rgba(214,85,63,0.45); }
      .vy-notif-course { border-color: rgba(240,162,2,0.4); }
      .vy-notif-kind-icon { flex-shrink: 0; margin-top: 2px; }
      .vy-notif-item .vy-notif-urgent .vy-notif-kind-icon, .vy-notif-urgent .vy-notif-kind-icon { color: var(--c-red); }
      .vy-notif-course .vy-notif-kind-icon { color: var(--c-amber); }
      .vy-notif-action { margin-top: 8px; font-size: 12px; padding: 6px 11px; }

      /* Scrollbars */
      .vy-content::-webkit-scrollbar, .vy-editor-table-wrap::-webkit-scrollbar { height: 8px; width: 8px; }
      .vy-content::-webkit-scrollbar-thumb, .vy-editor-table-wrap::-webkit-scrollbar-thumb { background: var(--border); border-radius: 8px; }

      @media (max-width: 760px) {
        .vy-sidebar { position: fixed; z-index: 20; height: 100vh; transform: translateX(-100%); transition: transform .2s; }
        .vy-sidebar-open { transform: translateX(0); }
        .vy-only-mobile { display: inline-flex; }
        .vy-content { padding: 18px; }
      }
    `}</style>
  );
}
[FULL FILE CONTENT WITH REPLACEMENT]LE CONTENT WITH REPLACEMENT]
