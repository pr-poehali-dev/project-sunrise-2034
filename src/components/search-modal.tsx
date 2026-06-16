import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const SEARCH_INDEX = [
  { title: "Главная", desc: "Типография полного цикла — печать без компромиссов", path: "/", tags: ["типография", "печать", "полиграфия", "оттиски"] },
  { title: "Продукция", desc: "Визитки и листовки — малоформатная печать от 1 шт", path: "/products", tags: ["визитки", "листовки", "малоформатная"] },
  { title: "Продукция", desc: "Буклеты и каталоги — брошюровка и фальцовка, любой тираж", path: "/products", tags: ["буклеты", "каталоги", "брошюровка", "фальцовка"] },
  { title: "Продукция", desc: "Упаковка и этикетки — картон, самоклейка, тиснение", path: "/products", tags: ["упаковка", "этикетки", "картон", "самоклейка", "тиснение"] },
  { title: "Продукция", desc: "Баннеры и таблички — широкоформатная печать любого размера", path: "/products", tags: ["баннеры", "таблички", "широкоформатная"] },
  { title: "Продукция", desc: "Книги и журналы — брошюровка, переплёт, любой тираж", path: "/products", tags: ["книги", "журналы", "переплёт"] },
  { title: "Продукция", desc: "Сувенирная продукция — нанесение логотипа", path: "/products", tags: ["сувениры", "сувенирная", "логотип"] },
  { title: "Услуги", desc: "Дизайн и макет — разработка с нуля, подготовка к печати", path: "/services", tags: ["дизайн", "макет", "подготовка"] },
  { title: "Услуги", desc: "Цифровая печать — быстрая печать малых и средних тиражей", path: "/services", tags: ["цифровая", "цифровая печать", "тираж"] },
  { title: "Услуги", desc: "Офсетная печать — большие тиражи по выгодной цене", path: "/services", tags: ["офсет", "офсетная", "большой тираж"] },
  { title: "Услуги", desc: "Постпечатная обработка — ламинация, тиснение, вырубка, биговка", path: "/services", tags: ["ламинация", "вырубка", "биговка", "постпечатная"] },
  { title: "О нас", desc: "15 лет на рынке, 10 млн+ оттисков в год, срочная печать за 24 часа", path: "/about", tags: ["о нас", "компания", "история", "срочно"] },
  { title: "Контакты", desc: "ул. Толбухина, 13к2, Москва — 8 (966) 338-65-05", path: "/contacts", tags: ["контакты", "адрес", "телефон", "москва", "толбухина"] },
  { title: "График работы", desc: "Пн–Пт 09:00–20:00, Сб–Вс 10:00–18:00", path: "/contacts", tags: ["режим", "график", "часы", "время"] },
]

type Result = typeof SEARCH_INDEX[0]

interface Props {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery("")
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) { setResults([]); return }
    const seen = new Set<string>()
    const matched = SEARCH_INDEX.filter((item) => {
      const key = item.path + item.desc
      if (seen.has(key)) return false
      const hit =
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.tags.some((t) => t.includes(q))
      if (hit) seen.add(key)
      return hit
    })
    setResults(matched)
  }, [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const go = (path: string) => { navigate(path); onClose() }

  const highlight = (text: string) => {
    const q = query.trim()
    if (!q) return text
    const idx = text.toLowerCase().indexOf(q.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-blue-500/30 text-white rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  const pathLabel: Record<string, string> = {
    "/": "Главная",
    "/products": "Продукция",
    "/services": "Услуги",
    "/about": "О нас",
    "/contacts": "Контакты",
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl">
        {/* Search input */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#1a1a1a]/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-white/40">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по сайту..."
            className="flex-1 bg-transparent font-sans text-base text-white placeholder:text-white/30 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-white/40 hover:text-white/70 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
          <button onClick={onClose} className="ml-1 rounded-md border border-white/15 px-2 py-0.5 font-mono text-xs text-white/30 hover:text-white/50 transition-colors">
            Esc
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/95 shadow-2xl backdrop-blur-xl">
            <ul>
              {results.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => go(item.path)}
                    className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-white/8 border-b border-white/5 last:border-0"
                  >
                    <span className="mt-0.5 shrink-0 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50 whitespace-nowrap">
                      {pathLabel[item.path] ?? item.title}
                    </span>
                    <div>
                      <p className="font-sans text-sm font-medium text-white">{highlight(item.title)}</p>
                      <p className="font-sans text-xs text-white/50 leading-relaxed">{highlight(item.desc)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#1a1a1a]/95 px-5 py-6 text-center shadow-2xl backdrop-blur-xl">
            <p className="font-sans text-sm text-white/40">Ничего не найдено по запросу «{query}»</p>
          </div>
        )}

        {!query && (
          <div className="mt-3 flex flex-wrap gap-2 px-1">
            {["Визитки", "Баннеры", "Ламинация", "Офсет", "Срочно"].map((hint) => (
              <button
                key={hint}
                onClick={() => setQuery(hint.toLowerCase())}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-sans text-xs text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white/90"
              >
                {hint}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
