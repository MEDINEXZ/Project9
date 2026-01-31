import ModalTestWindow from './ModalTestWindow.jsx';
import ResourcesDemo from './ResourcesDemo.jsx';
import FavoritesDemo from './FavoritesDemo.jsx';

export default function Welcome() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 12, textAlign: 'center' }}>Каталог автомобілів</h1>
      <p style={{ fontSize: 16, color: "#374151", textAlign: 'center' }}>Вітаю у “Каталог автомобілів”.</p>

      <div style={{ display: "flex", gap: 12, marginTop: 18, justifyContent: 'center' }}>
        <a
          href="/brands"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            background: "#3f51b5",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Brands
        </a>
        <a
          href="/models"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            background: "#3f51b5",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Models
        </a>
      </div>

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 24, marginBottom: 12, textAlign: 'center' }}>Redux Modal Demo</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ModalTestWindow />
        </div>
      </div>

      <ResourcesDemo />

      <FavoritesDemo />
    </div>
  );
}
