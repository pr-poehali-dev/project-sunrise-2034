import { useReveal } from "@/hooks/use-reveal"
import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"

const products = [
  { number: "01", title: "Визитки и листовки", category: "Малоформатная печать", detail: "от 1 шт" },
  { number: "02", title: "Буклеты и каталоги", category: "Брошюровка и фальцовка", detail: "любой тираж" },
  { number: "03", title: "Упаковка и этикетки", category: "Картон, самоклейка, тиснение", detail: "под заказ" },
  { number: "04", title: "Баннеры и таблички", category: "Широкоформатная печать", detail: "любой размер" },
  { number: "05", title: "Книги и журналы", category: "Брошюровка, переплёт", detail: "любой тираж" },
  { number: "06", title: "Сувенирная продукция", category: "Нанесение логотипа", detail: "под заказ" },
]

export default function Products() {
  const { ref, isVisible } = useReveal(0.1)
  const navigate = useNavigate()

  return (
    <section ref={ref} className="min-h-[calc(100vh-73px)] px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Продукция
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что мы печатаем</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {products.map((item, i) => (
            <div
              key={i}
              className={`group flex items-center justify-between border-b border-foreground/10 py-5 transition-all duration-700 hover:border-foreground/30 md:py-7 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : i % 2 === 0
                  ? "-translate-x-16 opacity-0"
                  : "translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="font-mono text-sm text-foreground/30 group-hover:text-foreground/50 md:text-base">
                  {item.number}
                </span>
                <div>
                  <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-foreground/50 md:text-sm">{item.category}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-foreground/40 md:text-sm">{item.detail}</span>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 transition-all duration-700 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => navigate("/contacts")}>
            Рассчитать заказ
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
