const items = [
  { icon: "🛎️", titulo: "Check-in 24h",  descricao: "Recepção sempre disponível." },
  { icon: "🍽️", titulo: "Café incluso",   descricao: "Buffet completo toda manhã." },
  { icon: "🏊",  titulo: "Piscina & SPA", descricao: "Espaços premium para relaxar." },
  { icon: "🔒", titulo: "Reserva segura", descricao: "Dados protegidos com criptografia." },
];

export default function Features() {
  return (
    <section className="py-14 bg-[#f2f6ff]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#003580] mb-2 text-center">Por que nos escolher?</h2>
        <p className="text-gray-500 text-center mb-10 text-sm">Tudo para uma estadia perfeita</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((f) => (
            <div key={f.titulo} className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-md transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-[#003580] mb-2">{f.titulo}</h3>
              <p className="text-sm text-gray-500">{f.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
