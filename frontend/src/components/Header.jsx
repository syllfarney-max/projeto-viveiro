export default function Header() {
  return (
    <header className="flex flex-col items-center bg-green-900 text-white py-4">
      <img src="/comurg.jpg" alt="Logo Comurg" className="w-14 h-14 mb-2 rounded-full" />
      <h1 className="text-2xl font-bold">Viveiros ® Comurg</h1>
      <p>Sustentabilidade e Meio Ambiente</p>
      <a
        href="https://wa.me/5562999569870?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Viveiros%20Comurg"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block bg-white text-green-900 px-3 py-1 rounded"
      >
        WhatsApp
      </a>
    </header>
  );
}
