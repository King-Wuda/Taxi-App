import { SearchBar } from '@/components/SearchBar'
import { MapPin, BookOpen, Banknote } from 'lucide-react'

const examples = ['Soweto', 'Sandton', 'Pretoria', 'Alexandra', 'Tembisa', 'Midrand']

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <MapPin className="h-4 w-4" />
            Gauteng pilot — more provinces coming soon
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Find your minibus taxi route
          </h1>
          <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto">
            Search routes, ranks, and fares across South Africa — no more guessing.
            As easy to use as Uber, at a fraction of the price.
          </p>
          <SearchBar />
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-green-200 text-sm">Try:</span>
            {examples.map((ex) => (
              <a
                key={ex}
                href={`/routes?q=${encodeURIComponent(ex)}`}
                className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                {ex}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <MapPin className="h-6 w-6 text-green-700" />,
              title: 'Search your destination',
              desc: "Type where you want to go. We'll show you which taxi routes go there.",
            },
            {
              icon: <BookOpen className="h-6 w-6 text-green-700" />,
              title: 'Get the details',
              desc: 'See which rank to go to, the fare, travel time, and what to expect.',
            },
            {
              icon: <Banknote className="h-6 w-6 text-green-700" />,
              title: 'Board with confidence',
              desc: 'Know the exact fare before you board. No surprises, no overpaying.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Price comparison */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            Taxis are 50%+ cheaper than Uber — they just needed an app
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-10">
            15 million South Africans take minibus taxis every day. The only reason people
            choose Uber is because it is easier to use. We are fixing that.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Soweto → Joburg CBD', taxi: 'R14–18', uber: '~R80–120' },
              { label: 'Alex → Sandton', taxi: 'R8–10', uber: '~R45–70' },
              { label: 'Joburg → Pretoria', taxi: 'R28–35', uber: '~R150–250' },
              { label: 'Alex → Joburg CBD', taxi: 'R10–12', uber: '~R60–90' },
            ].map(({ label, taxi, uber }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <div className="flex gap-3 text-sm shrink-0">
                  <span className="text-green-700 font-semibold">{taxi}</span>
                  <span className="text-gray-400">vs</span>
                  <span className="text-red-400 line-through">{uber}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Uber fares estimated. Taxi fares sourced from community reports — verify before boarding.
          </p>
        </div>
      </section>

      {/* Driver/association CTA */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Are you a driver or taxi association?</h2>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">
          Get your routes listed and let passengers find you. We are onboarding pilot
          associations in Gauteng now.
        </p>
        <a
          href="mailto:hello@taxiroute.co.za"
          className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Get in touch
        </a>
      </section>
    </div>
  )
}
