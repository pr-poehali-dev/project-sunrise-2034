import Icon from "@/components/ui/icon"

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

interface Props {
  open: boolean
  onClose: () => void
  isOpen: boolean
}

export function WorkHoursModal({ open, onClose, isOpen }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/95 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full shadow-sm ${isOpen ? "bg-green-400 shadow-green-400/60" : "bg-red-400 shadow-red-400/60"}`}
            />
            <h2 className="font-sans text-lg font-semibold text-white">
              {isOpen ? "Сейчас открыто" : "Сейчас закрыто"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Address */}
          <div className="flex items-start gap-3">
            <Icon name="MapPin" size={16} className="mt-0.5 shrink-0 text-white/40" />
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">Адрес</p>
              <p className="text-sm text-white">ул. Толбухина, 13к2</p>
              <p className="text-xs text-white/60">Москва, 121596</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-start gap-3">
            <Icon name="Clock" size={16} className="mt-0.5 shrink-0 text-white/40" />
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">График работы</p>
              <div className="space-y-1.5">
                {SCHEDULE.map((s) => {
                  const rowOpen = isRowOpen(s)
                  return (
                    <div key={s.days} className="flex items-center gap-3">
                      <span className="w-14 font-mono text-xs text-white/50">{s.days}</span>
                      <span className="font-sans text-sm text-white">{s.hours}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${rowOpen ? "bg-green-400" : "bg-red-400"}`}
                        title={rowOpen ? "Сейчас открыто" : "Сейчас закрыто"}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Icon name="Phone" size={16} className="shrink-0 text-white/40" />
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">Телефон</p>
              <a href="tel:+79663386505" className="font-mono text-sm text-white hover:text-white/70 transition-colors">
                8 (966) 338-65-05
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              src={YANDEX_MAP_URL}
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              title="Карта: ул. Толбухина, 13к2"
            />
            <div className="border-t border-white/10 px-3 py-2">
              <a
                href={`https://yandex.ru/maps/?pt=${LNG},${LAT}&z=16&l=map`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Открыть в Яндекс Картах →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
