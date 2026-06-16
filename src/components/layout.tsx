import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { QuickOrderModal } from "@/components/quick-order-modal"
import { WorkHoursModal } from "@/components/work-hours-modal"

const NAV_ITEMS = [
  { label: "О нас", path: "/about" },
  { label: "Новости", path: "/news" },
  { label: "Доставка и оплата", path: "/delivery" },
  { label: "Требования к макетам", path: "/layouts" },
  { label: "Отзывы", path: "/reviews" },
  { label: "Контакты", path: "/contacts" },
]

const WORK_START_WD = 9
const WORK_END_WD = 20
const WORK_START_WE = 10
const WORK_END_WE = 18

export function isOpen() {
  const now = new Date()
  const day = now.getDay()
  const time = now.getHours() + now.getMinutes() / 60
  if (day === 0 || day === 6) return time >= WORK_START_WE && time < WORK_END_WE
  return time >= WORK_START_WD && time < WORK_END_WD
}

export function Layout({ children }: { children: React.ReactNode }) {
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(isOpen())
  const [showOrder, setShowOrder] = useState(false)
  const [showHours, setShowHours] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const check = () => {
      const canvas = shaderContainerRef.current?.querySelector("canvas")
      if (canvas && canvas.width > 0) { setLoaded(true); return true }
      return false
    }
    if (check()) return
    const iv = setInterval(() => { if (check()) clearInterval(iv) }, 100)
    const fb = setTimeout(() => setLoaded(true), 1500)
    return () => { clearInterval(iv); clearTimeout(fb) }
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setOpen(isOpen()), 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Shader background — fixed */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ── HEADER ── */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 bg-black/40 backdrop-blur-md transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Top row: nav + contact info — NO border below */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 md:px-10">
          {/* Nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group relative font-sans text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          {/* Contact info */}
          <div className="ml-auto flex items-center gap-5">
            <a
              href="mailto:yavadesign@mail.ru"
              className="font-mono text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              yavadesign@mail.ru
            </a>
            <a
              href="tel:+79663386505"
              onClick={(e) => { e.preventDefault(); navigate("/contacts") }}
              className="group flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <span
                className={`h-2 w-2 animate-pulse rounded-full shadow-sm ${
                  open ? "bg-green-400 shadow-green-400/60" : "bg-red-400 shadow-red-400/60"
                }`}
                title={open ? "Открыто" : "Закрыто"}
              />
              <span className="font-mono text-sm text-foreground group-hover:underline">8 (966) 338-65-05</span>
            </a>
          </div>
        </div>

        {/* Bottom row: brand | centered buttons | right icons */}
        <div className="relative flex items-center px-6 pb-3 md:px-10">
          {/* Brand name — always home */}
          <button
            onClick={() => navigate("/")}
            className="group flex shrink-0 items-baseline gap-2 transition-opacity hover:opacity-80"
          >
            <span className="font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Ява Принт
            </span>
            <span className="hidden font-sans text-sm font-light text-foreground/50 md:inline">
              / Yava Design
            </span>
          </button>

          {/* Centered buttons */}
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-4">
            <button
              onClick={() => setShowOrder(true)}
              className="rounded-lg border border-foreground/40 bg-transparent px-5 py-2 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground/15 hover:border-foreground/70"
            >
              Быстрый расчёт
            </button>
            <button
              onClick={() => setShowHours(true)}
              className="flex items-center gap-2 rounded-lg border border-foreground/40 bg-transparent px-5 py-2 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground/15 hover:border-foreground/70"
            >
              <span className={`h-2 w-2 rounded-full ${open ? "bg-green-400" : "bg-red-400"}`} />
              Режим работы
            </button>
          </div>

          {/* Right icons: search + cart */}
          <div className="ml-auto flex items-center gap-4">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-all hover:bg-foreground/15 hover:text-foreground"
              title="Поиск"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-all hover:bg-foreground/15 hover:text-foreground"
              title="Корзина"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 font-mono text-[9px] font-bold text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div
        className={`relative z-10 pt-[105px] transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>

      {/* Modals */}
      <QuickOrderModal open={showOrder} onClose={() => setShowOrder(false)} />
      <WorkHoursModal open={showHours} onClose={() => setShowHours(false)} isOpen={open} />
    </main>
  )
}