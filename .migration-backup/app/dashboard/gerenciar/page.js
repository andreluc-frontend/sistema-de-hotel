"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Gerenciar() {
  const [hospedes, setHospedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meuToken, setMeuToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setMeuToken(token);

    // Buscar todos os hóspedes
    async function fetchHospedes() {
      try {
        const res = await fetch("/api/hospedes");
        if (!res.ok) throw new Error("Erro ao buscar hóspedes");
        const data = await res.json();
        setHospedes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHospedes();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

    try {
      const res = await fetch(`/api/hospedes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${meuToken}` },
      });

      if (res.ok) {
        setHospedes(hospedes.filter((h) => h.id !== id));
        alert("✅ Reserva cancelada com sucesso!");
      }
    } catch (error) {
      alert("❌ Erro ao cancelar reserva: " + error.message);
    }
  }

  if (loading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📋 Todas as Reservas</h1>
            <p className="text-gray-600 text-sm mt-1">Total: {hospedes.length} hóspede(s)</p>
          </div>
          <Link href="/dashboard" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            ← Voltar
          </Link>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">❌ {error}</div>}

        {hospedes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">Nenhuma reserva registrada.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Nome</th>
                  <th className="px-6 py-4 text-left font-semibold">CPF</th>
                  <th className="px-6 py-4 text-left font-semibold">Quarto</th>
                  <th className="px-6 py-4 text-left font-semibold">Telefone</th>
                  <th className="px-6 py-4 text-center font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {hospedes.map((hospede) => (
                  <tr key={hospede.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-800">#{hospede.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{hospede.nome}</td>
                    <td className="px-6 py-4 text-gray-600">{hospede.cpf}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">#{hospede.quarto}</td>
                    <td className="px-6 py-4 text-gray-600">{hospede.telefone}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(hospede.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        ❌ Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
