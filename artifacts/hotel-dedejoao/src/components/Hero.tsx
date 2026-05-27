import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative min-h-[520px] flex items-end pb-12" style={{ background: "linear-gradient(135deg,#003580 0%,#0071c2 60%,#00aaff 100%)" }}>
      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">Encontre o seu quarto perfeito</h1>
          <p className="text-lg text-blue-100 max-w-xl">Conforto, requinte e hospitalidade num só lugar.</p>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-end max-w-3xl">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Destino</label>
            <input type="text" placeholder="Para onde você vai?" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#0071c2]" />
          </div>
          <div className="w-full md:w-36">
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Check-in</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none" />
          </div>
          <div className="w-full md:w-36">
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Check-out</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none" />
          </div>
          <Link href="/reserva">
            <button className="w-full md:w-auto bg-[#febb02] text-[#003580] font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#f0b400] transition whitespace-nowrap">🔍 Buscar</button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          {["✅ Sem taxas ocultas","🔒 Pagamento seguro","⭐ Avaliado 4.9/5","🕐 Atendimento 24h"].map((b) => (
            <span key={b} className="text-white text-sm font-medium bg-white/15 px-3 py-1 rounded-full">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
