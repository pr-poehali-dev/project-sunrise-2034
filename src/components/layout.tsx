import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const NAV_ITEMS = [
  { label: "Главная", path: "/" },
  { label: "Продукция", path: "/products" },
  { label: "Услуги", path: "/services" },
  { label: "О нас", path: "/about" },
  { label: "Контакты", path: "/contacts" },
]

const WORK_START = 9
const WORK_END_WEEKDAY = 20
const WORK_END_WEEKEND = 18

function isOpen() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const time = hour + minute / 60
  if (day === 0) return time >= WORK_START && time < WORK_END_WEEKEND
  if (day === 6) return time >= WORK_START && time < WORK_END_WEEKEND
  return time >= WORK_START && time < WORK_END_WEEKDAY
}

export function Layout({ children }: { children: React.ReactNode }) {
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(isOpen())
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

      {/* Header — fixed, always on top */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center justify-between border-b border-foreground/10 bg-black/30 px-6 py-4 backdrop-blur-md md:px-12">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:bg-foreground/25">
              <span className="font-sans text-lg font-bold text-foreground">П</span>
            </div>
            <span className="font-sans text-lg font-semibold tracking-tight text-foreground">ПринтПро</span>
          </button>

          {/* Nav — centered */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group relative font-sans text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          {/* Phone + status */}
          <a
            href="tel:+79663386505"
            onClick={(e) => { e.preventDefault(); navigate("/contacts") }}
            className="group flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span
              className={`h-2.5 w-2.5 animate-pulse rounded-full shadow-lg ${
                open ? "bg-green-400 shadow-green-400/60" : "bg-red-400 shadow-red-400/60"
              }`}
              title={open ? "Открыто" : "Закрыто"}
            />
            <span className="font-mono text-sm text-foreground group-hover:underline">8 (966) 338-65-05</span>
          </a>
        </div>
      </header>

      {/* Page content */}
      <div
        className={`relative z-10 pt-[73px] transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
    </main>
  )
}