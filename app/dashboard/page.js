"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { quartos } from "@/lib/rooms";

export default function Dashboard() {
  const [hospede, setHospede] = useState(null);
  const [quartoInfo, setQuartoInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem("token");
    const hospedeData = localStorage.getItem("hospede");

    if (!token || !hospedeData) {
      window.location.href = "/login";
      return;
    }

    const dados = JSON.parse(hospedeData);
    setHospede(dados);

    // Buscar informações do quarto
    const quarto = quartos.find((q) => q.id === Number(dados.quarto));
    setQuartoInfo(quarto);
    setLoading(false);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("hospede");
    window.location.href = "/";
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Carregando...</div>;
  }

  if (!hospede) {
    return <div className="text-center py-20 text-red-600">Erro ao carregar dados</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Bem-vindo(a), {hospede.nome}! 🏨</h1>
            <p className="text-blue-200">Você está hospedado no Quarto #{hospede.quarto}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informações do Quarto */}
          {quartoInfo && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={quartoInfo.imagem} alt={quartoInfo.nome} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                    {quartoInfo.tipo}
                  </span>
                  <span className="text-lg font-bold text-yellow-500">⭐ {quartoInfo.avaliacao}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{quartoInfo.nome}</h2>
                <p className="text-gray-600 text-sm mb-4">{quartoInfo.descricao}</p>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">🛏️ Comodidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {quartoInfo.comodidades.map((c) => (
                      <span key={c} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Diária</span>
                  <span className="text-2xl font-bold text-gray-800">R$ {quartoInfo.preco}</span>
                </div>
              </div>
            </div>
          )}

          {/* Resumo da Reserva */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Seus Dados</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Nome</p>
                  <p className="text-lg font-semibold text-gray-800">{hospede.nome}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Quarto</p>
                  <p className="text-lg font-semibold text-blue-600">#{hospede.quarto}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                  <p className="text-lg font-semibold text-green-600">✅ Reserva Confirmada</p>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Ações Rápidas</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/gerenciar"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition"
                >
                  👥 Ver Todas as Reservas
                </Link>
                <Link
                  href="/reserva"
                  className="block w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg text-center transition"
                >
                  🏨 Fazer Outra Reserva
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Suporte */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-2">📞 Precisa de Ajuda?</h3>
          <p className="text-blue-800 text-sm">Entre em contato com a recepção pelo telefone (00) 0000-0000 ou visite o balcão principal.</p>
        </div>
      </div>
    </div>
  );
}
