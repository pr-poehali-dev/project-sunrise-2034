import { MagneticButton } from "@/components/magnetic-button"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
      <div className="max-w-4xl">
        <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
          <p className="font-mono text-xs text-foreground/90">Типография полного цикла</p>
        </div>
        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-7xl font-light leading-[1.05] tracking-tight text-foreground duration-1000 md:text-8xl lg:text-9xl">
          <span className="text-balance">Печать без компромиссов</span>
        </h1>
        <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
          <span className="text-pretty">
            Полный цикл полиграфии — от дизайна и допечатной подготовки до печати и постпечатной обработки. Любые тиражи, точные сроки, безупречное качество.
          </span>
        </p>
        <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
          <MagneticButton size="lg" variant="primary" onClick={() => navigate("/contacts")}>
            Рассчитать заказ
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => navigate("/products")}>
            Наша продукция
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
