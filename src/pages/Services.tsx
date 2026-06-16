import { useReveal } from "@/hooks/use-reveal"
import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"

const services = [
  {
    title: "Дизайн и макет",
    description: "Разработка макета с нуля и подготовка к печати по вашим материалам",
    direction: "top",
  },
  {
    title: "Цифровая печать",
    description: "Быстрая печать малых и средних тиражей с превосходной цветопередачей",
    direction: "right",
  },
  {
    title: "Офсетная печать",
    description: "Большие тиражи по выгодной цене и со стабильным качеством",
    direction: "left",
  },
  {
    title: "Постпечатная обработка",
    description: "Ламинация, тиснение, вырубка, биговка и брошюровка под ключ",
    direction: "bottom",
  },
]

export default function Services() {
  const { ref, isVisible } = useReveal(0.1)
  const navigate = useNavigate()

  const getRevealClass = (direction: string) => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100"
    switch (direction) {
      case "left": return "-translate-x-16 opacity-0"
      case "right": return "translate-x-16 opacity-0"
      case "top": return "-translate-y-16 opacity-0"
      case "bottom": return "translate-y-16 opacity-0"
      default: return "translate-y-12 opacity-0"
    }
  }

  return (
    <section ref={ref} className="min-h-[calc(100vh-73px)] px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Услуги
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Полный цикл полиграфии</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:gap-x-24">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group transition-all duration-700 ${getRevealClass(service.direction)}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
                <span className="font-mono text-xs text-foreground/60">0{i + 1}</span>
              </div>
              <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-14 transition-all duration-700 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => navigate("/contacts")}>
            Обсудить заказ
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
