import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"
import { useState, type FormEvent } from "react"

const LAT = 55.723379
const LNG = 37.398419
const YANDEX_MAP_URL = `https://yandex.ru/map-widget/v1/?ll=${LNG},${LAT}&z=16&pt=${LNG},${LAT},pm2rdm`

const SCHEDULE = [
  { days: "Пн–Пт", hours: "09:00–20:00", start: 9, end: 20, weekdays: [1,2,3,4,5] },
  { days: "Сб–Вс", hours: "10:00–18:00", start: 10, end: 18, weekdays: [0,6] },
]

function isRowOpen(row: typeof SCHEDULE[0]) {
  const now = new Date()
  const day = now.getDay()
  const time = now.getHours() + now.getMinutes() / 60
  return row.weekdays.includes(day) && time >= row.start && time < row.end
}

export default function Contacts() {
  const { ref, isVisible } = useReveal(0.1)
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", phone: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section ref={ref} className="min-h-[calc(100vh-73px)] px-4 py-16 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Рассчитаем
            <br />
            ваш заказ
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-base">/ Оставьте заявку — ответим за 15 минут</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — info */}
          <div className="space-y-8">
            {/* Phone */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="mb-1 flex items-center gap-2">
                <Icon name="Phone" className="h-3 w-3 text-foreground/60" />
                <span className="font-mono text-xs text-foreground/60">Телефон</span>
              </div>
              <a
                href="tel:+79663386505"
                className="text-base text-foreground transition-colors hover:text-foreground/70 md:text-2xl"
              >
                8 (966) 338-65-05
              </a>
            </div>

            {/* Address */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="mb-1 flex items-center gap-2">
                <Icon name="MapPin" className="h-3 w-3 text-foreground/60" />
                <span className="font-mono text-xs text-foreground/60">Адрес</span>
              </div>
              <p className="text-base text-foreground md:text-xl">
                ул. Толбухина, 13к2, Москва, 121596
              </p>
            </div>

            {/* Schedule */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Icon name="Clock" className="h-3 w-3 text-foreground/60" />
                <span className="font-mono text-xs text-foreground/60">График работы</span>
              </div>
              <div className="space-y-2">
                {SCHEDULE.map((s) => {
                  const open = isRowOpen(s)
                  return (
                    <div key={s.days} className="flex items-center gap-3">
                      <span className="w-16 font-mono text-sm text-foreground/60">{s.days}</span>
                      <span className="font-sans text-base text-foreground">{s.hours}</span>
                      <span
                        className={`h-2 w-2 rounded-full ${open ? "bg-green-400 shadow-green-400/60 shadow-sm" : "bg-red-400 shadow-red-400/60 shadow-sm"}`}
                        title={open ? "Сейчас открыто" : "Сейчас закрыто"}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Map */}
            <div
              className={`overflow-hidden rounded-xl border border-foreground/10 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <iframe
                src={YANDEX_MAP_URL}
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Карта: ул. Толбухина, 13к2"
              />
              <div className="border-t border-foreground/10 px-3 py-2">
                <a
                  href={`https://yandex.ru/maps/?pt=${LNG},${LAT}&z=16&l=map`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-foreground/50 transition-colors hover:text-foreground/80"
                >
                  Открыть в Яндекс Картах →
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
              <div>
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Что нужно напечатать?</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder="Тираж, формат, сроки, особые пожелания..."
                />
              </div>

              <MagneticButton variant="primary" size="lg" className="w-full disabled:opacity-50">
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </MagneticButton>

              {submitSuccess && (
                <p className="text-center font-mono text-sm text-foreground/80">
                  Заявка отправлена! Мы перезвоним вам в течение 15 минут.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}