import { useNavigate } from "react-router-dom";

export default function AdminArea() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Admin Area</h1>
      <p style={{ fontSize: 16, color: "#374151", marginBottom: 16 }}>
        Ви знаходитесь в адмін зоні.
      </p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Вийти
      </button>
    </div>
  );
}
