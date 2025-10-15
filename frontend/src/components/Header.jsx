// frontend/src/components/Header.jsx
export default function Header() {
  return (
    <header className="site-header" style={{ textAlign: 'center', background: '#2f7a4a', color: '#fff', padding: '18px' }}>
      <img
        src="/comurg.jpg"
        alt="Logo Comurg"
        style={{ width: 48, height: 48, objectFit: 'contain', display: 'block', margin: '0 auto 8px' }}
        onError={(e) => { e.target.style.display = 'none'; console.warn('Logo não carregou:', e.target.src); }}
      />
      <h1 style={{ margin: 0 }}>Viveiros ® Comurg</h1>
      <p style={{ margin: 0 }}>Sustentabilidade e Meio Ambiente</p>
    </header>
  );
}
