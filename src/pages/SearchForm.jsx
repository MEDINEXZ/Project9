import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setQuery("");
    setSearchParams({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук автомобілів..."
          style={{
            padding: "8px 12px",
            fontSize: 16,
            border: "1px solid #d1d5db",
            borderRadius: 6,
            flex: 1,
            maxWidth: 400,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: 16,
            background: "#3f51b5",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Пошук
        </button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: "8px 16px",
              fontSize: 16,
              background: "#6b7280",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Очистити
          </button>
        )}
      </div>
    </form>
  );
}
