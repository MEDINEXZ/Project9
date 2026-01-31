export default function Welcome() {
  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Каталог автомобілів</h1>
      <p style={{ fontSize: 16, color: "#374151", maxWidth: 600 }}>Вітаю у “Каталог автомобілів”.</p>

      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
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
    </div>
  );
}
