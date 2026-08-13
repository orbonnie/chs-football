import Link from "next/link";


const quickLinks = [
  {
    label: "Add News Story",
    href: "/admin/add-news",
    description: "Add a news story",
  },
  {
    label: "Add/Update Player",
    href: "/admin/add-player",
    description: "Add a new player",
  },
  {
    label: "Add/Update Game",
    href: "/admin/add-game",
    description: "Add a new game or update an existing one",
  },
];

export default function AdminPage() {

  return (
    <div className="py-16 px-6 max-w-2xl mx-auto text-black-500/90">
      <h1 className="text-black-500 text-2xl font-display my-8">Admin</h1>
      <div className="flex flex-col divide-y divide-silver-400">
        {quickLinks.map((link, i) => (
          <Link
            key={`${link.label}-${i}`}
            href={link.href}
            target='_blank'
            className="group flex items-start gap-4 py-5 hover:bg-silver-400 hover:text-royal-600 hover:font-semibold transition-colors px-2 -mx-2 rounded"
          >
            <span className="text-silver-600 font-mono text-sm pt-0.5">
              {String(i + 1)}
            </span>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}