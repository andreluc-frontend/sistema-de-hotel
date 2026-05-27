import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RoomCard from "@/components/RoomCard";
import { Link } from "wouter";
import { quartos } from "@/lib/rooms";

const depoimentos = [
  { nome: "Ana Lima",       cidade: "São Paulo, SP", texto: "Simplesmente perfeito! O quarto era lindo e o café da manhã incrível.", nota: 10, avatar: "AL" },
  { nome: "Carlos Mendes",  cidade: "Fortaleza, CE", texto: "Melhor hotel do Nordeste. Preços justos e conforto de luxo. Voltarei!", nota: 9,  avatar: "CM" },
  { nome: "Fernanda Costa", cidade: "Recife, PE",    texto: "A suíte master superou todas as expectativas. A jacuzzi é incrível!",  nota: 10, avatar: "FC" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Features />

      <section className="py-14 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#003580]">Quartos em destaque</h2>
            <p className="text-gray-500 text-sm mt-1">Os favoritos dos nossos hóspedes</p>
          </div>
          <Link href="/reserva" className="px-5 py-2 border-2 border-[#003580] text-[#003580] rounded-lg font-semibold text-sm hover:bg-[#eaf0fb] transition">
            Reservar agora →
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          {quartos.map((q) => (
            <RoomCard key={q.id} room={q} />
          ))}
        </div>
      </section>

      <section className="py-16 text-white text-center" style={{ background: "linear-gradient(135deg,#003580,#0071c2)" }}>
        <h2 className="text-3xl font-extrabold mb-3">Pronto para reservar?</h2>
        <p className="text-blue-200 mb-8 text-lg">Garanta sua estadia com os melhores preços.</p>
        <Link href="/reserva">
          <button className="bg-[#febb02] text-[#003580] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#f0b400] transition">
            Fazer reserva agora →
          </button>
        </Link>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#003580] mb-2 text-center">O que dizem nossos hóspedes</h2>
        <p className="text-gray-500 text-center mb-10 text-sm">Avaliações reais de quem já ficou conosco</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((d) => (
            <div key={d.nome} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#003580] text-white font-bold text-sm px-2 py-1 rounded">{d.nota}.0</span>
                <span className="text-sm text-gray-500 font-medium">Excelente</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">{d.texto}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#003580] text-white flex items-center justify-center font-bold text-sm">{d.avatar}</div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{d.nome}</p>
                  <p className="text-xs text-gray-400">{d.cidade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
