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
        {/* Top row: nav + contact info */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-2.5 md:px-10">
          {/* Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group relative font-sans text-xs font-medium transition-colors ${
                    active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
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
              className="font-mono text-xs text-foreground/70 transition-colors hover:text-foreground"
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
              <span className="font-mono text-xs text-foreground group-hover:underline">8 (966) 338-65-05</span>
            </a>
          </div>
        </div>

        {/* Bottom row: brand + action buttons */}
        <div className="flex items-center gap-4 px-6 py-4 md:px-10">
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick order button */}
          <button
            onClick={() => setShowOrder(true)}
            className="rounded-lg border border-foreground/30 bg-foreground/10 px-4 py-2 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground/20 hover:border-foreground/50"
          >
            Быстрый расчёт
          </button>

          {/* Work hours button */}
          <button
            onClick={() => setShowHours(true)}
            className="flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-2 font-sans text-sm font-medium text-foreground/80 backdrop-blur-sm transition-all hover:bg-foreground/15 hover:text-foreground"
          >
            <span
              className={`h-2 w-2 rounded-full ${open ? "bg-green-400" : "bg-red-400"}`}
            />
            Режим работы
          </button>
        </div>
      </header>

      {/* Page content */}
      <div
        className={`relative z-10 pt-[113px] transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>

      {/* Modals */}
      <QuickOrderModal open={showOrder} onClose={() => setShowOrder(false)} />
      <WorkHoursModal open={showHours} onClose={() => setShowHours(false)} isOpen={open} />
    </main>
  )
}
