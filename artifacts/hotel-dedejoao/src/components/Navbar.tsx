import { useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-[#003580] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          hotel<span className="text-[#febb02]">.com</span>
        </Link>
        <nav className="hidden md:flex gap-2">
          <Link href="/" className="px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition">Início</Link>
          <Link href="/reserva" className="px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition">Reservar</Link>
        </nav>
        <div className="hidden md:flex gap-2">
          <Link href="/login" className="px-4 py-2 border border-white rounded-md text-sm font-semibold hover:bg-white/10 transition">Entrar</Link>
          <Link href="/reserva" className="px-4 py-2 bg-[#febb02] text-[#003580] rounded-md text-sm font-bold hover:bg-[#f0b400] transition">Reservar agora</Link>
        </div>
      </div>
    </header>
  );
}
