import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between bg-green-700 text-white p-4 sm:flex-row">
      <div className="flex items-center gap-3">
        <img
          src="/comurg.jpg"
          alt="Logo Comurg"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">Viveiros ® Comurg</h1>
          <p className="text-sm opacity-80">Sustentabilidade e Meio Ambiente</p>
        </div>
      </div>

      <div className="flex gap-3 mt-3 sm:mt-0">
        <a
          href="https://wa.me/5562999569870?text=Olá%20Quero%20mais%20informações%20sobre%20o%20Viveiro%20Comurg"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-400 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          WhatsApp
        </a>
        <Link
          to="/admin"
          className="bg-green-800 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Área Administrativa
        </Link>
      </div>
    </header>
  );
}
