"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CryptoPrice {
  bitcoin: { idr: number; idr_24h_change: number };
  ethereum: { idr: number; idr_24h_change: number };
  solana: { idr: number; idr_24h_change: number };
}

export default function Home() {
  // 1. State Tema (Dark / Light)
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // 2. State Live Crypto API
  const [cryptoData, setCryptoData] = useState<CryptoPrice | null>(null);
  const [loadingCrypto, setLoadingCrypto] = useState<boolean>(true);

  // 3. State Kalkulator Estimasi
  const [layanan, setLayanan] = useState<string>("landing");
  const [halaman, setHalaman] = useState<number>(1);
  const [butuhBot, setButuhBot] = useState<boolean>(false);
  const [desainCustom, setDesainCustom] = useState<boolean>(false);

  // 4. State Portofolio Filter
  const [activeTab, setActiveTab] = useState<string>("all");

  // 5. State FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 6. State Form Interaktif & Toast
  const [namaKlien, setNamaKlien] = useState<string>("");
  const [pesanKlien, setPesanKlien] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch Live Crypto Market API
  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=idr&include_24hr_change=true"
        );
        const data = await res.json();
        setCryptoData(data);
      } catch (err) {
        console.error("Gagal mengambil data crypto:", err);
      } finally {
        setLoadingCrypto(false);
      }
    }
    fetchPrices();
  }, []);

  // Hitung Estimasi Biaya
  const hitungHarga = () => {
    let base = layanan === "landing" ? 500000 : layanan === "profil" ? 750000 : 1500000;
    base += (halaman - 1) * 150000;
    if (butuhBot) base += 500000;
    if (desainCustom) base += 300000;
    return base.toLocaleString("id-ID");
  };

  // Submit Form Simulasi
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKlien || !pesanKlien) {
      setToastMessage("⚠️ Silakan isi nama dan pesan Anda terlebih dahulu!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setToastMessage(`✅ Terima kasih ${namaKlien}, konsultasi Anda telah dijadwalkan!`);
    setNamaKlien("");
    setPesanKlien("");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const projects = [
    { id: 1, title: "Sistem Kependudukan & Biodata Web", category: "webapp", desc: "Aplikasi CRUD berbasis Next.js & TypeScript dengan antarmuka modern." },
    { id: 2, title: "Crypto Real-Time Market Tracker", category: "crypto", desc: "Integrasi API pasar kripto dengan pembaruan harga live tanpa reload." },
    { id: 3, title: "Landing Page UMKM & Profil Bisnis", category: "webapp", desc: "Desain landing page responsif terintegrasi tombol WhatsApp otomatis." },
    { id: 4, title: "Bot Automation Telegram Signal", category: "crypto", desc: "Sistem notifikasi otomatis untuk grup diskusi dan trading signal." },
  ];

  const filteredProjects = activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div className={darkMode ? "bg-slate-950 text-white font-sans transition-colors duration-300" : "bg-slate-50 text-slate-900 font-sans transition-colors duration-300"}>
      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-2xl animate-bounce text-xs">
          {toastMessage}
        </div>
      )}

      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Navigation Bar */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"}`}>
        <div className="flex justify-between items-center p-5 max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            <span className="text-xl font-black tracking-wider text-cyan-400">DEVSTUDIO.</span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-medium">
            <a href="#stats" className="hover:text-cyan-400 transition hidden md:block">Statistik</a>
            <a href="#market" className="hover:text-cyan-400 transition hidden md:block">Live Market</a>
            <a href="#kalkulator" className="hover:text-cyan-400 transition hidden md:block">Kalkulator</a>
            <a href="#portofolio" className="hover:text-cyan-400 transition hidden md:block">Portofolio</a>
            <Link href="/tentang" className="text-cyan-400 font-bold hover:underline">
              Profil Dev →
            </Link>

            {/* Toggle Dark/Light Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border text-xs ${darkMode ? "bg-slate-900 border-slate-800 text-yellow-400" : "bg-slate-100 border-slate-300 text-slate-800"}`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              Konsultasi
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6 space-y-6">
        <div className={`inline-flex items-center space-x-2 border px-4 py-1.5 rounded-full ${darkMode ? "bg-slate-900 border-cyan-500/30" : "bg-slate-100 border-cyan-500/50"}`}>
          <span className="text-cyan-400 text-xs font-mono">🚀 Powered by Next.js & TypeScript</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-slate-200 to-indigo-400">
          Solusi Web Modern, Dashboard API & Bot Automation
        </h1>
        <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Membangun arsitektur web berperforma tinggi, responsif, aman, dan terintegrasi dengan sistem modern untuk meningkatkan skalabilitas bisnis Anda.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a href="#kalkulator" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition text-xs shadow-lg shadow-cyan-500/20">
            Kalkulasi Estimasi Biaya
          </a>
          <a href="#market" className={`border hover:border-cyan-500 font-semibold px-6 py-3 rounded-xl transition text-xs ${darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300 text-slate-800"}`}>
            Lihat Live Tracker API
          </a>
        </div>
      </section>

      {/* Section Metrics / Stats */}
      <section id="stats" className="max-w-5xl mx-auto px-6 mb-12">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl border ${darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"}`}>
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-black text-cyan-400">99.9%</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Uptime Performance</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-black text-cyan-400">&lt; 1s</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Speed Loading</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-black text-cyan-400">100+</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">API Integration</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-black text-cyan-400">24/7</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Automation Bot</p>
          </div>
        </div>
      </section>

      {/* Live Market Crypto Section */}
      <section id="market" className="max-w-6xl mx-auto p-6 my-6">
        <div className={`border rounded-3xl p-6 space-y-4 ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"}`}>
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                🌐 Live Crypto Market API Tracker
              </h3>
              <p className="text-xs text-slate-400">Bukti integrasi API real-time pada platform web kami</p>
            </div>
            <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-3 py-1 rounded-full font-mono">
              Live Data
            </span>
          </div>

          {loadingCrypto ? (
            <div className="text-center py-6 text-xs text-slate-500 animate-pulse">Memuat data pasar real-time...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border flex justify-between items-center ${darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">BITCOIN (BTC)</span>
                  <span className="text-lg font-black">Rp {cryptoData?.bitcoin.idr.toLocaleString("id-ID")}</span>
                </div>
                <span className={`text-xs font-bold ${cryptoData?.bitcoin.idr_24h_change! >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {cryptoData?.bitcoin.idr_24h_change.toFixed(2)}%
                </span>
              </div>

              <div className={`p-4 rounded-2xl border flex justify-between items-center ${darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">ETHEREUM (ETH)</span>
                  <span className="text-lg font-black">Rp {cryptoData?.ethereum.idr.toLocaleString("id-ID")}</span>
                </div>
                <span className={`text-xs font-bold ${cryptoData?.ethereum.idr_24h_change! >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {cryptoData?.ethereum.idr_24h_change.toFixed(2)}%
                </span>
              </div>

              <div className={`p-4 rounded-2xl border flex justify-between items-center ${darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div>
                  <span className="text-xs text-slate-400 font-bold block">SOLANA (SOL)</span>
                  <span className="text-lg font-black">Rp {cryptoData?.solana.idr.toLocaleString("id-ID")}</span>
                </div>
                <span className={`text-xs font-bold ${cryptoData?.solana.idr_24h_change! >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {cryptoData?.solana.idr_24h_change.toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Kalkulator Biaya Lanjutan */}
      <section id="kalkulator" className={`max-w-3xl mx-auto p-8 my-12 rounded-3xl border space-y-6 shadow-2xl ${darkMode ? "bg-slate-900/90 border-cyan-500/30" : "bg-white border-cyan-500/50"}`}>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-cyan-400">🧮 Kalkulator Estimasi Projek Interaktif</h3>
          <p className="text-xs text-slate-400">Atur parameter dan lihat perkiraan biaya pembuatan secara akurat</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold mb-2">Tipe Layanan Website:</label>
            <select
              value={layanan}
              onChange={(e) => setLayanan(e.target.value)}
              className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500 ${darkMode ? "bg-slate-950 border-slate-700 text-cyan-300" : "bg-slate-50 border-slate-300 text-slate-800"}`}
            >
              <option value="landing">Landing Page UMKM (Rp 500.000)</option>
              <option value="profil">Web Profil / Portofolio (Rp 750.000)</option>
              <option value="dashboard">Dashboard Analytics / Web3 (Rp 1.500.000)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span>Jumlah Halaman:</span>
              <span className="text-cyan-400 font-bold">{halaman} Halaman</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={halaman}
              onChange={(e) => setHalaman(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className={`space-y-3 p-4 rounded-xl border text-xs ${darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="bot"
                checked={butuhBot}
                onChange={(e) => setButuhBot(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
              <label htmlFor="bot" className="cursor-pointer">
                Integrasi Bot Telegram / Automation (+ Rp 500.000)
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="desain"
                checked={desainCustom}
                onChange={(e) => setDesainCustom(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
              <label htmlFor="desain" className="cursor-pointer">
                Kustomisasi Desain UI/UX Figma Eksklusif (+ Rp 300.000)
              </label>
            </div>
          </div>

          <div className="p-5 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-center space-y-1">
            <p className="text-xs text-slate-400">Estimasi Total Biaya Projek:</p>
            <p className="text-3xl font-black text-cyan-400">Rp {hitungHarga()}</p>
          </div>

          <a
            href={`https://wa.me/6281234567890?text=Halo%20DevStudio,%20saya%20tertarik%20dengan%20estimasi%20layanan%20Rp%20${hitungHarga()}`}
            target="_blank"
            className="block text-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-cyan-500/20"
          >
            Pesan Sekarang via WhatsApp
          </a>
        </div>
      </section>

      {/* Portofolio Showcase */}
      <section id="portofolio" className="max-w-6xl mx-auto p-6 my-12">
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-2xl font-bold text-cyan-400">Showcase Portofolio</h3>
          <p className="text-xs text-slate-400">Saring dan jelajahi hasil karya teknologi kami</p>

          <div className="flex justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition ${activeTab === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "border text-slate-400"}`}
            >
              Semua Projek
            </button>
            <button
              onClick={() => setActiveTab("webapp")}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition ${activeTab === "webapp" ? "bg-cyan-500 text-slate-950 font-bold" : "border text-slate-400"}`}
            >
              Web App
            </button>
            <button
              onClick={() => setActiveTab("crypto")}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition ${activeTab === "crypto" ? "bg-cyan-500 text-slate-950 font-bold" : "border text-slate-400"}`}
            >
              Crypto / Web3
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div key={p.id} className={`border hover:border-cyan-500/50 rounded-2xl p-6 space-y-3 transition duration-300 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-1 rounded-full font-mono uppercase">
                {p.category}
              </span>
              <h4 className="text-lg font-bold">{p.title}</h4>
              <p className="text-xs text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Contact / Booking Form */}
      <section className="max-w-3xl mx-auto p-8 my-12 rounded-3xl border border-cyan-500/30 space-y-4">
        <h3 className="text-2xl font-bold text-center text-cyan-400">📩 Konsultasi Projek Instan</h3>
        <p className="text-xs text-center text-slate-400">Kirimkan pesan dan tim DevStudio akan segera menghubungi Anda</p>
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
          <input
            type="text"
            placeholder="Nama Lengkap Anda"
            value={namaKlien}
            onChange={(e) => setNamaKlien(e.target.value)}
            className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-cyan-500 ${darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
          />
          <textarea
            rows={3}
            placeholder="Deskripsikan kebutuhan website atau fitur yang ingin dibuat..."
            value={pesanKlien}
            onChange={(e) => setPesanKlien(e.target.value)}
            className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-cyan-500 ${darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition"
          >
            Kirim Konsultasi
          </button>
        </form>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-3xl mx-auto p-6 my-12 space-y-4">
        <h3 className="text-2xl font-bold text-center text-cyan-400 mb-6">Pertanyaan Umum (FAQ)</h3>

        {[
          { q: "Berapa lama proses pengerjaan website?", a: "Pengerjaan standar landing page memakan waktu 2-4 hari kerja. Untuk dashboard interaktif atau bot automation membutuhkan 5-7 hari." },
          { q: "Teknologi apa yang digunakan?", a: "Kami menggunakan Next.js, TypeScript, dan Tailwind CSS untuk menjamin kecepatan, keandalan, dan SEO web yang optimal." },
          { q: "Apakah website bisa dibuka di HP?", a: "Tentu saja! Seluruh tampilan web yang kami bangun bersifat 100% responsif untuk semua ukuran layar (Mobile, Tablet, Desktop)." },
        ].map((faq, index) => (
          <div key={index} className={`border rounded-2xl overflow-hidden ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full p-4 text-left text-sm font-semibold flex justify-between items-center hover:text-cyan-400"
            >
              <span>{faq.q}</span>
              <span>{openFaq === index ? "−" : "+"}</span>
            </button>
            {openFaq === index && (
              <div className="p-4 pt-0 text-xs text-slate-400 border-t border-slate-800/50 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-10 mt-12 border-t border-slate-800 text-xs text-slate-500">
        © 2026 DevStudio - Built with Next.js & TypeScript
      </footer>
    </div>
  );
}