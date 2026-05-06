type StatCardProps = {
  label: string
  value: string | number
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-silver-500 rounded-2xl p-6 text-center border border-white/10">
      <p className="font-display text-4xl text-black-500">
        {value}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-black-500/50">
        {label}
      </p>
    </div>
  )
}
