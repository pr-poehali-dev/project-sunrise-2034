import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useNavigate } from "react-router-dom"

const stats = [
  { value: "10М+", label: "Оттисков", sublabel: "Напечатано за год", direction: "right" },
  { value: "15", label: "Лет", sublabel: "На рынке полиграфии", direction: "left" },
  { value: "24ч", label: "Срочно", sublabel: "Печать в день обращения", direction: "right" },
]

export default function About() {
  const { ref, isVisible } = useReveal(0.1)
  const navigate = useNavigate()

  return (
    <section ref={ref} className="min-h-[calc(100vh-73px)] px-4 py-16 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                Печатаем
                <br />
                то, что
                <br />
                <span className="text-foreground/40">впечатляет</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Мы — типография полного цикла. Собственное производство, современное оборудование и команда специалистов, которые держат качество под контролем на каждом этапе.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                От визитки до тиража в десятки тысяч экземпляров — печатаем точно в срок и без компромиссов по качеству.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-4 border-l border-foreground/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : stat.direction === "left"
                    ? "-translate-x-16 opacity-0"
                    : "translate-x-16 opacity-0"
                }`}
                style={{
                  transitionDelay: `${300 + i * 150}ms`,
                  marginLeft: i % 2 === 0 ? "0" : "auto",
                  maxWidth: i % 2 === 0 ? "100%" : "85%",
                }}
              >
                <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                <div>
                  <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                  <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => navigate("/contacts")}>
            Рассчитать заказ
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => navigate("/products")}>
            Смотреть продукцию
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
