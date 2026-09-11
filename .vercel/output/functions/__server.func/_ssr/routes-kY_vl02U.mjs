import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ChevronLeft, i as ChevronRight, n as Plus, o as CalendarDays, r as House, t as Settings } from "../_libs/lucide-react.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kY_vl02U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** All user-visible copy. Keep Greek here so the UI stays consistent. */
var t = {
	appName: "Peachy",
	shortName: "Peachy",
	today: "Σήμερα",
	calendar: "Ημερολόγιο",
	settings: "Ρυθμίσεις",
	newBite: "Νέα μπουκιά",
	editBite: "Μπουκιά",
	defaultName: "Δήμητρα",
	greetingMorning: "Καλημέρα",
	greetingAfternoon: "Καλό απόγευμα",
	greetingEvening: "Καλό βράδυ",
	firstOpenCaption: "Καλημέρα Δήμητρα",
	meals: {
		breakfast: "Πρωινό",
		lunch: "Μεσημεριανό",
		dinner: "Βραδινό",
		snack: "Σνακ"
	},
	emptyMeal: "ακόμα τίποτα εδώ… πρώτο μπουκάκι;",
	saved: "σημειώθηκε ✨",
	deleted: "οκ, το έβγαλα",
	copied: "αντιγράφηκε",
	resetDone: "καθαρό τετράδιο",
	whatAte: "Τι έφαγες;",
	whatAtePlaceholder: "π.χ. ελληνικός, σαλάτα…",
	note: "σημείωση",
	notePlaceholder: "μια μικρή σημείωση…",
	kcalOptional: "Θερμίδες (προαιρετικά)",
	kcalHelper: "kcal",
	time: "ώρα",
	save: "Αποθήκευση",
	delete: "Διαγραφή",
	cancel: "Άκυρο",
	confirmDelete: "Να το σβήσω;",
	confirmDeleteYes: "Ναι, σβήσ’ το",
	displayName: "Όνομα",
	addToHome: "Προσθήκη στην αρχική οθόνη",
	copyToday: "Αντιγραφή σημερινής ημέρας",
	resetData: "Επαναφορά όλων",
	resetHint: "Θα σβηστούν όλες οι μπουκιές σ’ αυτή τη συσκευή.",
	resetConfirm1: "Να τα σβήσω όλα;",
	resetConfirm2: "Σίγουρα; Δεν γυρίζει πίσω.",
	resetFinal: "Ναι, όλα",
	dedication: "φτιάχτηκε για τη Δήμητρα",
	installTitle: "Βάλ’ το στην αρχική σου",
	installBody: "Άνοιξέ το από το Safari → κουμπί Κοινοποίηση → Προσθήκη στην οθόνη Αφετηρίας. Μετά ανοίγει σαν κανονικό app, χωρίς τη μπάρα του Safari.",
	installDone: "Το έκανα",
	installStep1Title: "Κοινοποίηση",
	installStep1: "Το κουμπί κοινοποίησης στο Safari",
	installStep2Title: "Προσθήκη",
	installStep2: "Προσθήκη στην οθόνη Αφετηρίας",
	installStep3Title: "Άνοιγμα",
	installStep3: "Άνοιξέ το από το εικονίδιο Peachy",
	close: "Κλείσιμο",
	prevMonth: "Προηγούμενος μήνας",
	nextMonth: "Επόμενος μήνας",
	prevDay: "Προηγούμενη μέρα",
	nextDay: "Επόμενη μέρα",
	addBite: "Νέα μπουκιά",
	weekdaysShort: [
		"Δε",
		"Τρ",
		"Τε",
		"Πε",
		"Πα",
		"Σα",
		"Κυ"
	],
	kcalTodayPrefix: "σήμερα σημείωσες",
	kcalDayPrefix: "σημείωσες",
	giftLine1: "Δεν χρειάζεται κάθε μέρα να είναι τέλεια.",
	giftLine2: "Απλώς να είναι δική σου."
};
var QUICK_ADDS = [
	{
		label: "καφές",
		emoji: "☕"
	},
	{
		label: "ελληνικός",
		emoji: "☕"
	},
	{
		label: "γιαούρτι",
		emoji: "🥛"
	},
	{
		label: "σαλάτα",
		emoji: "🥗"
	},
	{
		label: "τοστ",
		emoji: "🥪"
	},
	{
		label: "αυγά",
		emoji: "🍳"
	},
	{
		label: "φρούτο",
		emoji: "🍎"
	},
	{
		label: "smoothie",
		emoji: "🥤"
	},
	{
		label: "κοτόπουλο",
		emoji: "🍗"
	},
	{
		label: "ζυμαρικά",
		emoji: "🍝"
	},
	{
		label: "ρύζι",
		emoji: "🍚"
	},
	{
		label: "σουβλάκι",
		emoji: "🥙"
	},
	{
		label: "σοκολάτα",
		emoji: "🍫"
	}
];
function greetWord(hour) {
	if (hour < 12) return t.greetingMorning;
	if (hour < 18) return t.greetingAfternoon;
	return t.greetingEvening;
}
function greetLine(name, hour) {
	return `${greetWord(hour)} ${name}`;
}
var MEAL_ORDER = [
	"breakfast",
	"lunch",
	"dinner",
	"snack"
];
var UNKNOWN = "🍽️";
var RULES = [...[
	["chocolate", "🍫"],
	["σοκολατα", "🍫"],
	["κοτοπουλο", "🍗"],
	["chicken", "🍗"],
	["ζυμαρικα", "🍝"],
	["smoothie", "🥤"],
	["πορτοκαλι", "🍊"],
	["γιαουρτι", "🥛"],
	["yogurt", "🥛"],
	["ελληνικος", "☕"],
	["ροδακινο", "🍑"],
	["σουβλακι", "🥙"],
	["μπανανα", "🍌"],
	["cracker", "🍘"],
	["κρακερ", "🍘"],
	["φραουλα", "🥤"],
	["banana", "🍌"],
	["orange", "🍊"],
	["cheese", "🧀"],
	["ελληνικ", "☕"],
	["σαλατα", "🥗"],
	["φρουτο", "🍎"],
	["coffee", "☕"],
	["peach", "🍑"],
	["pasta", "🍝"],
	["salad", "🥗"],
	["toast", "🥪"],
	["fruit", "🍎"],
	["water", "💧"],
	["apple", "🍎"],
	["bread", "🍞"],
	["eggs", "🍳"],
	["milk", "🥛"],
	["rice", "🍚"],
	["καφες", "☕"],
	["αυγα", "🍳"],
	["αυγο", "🍳"],
	["τυρι", "🧀"],
	["ψωμι", "🍞"],
	["γαλα", "🥛"],
	["καφε", "☕"],
	["μηλο", "🍎"],
	["νερο", "💧"],
	["τοστ", "🥪"],
	["ρυζι", "🍚"],
	["egg", "🍳"]
]].sort((a, b) => b[0].length - a[0].length);
function normalizeFood(name) {
	return name.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/ς/g, "σ");
}
function emojiForName(name) {
	const value = normalizeFood(name);
	if (!value) return UNKNOWN;
	let bestIndex = Infinity;
	let bestLen = -1;
	let bestEmoji = UNKNOWN;
	for (const [key, emoji] of RULES) {
		const index = value.indexOf(key);
		if (index < 0) continue;
		if (index < bestIndex || index === bestIndex && key.length > bestLen) {
			bestIndex = index;
			bestLen = key.length;
			bestEmoji = emoji;
		}
	}
	return bestEmoji;
}
function applyFoodEmojis(days) {
	let changed = false;
	const next = {};
	for (const [date, bites] of Object.entries(days)) next[date] = bites.map((bite) => {
		const emoji = emojiForName(bite.name);
		if (emoji === bite.emoji) return bite;
		changed = true;
		return {
			...bite,
			emoji
		};
	});
	return changed ? next : days;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function emptyDraft(meal, time) {
	return {
		meal,
		name: "",
		note: "",
		kcal: "",
		time,
		emoji: "🍽️"
	};
}
function AddSheet({ open, onOpenChange, container, editing, initialMeal, initialTime, onSave, onDelete }) {
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft(initialMeal ?? "snack", initialTime));
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setConfirmDelete(false);
		if (editing) setDraft({
			meal: editing.meal,
			name: editing.name,
			note: editing.note,
			kcal: editing.kcal != null ? String(editing.kcal) : "",
			time: editing.time,
			emoji: emojiForName(editing.name)
		});
		else setDraft(emptyDraft(initialMeal ?? "snack", initialTime));
	}, [open]);
	const canSave = draft.name.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		container: container ?? void 0,
		shouldScaleBackground: false,
		noBodyStyles: true,
		repositionInputs: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "sheet-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "sheet-content",
			"aria-describedby": void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Handle, { className: "sheet-handle" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
					className: "sr-only",
					children: t.appName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 pb-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "text-xl font-semibold tracking-tight",
						children: editing ? t.editBite : t.newBite
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Close, {
						className: "ghost-btn pressable",
						children: t.close
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "meal-chips px-5 pb-3",
					children: MEAL_ORDER.map((meal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("chip", draft.meal === meal && "chip-on"),
						onClick: () => setDraft((d) => ({
							...d,
							meal
						})),
						children: t.meals[meal]
					}, meal))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium text-muted",
						children: t.whatAte
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1.5",
						value: draft.name,
						onChange: (e) => {
							const name = e.target.value;
							setDraft((d) => ({
								...d,
								name,
								emoji: emojiForName(name)
							}));
						},
						placeholder: t.whatAtePlaceholder,
						autoCapitalize: "sentences",
						enterKeyHint: "done"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "quick-adds",
							children: QUICK_ADDS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => setDraft((d) => ({
									...d,
									name: chip.label,
									emoji: emojiForName(chip.label)
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-1",
									children: chip.emoji
								}), chip.label]
							}, chip.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-5 block text-sm font-medium text-muted",
							children: t.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1.5",
							value: draft.note,
							onChange: (e) => setDraft((d) => ({
								...d,
								note: e.target.value
							})),
							placeholder: t.notePlaceholder
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-muted",
								children: t.kcalOptional
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field pr-14",
									inputMode: "numeric",
									pattern: "[0-9]*",
									value: draft.kcal,
									onChange: (e) => setDraft((d) => ({
										...d,
										kcal: e.target.value.replace(/[^\d]/g, "")
									})),
									placeholder: "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted",
									children: t.kcalHelper
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-muted",
								children: t.time
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field mt-1.5",
								type: "time",
								value: draft.time,
								onChange: (e) => setDraft((d) => ({
									...d,
									time: e.target.value
								}))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "primary-btn mt-6",
							disabled: !canSave,
							onClick: (event) => {
								event.preventDefault();
								event.stopPropagation();
								onSave(draft);
							},
							children: t.save
						}),
						editing && onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "confirm-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: t.confirmDelete
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ghost-btn",
										onClick: () => setConfirmDelete(false),
										children: t.cancel
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ghost-btn danger-text",
										onClick: (event) => {
											event.preventDefault();
											event.stopPropagation();
											onDelete();
										},
										children: t.confirmDeleteYes
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ghost-btn danger-text mx-auto flex",
								onClick: () => setConfirmDelete(true),
								children: t.delete
							})
						}) : null
					]
				})
			]
		})] })
	});
}
var WEEKDAYS = [
	"Κυριακή",
	"Δευτέρα",
	"Τρίτη",
	"Τετάρτη",
	"Πέμπτη",
	"Παρασκευή",
	"Σάββατο"
];
var MONTHS_GENITIVE = [
	"Ιανουαρίου",
	"Φεβρουαρίου",
	"Μαρτίου",
	"Απριλίου",
	"Μαΐου",
	"Ιουνίου",
	"Ιουλίου",
	"Αυγούστου",
	"Σεπτεμβρίου",
	"Οκτωβρίου",
	"Νοεμβρίου",
	"Δεκεμβρίου"
];
var MONTHS_NOMINATIVE = [
	"Ιανουάριος",
	"Φεβρουάριος",
	"Μάρτιος",
	"Απρίλιος",
	"Μάιος",
	"Ιούνιος",
	"Ιούλιος",
	"Αύγουστος",
	"Σεπτέμβριος",
	"Οκτώβριος",
	"Νοέμβριος",
	"Δεκέμβριος"
];
function pad2(n) {
	return n < 10 ? `0${n}` : String(n);
}
function toYmd(date) {
	return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}
