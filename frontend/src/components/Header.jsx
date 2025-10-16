import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-green-800 text-white flex-wrap">
      <div className="flex items-center gap-3">
        <img
          src="/comurg.jpg"
          alt="logo"
          className="w-10 h-10 rounded-full bg-white p-1"
        />
        <div>
          <h1 className="font-bold text-lg">Viveiros ® Comurg</h1>
          <p className="text-sm opacity-80">Sustentabilidade e Meio Ambiente</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        <a
          href="https://wa.me/5562999569870?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20o%20Viveiro%20Comurg."
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
        >
          WhatsApp
        </a>

        <Link
          to="/admin"
          className="bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-900 transition"
        >
          Área Administrativa
        </Link>
      </div>
    </header>
  );
}
