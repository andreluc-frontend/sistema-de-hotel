import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#003580] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-2xl font-extrabold mb-3">hotel<span className="text-[#febb02]">.com</span></p>
          <p className="text-sm text-blue-200 leading-relaxed">Conforto e hospitalidade para tornar sua estadia inesquecível.</p>
        </div>
        <div>
          <p className="font-bold text-sm uppercase tracking-wider mb-3 text-[#febb02]">Navegação</p>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link href="/" className="hover:text-white transition">Início</Link></li>
            <li><Link href="/reserva" className="hover:text-white transition">Reservar</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-sm uppercase tracking-wider mb-3 text-[#febb02]">Contato</p>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>📞 (85) 3000-0000</li>
            <li>✉️ contato@hotel.com</li>
            <li>📍 Ceará, Brasil</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-300">
        © 2026 hotel.com — Todos os direitos reservados
      </div>
    </footer>
  );
}