function parseYmd(ymd) {
	const [y, m, d] = ymd.split("-").map(Number);
	return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}
function addDays(ymd, delta) {
	const date = parseYmd(ymd);
	date.setDate(date.getDate() + delta);
	return toYmd(date);
}
function formatGreekDate(date) {
	const d = typeof date === "string" ? parseYmd(date) : date;
	return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS_GENITIVE[d.getMonth()]}`;
}
function formatMonthTitle(date) {
	return `${MONTHS_NOMINATIVE[date.getMonth()]} ${date.getFullYear()}`;
}
function formatNowTime(date = /* @__PURE__ */ new Date()) {
	return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}
function defaultMeal(hour) {
	if (hour < 11) return "breakfast";
	if (hour < 16) return "lunch";
	if (hour < 18) return "snack";
	return "dinner";
}
/** Monday-first weekday index 0..6 */
function mondayIndex(date) {
	return (date.getDay() + 6) % 7;
}
function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date, delta) {
	return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}
function CountUp({ value }) {
	const [shown, setShown] = (0, import_react.useState)(value);
	const prev = (0, import_react.useRef)(value);
	(0, import_react.useEffect)(() => {
		const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const from = prev.current;
		prev.current = value;
		if (reduce || from === value) {
			setShown(value);
			return;
		}
		const start = performance.now();
		const duration = 480;
		let raf = 0;
		const tick = (now) => {
			const p = Math.min(1, (now - start) / duration);
			const eased = 1 - (1 - p) ** 3;
			setShown(Math.round(from + (value - from) * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: shown.toLocaleString("el-GR") });
}
var STORAGE_KEY = "peachy.v1";
function makeId() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function defaultSettings() {
	return {
		displayName: t.defaultName,
		installDismissed: false,
		lastGreetingDate: ""
	};
}
function seedBites(today) {
	const yesterday = addDays(today, -1);
	const twoAgo = addDays(today, -2);
	return {
		[today]: [
			{
				id: "seed-today-coffee",
				meal: "breakfast",
				name: "Ελληνικός",
				emoji: "☕",
				note: "σκέτος, όπως πάντα",
				kcal: null,
				time: "08:12"
			},
			{
				id: "seed-today-chicken",
				meal: "lunch",
				name: "Κοτόπουλο με σαλάτα",
				emoji: "🍗",
				note: "με λεμόνι",
				kcal: 520,
				time: "13:40"
			},
			{
				id: "seed-today-yogurt",
				meal: "snack",
				name: "Γιαούρτι με μέλι",
				emoji: "🥛",
				note: "",
				kcal: 180,
				time: "16:20"
			}
		],
		[yesterday]: [
			{
				id: "seed-yday-smoothie",
				meal: "breakfast",
				name: "Smoothie φράουλα",
				emoji: "🥤",
				note: "",
				kcal: 220,
				time: "09:00"
			},
			{
				id: "seed-yday-pasta",
				meal: "lunch",
				name: "Ζυμαρικά",
				emoji: "🍝",
				note: "σπιτικά",
				kcal: null,
				time: "14:10"
			},
			{
				id: "seed-yday-choco",
				meal: "snack",
				name: "Σοκολάτα",
				emoji: "🍫",
				note: "",
				kcal: 90,
				time: "17:45"
			}
		],
		[twoAgo]: [{
			id: "seed-2ago-toast",
			meal: "breakfast",
			name: "Τοστ με αυγό",
			emoji: "🥪",
			note: "",
			kcal: 340,
			time: "08:40"
		}, {
			id: "seed-2ago-souvlaki",
			meal: "dinner",
			name: "Σουβλάκι",
			emoji: "🥙",
			note: "με πίτα",
			kcal: null,
			time: "21:05"
		}]
	};
}
function persistable(state) {
	return {
		version: 1,
		initialized: state.initialized,
		settings: state.settings,
		days: state.days
	};
}
function write(state) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable(state)));
	} catch {}
}
function read() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed?.version !== 1 || !parsed.settings || !parsed.days) return null;
		return {
			version: 1,
			initialized: Boolean(parsed.initialized),
			settings: {
				...defaultSettings(),
				...parsed.settings,
				displayName: parsed.settings.displayName?.trim() || t.defaultName
			},
			days: parsed.days
		};
	} catch {
		return null;
	}
}
function kcalTotal(bites) {
	let sum = 0;
	let any = false;
	for (const bite of bites) if (bite.kcal != null) {
		sum += bite.kcal;
		any = true;
	}
	return any ? sum : null;
}
var useDiary = create((set, get) => ({
	version: 1,
	hydrated: false,
	initialized: true,
	settings: defaultSettings(),
	days: seedBites(toYmd(/* @__PURE__ */ new Date())),
	hydrate: () => {
		if (typeof window === "undefined") return;
		if (get().hydrated) {
			const days = applyFoodEmojis(get().days);
			if (days !== get().days) {
				set({ days });
				write(get());
			}
			return;
		}
		const existing = read();
		if (existing?.initialized) {
			const days = applyFoodEmojis(existing.days);
			set({
				...existing,
				days,
				hydrated: true
			});
			if (days !== existing.days) write(get());
			return;
		}
		set({
			hydrated: true,
			days: applyFoodEmojis(get().days)
		});
		write(get());
	},
	remapEmojis: () => {
		const days = applyFoodEmojis(get().days);
		if (days === get().days) return;
		set({ days });
		write(get());
	},
	addBite: (date, bite) => {
		const next = {
			...bite,
			id: makeId()
		};
		set((state) => ({ days: {
			...state.days,
			[date]: [...state.days[date] ?? [], next]
		} }));
		write(get());
		return next;
	},
	updateBite: (date, id, patch) => {
		set((state) => ({ days: {
			...state.days,
			[date]: (state.days[date] ?? []).map((b) => b.id === id ? {
				...b,
				...patch
			} : b)
		} }));
		write(get());
	},
	deleteBite: (date, id) => {
		set((state) => ({ days: {
			...state.days,
			[date]: (state.days[date] ?? []).filter((b) => b.id !== id)
		} }));
		write(get());
	},
	resetAll: () => {
		set({
			initialized: true,
			days: {}
		});
		write(get());
	},
	setDisplayName: (name) => {
		const displayName = name.trim() || t.defaultName;
		set((state) => ({ settings: {
			...state.settings,
			displayName
		} }));
		write(get());
	},
	dismissInstall: () => {
		set((state) => ({ settings: {
			...state.settings,
			installDismissed: true
		} }));
		write(get());
	},
	markGreeting: (date) => {
		set((state) => ({ settings: {
			...state.settings,
			lastGreetingDate: date
		} }));
		write(get());
	}
}));
function sortBites(bites, meal) {
	return bites.filter((b) => b.meal === meal).slice().sort((a, b) => a.time.localeCompare(b.time) || a.name.localeCompare(b.name, "el"));
}
function DayMeals({ bites, onOpenBite, justAddedId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-3 px-5",
		children: MEAL_ORDER.map((meal) => {
			const items = sortBites(bites, meal);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "meal-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold tracking-tight",
						children: t.meals[meal]
					})
				}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-2 text-sm leading-normal text-muted",
					children: t.emptyMeal
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: items.map((bite, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline my-1" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: (event) => {
							event.preventDefault();
							event.stopPropagation();
							onOpenBite(bite);
						},
						className: cn("pressable relative z-[1] flex w-full min-h-11 items-start gap-3 rounded-md py-2 text-left", justAddedId === bite.id && "bite-enter"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 w-7 shrink-0 text-center text-xl leading-none",
								children: bite.emoji
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-medium tracking-tight",
									children: bite.name
								}), bite.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block truncate text-sm text-muted",
									children: bite.note
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm tabular-nums text-muted",
									children: bite.time
								}), bite.kcal != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block text-xs tabular-nums text-muted",
									children: [bite.kcal.toLocaleString("el-GR"), " kcal"]
								}) : null]
							})
						]
					})] }, bite.id))
				})]
			}, meal);
		})
	});
}
function monthCells(month) {
	const pad = mondayIndex(startOfMonth(month));
	const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
	const cells = [];
	for (let i = 0; i < pad; i++) cells.push(null);
	for (let d = 1; d <= last; d++) cells.push(toYmd(new Date(month.getFullYear(), month.getMonth(), d)));
	while (cells.length % 7 !== 0) cells.push(null);
	return cells;
}
function sameMonthDay(from, month) {
	const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
	const day = Math.min(from.getDate(), last);
	return toYmd(new Date(month.getFullYear(), month.getMonth(), day));
}
function CalendarView({ today, selected, onSelect, days, onOpenBite }) {
	const selectedDate = parseYmd(selected);
	const month = startOfMonth(selectedDate);
	const [fadeKey, setFadeKey] = (0, import_react.useState)(selected);
	const touch = (0, import_react.useRef)(null);
	const cells = (0, import_react.useMemo)(() => monthCells(month), [month.getFullYear(), month.getMonth()]);
	const bites = days[selected] ?? [];
	const total = kcalTotal(bites);
	function pickDay(ymd) {
		onSelect(ymd);
		setFadeKey(ymd);
	}
	function shiftDay(delta) {
		pickDay(addDays(selected, delta));
	}
	function shiftMonth(delta) {
		pickDay(sameMonthDay(selectedDate, addMonths(month, delta)));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 pb-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "icon-btn",
					"aria-label": t.prevMonth,
					onClick: () => shiftMonth(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						size: 22,
						strokeWidth: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold tracking-tight",
					children: formatMonthTitle(month)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "icon-btn",
					"aria-label": t.nextMonth,
					onClick: () => shiftMonth(1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 22,
						strokeWidth: 2
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-7 px-2",
			children: [t.weekdaysShort.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-8 place-items-center text-xs font-medium text-muted",
				children: d
			}, d)), cells.map((ymd, i) => {
				if (!ymd) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11" }, `e-${i}`);
				const has = (days[ymd]?.length ?? 0) > 0;
				const isToday = ymd === today;
				const isSelected = ymd === selected;
				const dateNum = parseYmd(ymd).getDate();
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("cal-day pressable", isToday && "is-today", isSelected && "is-selected"),
						onClick: () => pickDay(ymd),
						children: [dateNum, has ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cal-dot" }) : null]
					})
				}, ymd);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "day-fade mt-4",
			onTouchStart: (e) => {
				const p = e.changedTouches[0];
				if (p) touch.current = {
					x: p.clientX,
					y: p.clientY
				};
			},
			onTouchEnd: (e) => {
				const start = touch.current;
				touch.current = null;
				const p = e.changedTouches[0];
				if (!start || !p) return;
				const dx = p.clientX - start.x;
				const dy = p.clientY - start.y;
				if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
				shiftDay(dx < 0 ? 1 : -1);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": t.prevDay,
						onClick: () => shiftDay(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold tracking-tight",
							children: formatGreekDate(selected)
						}), total != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "kcal-soft mt-0.5",
							children: [
								t.kcalDayPrefix,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { value: total }),
								" kcal"
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": t.nextDay,
						onClick: () => shiftDay(1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 20 })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayMeals, {
				bites,
				onOpenBite
			})]
		}, fadeKey)
	] });
}
/** Ροδάκι — tiny smiling peach with one leaf. Name is not printed on screen. */
function PeachMascot({ mood = "idle", size = 56, className }) {
	const gid = `p-${(0, import_react.useId)().replace(/:/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: ["rodaki", className].filter(Boolean).join(" "),
		"data-mood": mood,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: "0 0 80 80",
			fill: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: `${gid}-body`,
				cx: "38%",
				cy: "32%",
				r: "70%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#FFD8C4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "55%",
						stopColor: "#F4A27F"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#E88962"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: `${gid}-cheek`,
				cx: "50%",
				cy: "50%",
				r: "50%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#F08B8B",
					stopOpacity: "0.55"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#F08B8B",
					stopOpacity: "0"
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "rodaki-bob",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "rodaki-pose",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "rodaki-leaf",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M44 10c10-1 18 7 16 16-8 2-16-6-16-16Z",
									fill: "#C9DDC8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M44 10c6 4 10 10 12 16",
									stroke: "#8FB58C",
									strokeWidth: "1.2",
									strokeLinecap: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M40 22c2-6 4-10 4-12",
									stroke: "#6F8F6C",
									strokeWidth: "2",
									strokeLinecap: "round"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "40",
							cy: "48",
							rx: "24",
							ry: "22.5",
							fill: `url(#${gid}-body)`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M40 27c-1.2 7-1.2 14 0 21",
							stroke: "#E88962",
							strokeOpacity: "0.45",
							strokeWidth: "1.6",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "30",
							cy: "40",
							rx: "7",
							ry: "4.5",
							fill: "#FFF7F1",
							opacity: "0.35"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "28",
							cy: "52",
							rx: "6",
							ry: "4",
							fill: `url(#${gid}-cheek)`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "52",
							cy: "52",
							rx: "6",
							ry: "4",
							fill: `url(#${gid}-cheek)`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "eye-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "31.5",
									cy: "46",
									rx: "3.1",
									ry: "3.6",
									fill: "#2B2420"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "30.4",
									cy: "44.8",
									rx: "1",
									ry: "1.2",
									fill: "#FFF7F1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									className: "rodaki-lid",
									x: "27.8",
									y: "42",
									width: "7.4",
									height: "8.4",
									rx: "3.2",
									fill: "#F4A27F"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "eye-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "48.5",
									cy: "46",
									rx: "3.1",
									ry: "3.6",
									fill: "#2B2420"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "47.4",
									cy: "44.8",
									rx: "1",
									ry: "1.2",
									fill: "#FFF7F1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									className: "rodaki-lid",
									x: "44.8",
									y: "42",
									width: "7.4",
									height: "8.4",
									rx: "3.2",
									fill: "#F4A27F"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M35 56c2.4 2.6 7.6 2.6 10 0",
							stroke: "#2B2420",
							strokeWidth: "1.8",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "rodaki-sparkle s1",
							transform: "translate(12 18)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M4 0l1.1 2.9L8 4 5.1 5.1 4 8 2.9 5.1 0 4l2.9-1.1Z",
								fill: "#FFF7F1"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "rodaki-sparkle s2",
							transform: "translate(62 28)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M3.2 0l.9 2.3L6.4 3.2 4.1 4.1 3.2 6.4 2.3 4.1 0 3.2l2.3-.9Z",
								fill: "#FFD4C2"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "rodaki-sparkle s3",
							transform: "translate(58 54)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M2.6 0l.7 1.8 1.9.8-1.9.8-.7 1.8-.7-1.8-1.9-.8 1.9-.8Z",
								fill: "#C9DDC8"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "rodaki-zzz",
							transform: "translate(56 14)",
							fill: "#7A716C",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M1 1h7L1 9h7",
								stroke: "#7A716C",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								fill: "none"
							})
						})
					]
				})
			})]
		})
	});
}
var GIFT_FLAG = "peachy_first_gift";
var BUBBLES = [
	{
		left: "8%",
		size: 18,
		delay: "40ms",
		duration: "1.35s"
	},
	{
		left: "22%",
		size: 28,
		delay: "120ms",
		duration: "1.5s"
	},
	{
		left: "38%",
		size: 14,
		delay: "0ms",
		duration: "1.2s"
	},
	{
		left: "52%",
		size: 34,
		delay: "180ms",
		duration: "1.45s"
	},
	{
		left: "66%",
		size: 16,
		delay: "80ms",
		duration: "1.3s"
	},
	{
		left: "78%",
		size: 24,
		delay: "220ms",
		duration: "1.4s"
	},
	{
		left: "90%",
		size: 12,
		delay: "60ms",
		duration: "1.25s"
	}
];
function reduced() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function GiftOverlay({ onDone }) {
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const [intro, setIntro] = (0, import_react.useState)(() => !reduced());
	const done = (0, import_react.useRef)(false);
	function dismiss() {
		if (done.current) return;
		done.current = true;
		try {
			window.localStorage.setItem(GIFT_FLAG, "1");
		} catch {}
		if (reduced()) {
			onDone();
			return;
		}
		setLeaving(true);
		window.setTimeout(onDone, 300);
	}
	(0, import_react.useEffect)(() => {
		const failSafe = window.setTimeout(dismiss, 4e3);
		const rest = intro ? window.setTimeout(() => setIntro(false), 1400) : 0;
		return () => {
			window.clearTimeout(failSafe);
			if (rest) window.clearTimeout(rest);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: [
			"gift-overlay",
			intro && "is-intro",
			leaving && "is-leaving"
		].filter(Boolean).join(" "),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `${t.giftLine1} ${t.giftLine2}`,
		onClick: dismiss,
		children: [reduced() ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "gift-bubbles",
			"aria-hidden": "true",
			children: BUBBLES.map((bubble, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "gift-bubble",
				style: {
					left: bubble.left,
					width: bubble.size,
					height: bubble.size,
					animationDelay: bubble.delay,
					animationDuration: bubble.duration
				}
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "gift-scene",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeachMascot, {
				mood: "idle",
				size: 132
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "gift-quote",
				children: [
					t.giftLine1,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					t.giftLine2
				]
			})]
		})]
	});
}
function shouldShowGift() {
	try {
		return window.localStorage.getItem(GIFT_FLAG) !== "1";
	} catch {
		return true;
	}
}
function ShareGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "9",
				width: "12",
				height: "13",
				rx: "2.2",
				stroke: "currentColor",
				strokeWidth: "1.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 3v11",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.2 6.6 12 3l3.8 3.6",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function PlusGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "4",
			y: "4",
			width: "16",
			height: "16",
			rx: "4",
			stroke: "currentColor",
			strokeWidth: "1.8"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 8v8M8 12h8",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round"
		})]
	});
}
function OpenGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "5",
			y: "3",
			width: "14",
			height: "18",
			rx: "3",
			stroke: "currentColor",
			strokeWidth: "1.8"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "16.5",
			r: "1.1",
			fill: "currentColor"
		})]
	});
}
var STEPS = [
	{
		n: "1",
		title: t.installStep1Title,
		body: t.installStep1,
		Icon: ShareGlyph
	},
	{
		n: "2",
		title: t.installStep2Title,
		body: t.installStep2,
		Icon: PlusGlyph
	},
	{
		n: "3",
		title: t.installStep3Title,
		body: t.installStep3,
		Icon: OpenGlyph
	}
];
function InstallSteps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-4 grid gap-2",
		children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-11 shrink-0 place-items-center rounded-full bg-blush text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.Icon, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block text-sm font-semibold tracking-tight",
					children: [
						step.n,
						". ",
						step.title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm text-muted",
					children: step.body
				})]
			})]
		}, step.n))
	});
}
function InstallCard({ onDismiss, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("meal-card mx-5 mb-4", className),
		"aria-label": t.installTitle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold tracking-tight",
				children: t.installTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-normal text-muted",
				children: t.installBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSteps, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "primary-btn mt-4 pressable",
				onClick: onDismiss,
				children: t.installDone
			})
		]
	});
}
function SettingsSheet({ open, onOpenChange, container, displayName, onDisplayName, onCopyToday, onReset, showInstallGuide }) {
	const [name, setName] = (0, import_react.useState)(displayName);
	const [resetStep, setResetStep] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName(displayName);
		setResetStep(0);
	}, [open, displayName]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		container: container ?? void 0,
		shouldScaleBackground: false,
		noBodyStyles: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "sheet-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "sheet-content",
			"aria-describedby": void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Handle, { className: "sheet-handle" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
					className: "sr-only",
					children: t.appName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 pb-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "text-xl font-semibold tracking-tight",
						children: t.settings
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Close, {
						className: "ghost-btn pressable",
						children: t.close
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 pb-[calc(env(safe-area-inset-bottom,0px)+24px)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium text-muted",
							children: t.displayName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1.5",
							value: name,
							onChange: (e) => setName(e.target.value),
							onBlur: () => onDisplayName(name),
							onKeyDown: (e) => {
								if (e.key === "Enter") e.target.blur();
							}
						}),
						showInstallGuide ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold tracking-tight",
								children: t.addToHome
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallSteps, {})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "primary-btn mt-6",
							onClick: onCopyToday,
							children: t.copyToday
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: resetStep === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ghost-btn danger-text mx-auto flex",
								onClick: () => setResetStep(1),
								children: t.resetData
							}) : resetStep === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "confirm-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: t.resetConfirm1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ghost-btn",
										onClick: () => setResetStep(0),
										children: t.cancel
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ghost-btn danger-text",
										onClick: () => setResetStep(2),
										children: t.resetConfirm2
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "confirm-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: t.resetHint
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ghost-btn",
										onClick: () => setResetStep(0),
										children: t.cancel
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ghost-btn danger-text",
										onClick: () => {
											onReset();
											setResetStep(0);
										},
										children: t.resetFinal
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-8 text-center text-xs tracking-wide text-muted"),
							children: t.dedication
						})
					]
				})
			]
		})] })
	});
}
function TodayView({ today, name, hour, bites, mood, onOpenBite, justAddedId }) {
	const total = kcalTotal(bites);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-4 pt-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "large-title",
				children: t.today
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				suppressHydrationWarning: true,
				children: formatGreekDate(today)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeachMascot, {
					mood,
					size: 64
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-semibold tracking-tight",
						suppressHydrationWarning: true,
						children: greetLine(name, hour)
					}), total != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kcal-soft mt-1",
						children: [
							t.kcalTodayPrefix,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { value: total }),
							" kcal"
						]
					}) : null]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayMeals, {
		bites,
		onOpenBite,
		justAddedId
	})] });
}
function copyDayText(ymd, bites) {
	const lines = [formatGreekDate(ymd), ""];
	let any = false;
	for (const meal of MEAL_ORDER) {
		const items = bites.filter((b) => b.meal === meal).slice().sort((a, b) => a.time.localeCompare(b.time));
		if (items.length === 0) continue;
		any = true;
		lines.push(t.meals[meal]);
		for (const bite of items) {
			const bits = [`${bite.emoji} ${bite.name}`];
			if (bite.note) bits.push(bite.note);
			bits.push(bite.time);
			if (bite.kcal != null) bits.push(`${bite.kcal.toLocaleString("el-GR")} kcal`);
			lines.push(`• ${bits.join(" · ")}`);
		}
		lines.push("");
	}
	if (!any) lines.push(t.emptyMeal);
	return lines.join("\n").trim() + "\n";
}
var listeners = /* @__PURE__ */ new Set();
function playMascot(mood) {
	listeners.forEach((fn) => fn(mood));
}
function subscribeMascot(fn) {
	listeners.add(fn);
	return () => {
		listeners.delete(fn);
	};
}
function isStandalone() {
	if (typeof window === "undefined") return false;
	const nav = window.navigator;
	return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}
