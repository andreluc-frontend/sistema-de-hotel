import { useState } from "react";
import { Link, useSearch } from "wouter";
import { quartos } from "@/lib/rooms";

function ReservaForm() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const [form, setForm] = useState({
    nome: "", cpf: "", quarto: params.get("quarto") || "", telefone: "", senha: "", confirmarSenha: ""
  });
  const [sucesso, setSucesso] = useState<null | { nome: string; cpf: string; telefone: string; quarto: number }>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const quartoSelecionado = quartos.find((q) => q.id === Number(form.quarto));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/hospedes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          cpf: form.cpf,
          quarto: Number(form.quarto),
          telefone: form.telefone,
          senha: form.senha
        })
      });

      const text = await res.text();
      let data: { nome?: string; cpf?: string; telefone?: string; quarto?: number; error?: string; details?: string };
      try {
        data = JSON.parse(text);
      } catch {
        setErro("Erro de servidor: resposta inválida");
        setLoading(false);
        return;
      }

      setLoading(false);

      if (!res.ok) {
        setErro(data.error || data.details || "Erro ao realizar reserva.");
        return;
      }

      setSucesso(data as { nome: string; cpf: string; telefone: string; quarto: number });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      setErro("Erro de conexão: " + message);
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <div className="max-w-lg mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[#003580] mb-2">Reserva confirmada!</h2>
        <p className="text-gray-600 mb-1">Bem-vindo(a), <strong>{sucesso.nome}</strong>!</p>
        <p className="text-gray-600 mb-6">Quarto <strong className="text-[#0071c2]">#{sucesso.quarto}</strong> reservado.</p>
        <div className="bg-[#eaf0fb] rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-[#003580] font-semibold mb-2">📋 Resumo</p>
          <p className="text-sm text-gray-600">Nome: {sucesso.nome}</p>
          <p className="text-sm text-gray-600">CPF: {sucesso.cpf}</p>
          <p className="text-sm text-gray-600">Telefone: {sucesso.telefone}</p>
          <p className="text-sm text-gray-600">Quarto: #{sucesso.quarto}</p>
        </div>
        <Link href="/" className="px-5 py-2 bg-[#003580] text-white rounded-lg font-semibold text-sm hover:bg-[#00256a] transition">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f6ff] pb-16">
      <div className="bg-[#003580] text-white py-10 px-4 mb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">Realizar Reserva</h1>
          <p className="text-blue-200">Preencha seus dados para confirmar o check-in</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-[#003580] mb-5">🛎️ Dados do hóspede</h2>
            {erro && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">❌ {erro}</div>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Nome completo *</label>
                <input type="text" placeholder="Seu nome completo" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0071c2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">CPF *</label>
                <input type="text" placeholder="000.000.000-00" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0071c2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Telefone *</label>
                <input type="tel" placeholder="(00) 00000-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0071c2]" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Número do quarto *</label>
                <select value={form.quarto} onChange={(e) => setForm({ ...form, quarto: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0071c2]" required>
                  <option value="">Selecione um quarto</option>
                  {quartos.map((q) => (<option key={q.id} value={q.id}>Quarto {q.id} — {q.nome} (R$ {q.preco}/noite)</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Criar senha *</label>
                <input type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0071c2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Confirmar senha *</label>
                <input type="password" placeholder="Repita a senha" value={form.confirmarSenha} onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0071c2]" required />
              </div>
              <div className="md:col-span-2 mt-2">
                <button type="submit" disabled={loading} className="w-full bg-[#febb02] text-[#003580] font-bold py-3.5 rounded-xl text-base hover:bg-[#f0b400] transition disabled:opacity-50">
                  {loading ? "Processando..." : "✅ Confirmar reserva"}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">🔒 Dados protegidos com criptografia</p>
              </div>
            </form>
          </div>
        </div>
        <div className="md:col-span-1">
          {quartoSelecionado ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <img src={quartoSelecionado.imagem} alt={quartoSelecionado.nome} className="w-full h-40 object-cover" />
              <div className="p-5">
                <span className="text-xs bg-[#003580] text-white px-2 py-0.5 rounded font-semibold">{quartoSelecionado.tipo}</span>
                <h3 className="font-bold text-[#003580] mt-2 mb-1">{quartoSelecionado.nome}</h3>
                <p className="text-xs text-gray-500 mb-4">{quartoSelecionado.descricao}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {quartoSelecionado.comodidades.map((c) => (<span key={c} className="text-xs bg-[#eaf0fb] text-[#003580] px-2 py-0.5 rounded-full">{c}</span>))}
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Por noite</span>
                  <span className="text-xl font-extrabold text-gray-800">R$ {quartoSelecionado.preco.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-400">
              <div className="text-4xl mb-3">🏨</div>
              <p className="text-sm">Selecione um quarto para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Reserva() {
  return <ReservaForm />;
}
