import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #0d3d20 0%, #1a6b3c 60%, #2da05c 100%)' }}>
        <div className="container mx-auto px-6 py-24 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            4 organizations now hiring in Lagos
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            Clean Green,<br />
            <span className="text-yellow-400">Earn Clean.</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-xl">
            Connect to paid climate micro-jobs in your community — waste collection, tree planting, and more. Get paid via mobile money.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition">
              Find climate work
            </Link>
            <Link to="/org-register" className="border border-white/60 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition">
              Post a task
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            ● 4 organizations approved &amp; hiring across Lagos
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Simple Steps. Real Impact.</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Whether you're looking for flexible income or need verified climate workers, GreenGig connects you in minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', icon: '📱', title: 'Sign up with your phone', desc: 'No ID required. Enter your number, verify with OTP, set up your profile in 3 minutes.' },
              { n: '02', icon: '🔍', title: 'Browse tasks near you', desc: 'See available climate micro-tasks in your LGA with pay, location, and requirements.' },
              { n: '03', icon: '💰', title: 'Complete tasks & get paid', desc: 'Submit multi-photo proof. Once approved, money goes straight to OPay or PalmPay.' },
            ].map(s => (
              <div key={s.n} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
                <div className="text-xs font-bold text-green-600 tracking-widest mb-2">{s.n}</div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Task types */}
      <section className="py-20" style={{ background: '#1a6b3c' }} id="task-types">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Climate work that pays</h2>
            <p className="text-white/75 max-w-lg mx-auto">Real environmental work, verified and compensated.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '🗑️', title: 'Waste Collection', desc: 'Collect and sort solid waste in high-density Lagos communities.', badge: 'Paid', lga: 'Alimosho LGA' },
              { icon: '🌳', title: 'Tree Planting', desc: 'Plant and monitor seedlings for mangrove and coastal restoration.', badge: 'Paid', lga: 'Epe LGA' },
              { icon: '🌾', title: 'Urban Farming', desc: 'Support community urban farming patches for local food security.', badge: 'Volunteer', lga: 'Lagos' },
              { icon: '📊', title: 'Climate Data', desc: 'Collect localised environmental data for government and NGO partners.', badge: 'Paid', lga: 'Lagos' },
              { icon: '♻️', title: 'Recycling & Sorting', desc: 'Sort recyclable materials at community collection points.', badge: 'Paid', lga: 'Alimosho LGA' },
              { icon: '📚', title: 'Community Education', desc: 'Lead awareness sessions on waste management and sustainability.', badge: 'Volunteer', lga: 'Lagos' },
            ].map(t => (
              <div key={t.title} className="bg-white/10 border border-white/20 rounded-xl p-6 hover:-translate-y-1 transition">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-white mb-2">{t.title}</h3>
                <p className="text-white/75 text-sm mb-4 leading-relaxed">{t.desc}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${t.badge === 'Paid' ? 'bg-yellow-400 text-gray-900' : 'bg-white/20 text-white border border-white/30'}`}>{t.badge}</span>
                  <span className="text-white/60 text-xs">📍 {t.lga}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-white" id="trust">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Your work is verified.<br />Your pay is guaranteed.</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Every task, every submission, every payment is protected by layers of verification.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: '📸', title: 'Multi-stage photo proof', desc: 'Photos at start, during, and completion. GPS and timestamp captured automatically.' },
              { icon: '🤖', title: 'AI image validation', desc: 'Every submission checked by AI for relevant content. Built on TACO and DeepForest datasets.' },
              { icon: '🏛️', title: 'Organisation approval', desc: 'Payments only release after a verified organisation reviews proof of work.' },
              { icon: '📍', title: 'GPS location tagging', desc: 'Device location captured at every photo upload — confirming the worker was on site.' },
            ].map(t => (
              <div key={t.title} className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-green-800 mb-2">{t.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-black text-white text-center mb-12">The Lagos climate crisis is real.<br />So is the opportunity.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { n: '13,000', u: 'tons/day', l: 'Solid waste Lagos generates daily' },
              { n: '25,000', u: 'green jobs', l: 'Already exist via LAWMA — uncoordinated' },
              { n: '85%', u: 'informal', l: 'Of African employment is informal (ILO)' },
              { n: '2 LGAs', u: 'at launch', l: 'Alimosho & Epe — active now' },
            ].map(s => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-green-400">{s.n}</div>
                <div className="text-green-400 text-sm font-semibold mt-1 mb-2">{s.u}</div>
                <div className="text-white/60 text-xs leading-relaxed">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#1a6b3c' }}>
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Be part of Africa's climate workforce</h2>
            <p className="text-white/75">Find paid tasks, make impact, or post climate jobs in your community.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/signup" className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition">Find climate work</Link>
            <Link to="/org-register" className="border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:border-white transition">Post a task</Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">Aligned with Lagos's climate ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['LAWMA', 'WeCyclers', 'LSETF', 'GIZ Nigeria', 'IUCN Nigeria', 'OPay', 'PalmPay'].map(p => (
              <span key={p} className="border border-gray-200 text-gray-400 font-bold text-sm px-5 py-2 rounded-lg hover:border-green-400 hover:text-green-700 transition cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-white font-black text-lg mb-3">🌿 GreenGig <span className="text-green-400">Africa</span></div>
            <p className="text-gray-400 text-sm leading-relaxed">Connecting low-income youth and women in Lagos to paid climate micro-jobs.</p>
          </div>
          {[
            { h: 'Company', links: ['About us', 'Partners', 'Contact'] },
            { h: 'Platform', links: ['Find work', 'Post a task', 'Volunteer', 'How it works'] },
            { h: 'Legal', links: ['Privacy policy', 'Terms of service'] },
          ].map(col => (
            <div key={col.h}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{col.h}</h4>
              <div className="flex flex-col gap-2">
                {col.links.map(l => <a key={l} href="#" className="text-gray-400 text-sm hover:text-green-400 transition">{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 container mx-auto px-6 max-w-5xl flex justify-between items-center">
          <p className="text-gray-500 text-sm">© 2026 GreenGig Africa. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500 text-sm">
            <a href="#" className="hover:text-green-400">𝕏</a>
            <a href="#" className="hover:text-green-400">in</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
