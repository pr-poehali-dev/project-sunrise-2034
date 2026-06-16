import { useState, useRef, type FormEvent, type DragEvent } from "react"
import Icon from "@/components/ui/icon"

interface Props {
  open: boolean
  onClose: () => void
}

export function QuickOrderModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", task: "" })
  const [files, setFiles] = useState<File[]>([])
  const [agree, setAgree] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const arr = Array.from(newFiles).filter((f) => f.size <= 50 * 1024 * 1024)
    setFiles((prev) => [...prev, ...arr])
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !agree) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose(); setForm({ name: "", email: "", task: "" }); setFiles([]); setAgree(false) }, 3000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1a1a1a]/95 shadow-2xl backdrop-blur-xl max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="font-sans text-lg font-semibold text-white">Быстрый расчёт</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="Check" size={28} className="text-green-400" />
            </div>
            <p className="font-sans text-lg font-medium text-white">Заявка отправлена!</p>
            <p className="font-sans text-sm text-white/60">Мы свяжемся с вами в течение 15 минут</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
            {/* Name */}
            <div>
              <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-white/50">
                Ваше имя <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="Введите ваше имя"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-white/50">
                Электронная почта <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="example@mail.ru"
              />
            </div>

            {/* Task */}
            <div>
              <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-white/50">
                Опишите задачу
              </label>
              <textarea
                rows={4}
                value={form.task}
                onChange={(e) => setForm({ ...form, task: e.target.value })}
                className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="Пожелания по выполнению, ссылки на файлы на файлообменниках..."
              />
            </div>

            {/* File upload */}
            <div>
              <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-white/50">
                Загрузите ваши файлы
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
                  dragging ? "border-white/50 bg-white/10" : "border-white/15 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                <Icon name="Upload" size={32} className="text-white/40" />
                <p className="text-sm text-white/80">
                  Перетащите файлы сюда или{" "}
                  <span className="text-blue-400 underline">выберите файлы</span>
                </p>
                <p className="text-xs text-white/40">Размер файла не должен превышать 50.0 МиБ.</p>
                <p className="text-xs text-white/30">Файлы размером более 50 МБ можно загрузить на файловый обменник и прикрепить ссылку в комментариях.</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
              {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5">
                      <span className="truncate text-xs text-white/70">{f.name}</span>
                      <button type="button" onClick={() => removeFile(i)} className="ml-2 text-white/40 hover:text-white/80">
                        <Icon name="X" size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Agreement */}
            <label className="flex cursor-pointer items-start gap-3">
              <div
                onClick={() => setAgree(!agree)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  agree ? "border-blue-400 bg-blue-400" : "border-white/30 bg-transparent"
                }`}
              >
                {agree && <Icon name="Check" size={10} className="text-black" />}
              </div>
              <span className="text-xs leading-relaxed text-white/50">
                Я согласен на обработку данных в соответствии с политикой конфиденциальности, офертой и договором о согласии на обработку персональных данных
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agree || submitting}
              className="w-full rounded-lg bg-white/15 py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Отправляем..." : "Отправить"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
