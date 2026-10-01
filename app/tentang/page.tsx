"use client";

import Link from "next/link";

export default function TentangPage() {
  const skills = [
    { name: "Next.js / React", level: "Advanced" },
    { name: "TypeScript / JavaScript", level: "Advanced" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "PHP / CodeIgniter 4", level: "Intermediate" },
    { name: "MySQL / Oracle PL/SQL", level: "Intermediate" },
    { name: "API & Web3 Data Integration", level: "Advanced" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Back */}
        <Link
          href="/"
          className="inline-flex items-center text-xs text-cyan-400 hover:underline gap-1"
        >
          ← Kembali ke Beranda
        </Link>

        {/* Header Profil */}
        <div className="border-b border-slate-800 pb-8 space-y-4">
          <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-3 py-1 rounded-full font-mono uppercase">
            Lead Web Engineer / Full-Stack Developer
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white">
            Tentang Developer
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Spesialis dalam pengembangan aplikasi web modern, manajemen basis data, sistem responsif, serta integrasi API real-time dan otomasi bot.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyan-400">⚡ Tech Stack & Keahlian Utama</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                <span className="text-xs font-bold text-slate-200">{s.name}</span>
                <span className="text-[10px] bg-slate-950 text-cyan-400 border border-slate-800 px-2 py-0.5 rounded-md font-mono">
                  {s.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Keunggulan & Layanan */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-white">🎯 Mengapa Memilih DevStudio?</h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Kode Clean & Terstruktur:</strong> Menggunakan standar Next.js App Router dan TypeScript ketat.</li>
            <li><strong>Desain Responsif:</strong> Tampilan dioptimalkan untuk perangkat seluler (*Mobile-First*) hingga desktop.</li>
            <li><strong>Performa Tinggi:</strong> Memuat cepat dengan pengoptimalan SEO & *asset rendering*.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}