function prefersReduced() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function registerServiceWorker() {
	if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
	const register = () => {
		navigator.serviceWorker.register("/sw.js").catch(() => {});
	};
	if (document.readyState === "complete") register();
	else window.addEventListener("load", register, { once: true });
}
function parseKcal(raw) {
	const n = Number.parseInt(raw, 10);
	return Number.isFinite(n) && n > 0 ? n : null;
}
function PeachyApp() {
	const hydrated = useDiary((s) => s.hydrated);
	const hydrate = useDiary((s) => s.hydrate);
	const remapEmojis = useDiary((s) => s.remapEmojis);
	const days = useDiary((s) => s.days);
	const settings = useDiary((s) => s.settings);
	const addBite = useDiary((s) => s.addBite);
	const updateBite = useDiary((s) => s.updateBite);
	const deleteBite = useDiary((s) => s.deleteBite);
	const resetAll = useDiary((s) => s.resetAll);
	const setDisplayName = useDiary((s) => s.setDisplayName);
	const dismissInstall = useDiary((s) => s.dismissInstall);
	const markGreeting = useDiary((s) => s.markGreeting);
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [tab, setTab] = (0, import_react.useState)("today");
	const [tabDir, setTabDir] = (0, import_react.useState)("right");
	const [compact, setCompact] = (0, import_react.useState)(false);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [sheetDate, setSheetDate] = (0, import_react.useState)("");
	const [sheetMeal, setSheetMeal] = (0, import_react.useState)("snack");
	const [toast, setToast] = (0, import_react.useState)(null);
	const [mood, setMood] = (0, import_react.useState)("idle");
	const [justAddedId, setJustAddedId] = (0, import_react.useState)(null);
	const [standalone, setStandalone] = (0, import_react.useState)(true);
	const [giftOpen, setGiftOpen] = (0, import_react.useState)(false);
	const canvasRef = (0, import_react.useRef)(null);
	const [container, setContainer] = (0, import_react.useState)(null);
	const busy = (0, import_react.useRef)(false);
	const greeted = (0, import_react.useRef)(false);
	const toastTimer = (0, import_react.useRef)(null);
	const sheetLock = (0, import_react.useRef)(false);
	const sheetLockTimer = (0, import_react.useRef)(null);
	const today = toYmd(now);
	const hour = now.getHours();
	const [calDate, setCalDate] = (0, import_react.useState)(today);
	(0, import_react.useEffect)(() => {
		hydrate();
		remapEmojis();
		setStandalone(isStandalone());
		setContainer(canvasRef.current);
		registerServiceWorker();
		document.documentElement.dataset.motion = prefersReduced() ? "reduce" : "ok";
		if (shouldShowGift()) setGiftOpen(true);
	}, [hydrate, remapEmojis]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(id);
	}, []);
	const idleMood = (0, import_react.useMemo)(() => {
		if (hour >= 21) return "sleepy";
		const empty = (days[today]?.length ?? 0) === 0;
		if (tab === "today" && empty) return "lean";
		return "idle";
	}, [
		hour,
		days,
		today,
		tab
	]);
	function trigger(next) {
		if (prefersReduced()) {
			setMood(idleMood);
			return;
		}
		if (busy.current && next !== "oops") return;
		busy.current = true;
		setMood(next);
		window.setTimeout(() => {
			busy.current = false;
			setMood(idleMood);
		}, next === "wave" ? 600 : 520);
	}
	(0, import_react.useEffect)(() => subscribeMascot(trigger), [idleMood]);
	(0, import_react.useEffect)(() => {
		if (!hydrated || greeted.current) return;
		greeted.current = true;
		if (useDiary.getState().settings.lastGreetingDate === today) {
			setMood(idleMood);
			return;
		}
		markGreeting(today);
		if (!prefersReduced()) trigger("wave");
	}, [
		hydrated,
		today,
		idleMood,
		markGreeting
	]);
	(0, import_react.useEffect)(() => {
		if (!busy.current) setMood(idleMood);
	}, [idleMood]);
	function ping(message) {
		setToast(message);
		if (toastTimer.current) window.clearTimeout(toastTimer.current);
		toastTimer.current = window.setTimeout(() => setToast(null), 1800);
	}
	function dismissSheet() {
		sheetLock.current = true;
		setSheetOpen(false);
		setEditing(null);
		if (sheetLockTimer.current) window.clearTimeout(sheetLockTimer.current);
		sheetLockTimer.current = window.setTimeout(() => {
			sheetLock.current = false;
		}, 450);
	}
	function handleSheetOpenChange(next) {
		if (next) {
			if (sheetLock.current) return;
			setSheetOpen(true);
			return;
		}
		setSheetOpen(false);
	}
	function openNew(meal, date) {
		if (sheetLock.current) return;
		setEditing(null);
		setSheetDate(date ?? (tab === "calendar" ? calDate : today));
		setSheetMeal(meal ?? defaultMeal(hour));
		setSheetOpen(true);
	}
	function openEdit(bite, date) {
		if (sheetLock.current) return;
		setEditing(bite);
		setSheetDate(date);
		setSheetMeal(bite.meal);
		setSheetOpen(true);
	}
	function saveDraft(draft) {
		const payload = {
			meal: draft.meal,
			name: draft.name.trim(),
			note: draft.note.trim(),
			kcal: parseKcal(draft.kcal),
			time: draft.time || formatNowTime(now),
			emoji: emojiForName(draft.name.trim())
		};
		if (editing) updateBite(sheetDate, editing.id, payload);
		else {
			const created = addBite(sheetDate, payload);
			setJustAddedId(created.id);
			window.setTimeout(() => setJustAddedId(null), 400);
		}
		dismissSheet();
		playMascot("bounce");
		ping(t.saved);
	}
	function removeEditing() {
		if (!editing) return;
		deleteBite(sheetDate, editing.id);
		dismissSheet();
		playMascot("oops");
		ping(t.deleted);
	}
	async function copyToday() {
		const text = copyDayText(today, days[today] ?? []);
		try {
			await navigator.clipboard.writeText(text);
		} catch {}
		ping(t.copied);
	}
	function changeTab(next) {
		if (next === tab) return;
		setTabDir(next === "calendar" ? "right" : "left");
		setTab(next);
		if (next === "calendar") playMascot("wink");
	}
	const showInstall = !standalone && !settings.installDismissed;
	const title = tab === "today" ? t.today : t.calendar;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "app-root",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "phone-canvas",
			ref: canvasRef,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "canvas-blobs",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "blob blob-a" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "blob blob-b" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "blob blob-c" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "canvas-grain",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "canvas-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "nav-bar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-11" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("compact-title", compact && "on"),
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn",
								"aria-label": t.settings,
								onClick: () => setSettingsOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
									size: 22,
									strokeWidth: 1.8
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-pane",
						onScroll: (e) => setCompact(e.currentTarget.scrollTop > 24),
						children: tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("tab-panel", tabDir === "right" ? "tab-panel-right" : "tab-panel-left"),
							children: [showInstall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallCard, { onDismiss: dismissInstall }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, {
								today,
								name: settings.displayName,
								hour,
								bites: days[today] ?? [],
								mood,
								onOpenBite: (bite) => openEdit(bite, today),
								justAddedId
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("tab-panel", tabDir === "right" ? "tab-panel-right" : "tab-panel-left"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-5 pb-3 pt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "large-title",
									children: t.calendar
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, {
								today,
								selected: calDate,
								onSelect: setCalDate,
								days,
								onOpenBite: (bite) => openEdit(bite, calDate)
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "fab",
					"aria-label": t.addBite,
					onClick: () => openNew(),
					disabled: sheetOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						size: 26,
						strokeWidth: 2.2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "tab-bar",
					"aria-label": "Peachy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("tab-item", tab === "today" && "is-on"),
						onClick: () => changeTab("today"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							size: 24,
							strokeWidth: tab === "today" ? 2.2 : 1.8
						}), t.today]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("tab-item", tab === "calendar" && "is-on"),
						onClick: () => changeTab("calendar"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
							size: 24,
							strokeWidth: tab === "calendar" ? 2.2 : 1.8
						}), t.calendar]
					})]
				}),
				toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "toast-pill",
					children: toast
				}) : null,
				giftOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftOverlay, { onDone: () => setGiftOpen(false) }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddSheet, {
					open: sheetOpen,
					onOpenChange: handleSheetOpenChange,
					container,
					editing,
					initialMeal: sheetMeal,
					initialTime: formatNowTime(now),
					onSave: saveDraft,
					onDelete: editing ? removeEditing : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {
					open: settingsOpen,
					onOpenChange: setSettingsOpen,
					container,
					displayName: settings.displayName,
					onDisplayName: setDisplayName,
					onCopyToday: () => {
						copyToday();
						setSettingsOpen(false);
					},
					onReset: () => {
						resetAll();
						setSettingsOpen(false);
						ping(t.resetDone);
					},
					showInstallGuide: !standalone
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeachyApp, {});
}
//#endregion
export { Home as component };
