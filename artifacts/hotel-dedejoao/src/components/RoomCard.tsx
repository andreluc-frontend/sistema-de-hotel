import { Link } from "wouter";

interface Room {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  tipo: string;
  imagem: string;
  comodidades: string[];
  avaliacao: number;
}

export default function RoomCard({ room }: { room: Room }) {
  const { id, nome, descricao, preco, tipo, imagem, comodidades = [], avaliacao = 9.0 } = room;
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
      <div className="md:w-64 h-52 md:h-auto relative flex-shrink-0">
        <img src={imagem} alt={nome} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-[#003580] text-white text-xs font-bold px-2 py-1 rounded-md">{tipo}</span>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#003580] mb-1">{nome}</h3>
          <p className="text-sm text-gray-500 mb-3">{descricao}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {comodidades.map((c) => (
              <span key={c} className="text-xs bg-[#eaf0fb] text-[#003580] px-2 py-1 rounded-full font-medium">{c}</span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-xs text-gray-400">por noite, a partir de</span>
            <p className="text-2xl font-extrabold text-gray-800">R$ {preco.toLocaleString("pt-BR")}</p>
            <span className="inline-flex items-center text-xs font-semibold text-white bg-[#003580] px-2 py-0.5 rounded mt-1">⭐ {avaliacao.toFixed(1)} Excelente</span>
          </div>
          <Link href={`/reserva?quarto=${id}`}>
            <button className="bg-[#febb02] text-[#003580] font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#f0b400] transition">Reservar →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
