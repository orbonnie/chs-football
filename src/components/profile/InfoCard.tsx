type InfoCardProps = {
  label: string
  value: string | number
}

export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  )
}