import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import SearchForm from "./SearchForm.jsx";

const mockMakes = [
  { make_id: "1", make_display: "BMW", make_country: "Germany" },
  { make_id: "2", make_display: "Toyota", make_country: "Japan" },
  { make_id: "3", make_display: "Ford", make_country: "USA" },
  { make_id: "4", make_display: "Honda", make_country: "Japan" },
  { make_id: "5", make_display: "Mercedes-Benz", make_country: "Germany" },
  { make_id: "6", make_display: "Audi", make_country: "Germany" },
  { make_id: "7", make_display: "Volkswagen", make_country: "Germany" },
  { make_id: "8", make_display: "Nissan", make_country: "Japan" },
  { make_id: "9", make_display: "Chevrolet", make_country: "USA" },
  { make_id: "10", make_display: "Hyundai", make_country: "South Korea" },
];

export async function listLoader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (query) {
    const filtered = mockMakes.filter((make) =>
      make.make_display.toLowerCase().includes(query.toLowerCase()) ||
      (make.make_country && make.make_country.toLowerCase().includes(query.toLowerCase()))
    );
    return filtered;
  }

  try {
    const apiUrl = "http://www.carqueryapi.com/api/0.3/";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Failed to fetch car makes" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return data.Makes || mockMakes;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    return mockMakes;
  }
}

export default function ResourceListPage() {
  const makes = useLoaderData();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div>
      <h1>Car Makes</h1>
      
      <SearchForm />

      {query && (
        <p style={{ marginBottom: 16, color: "#6b7280" }}>
          Результати пошуку для: <strong>"{query}"</strong>
        </p>
      )}

      {makes.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: 16 }}>
          Нічого не знайдено. Спробуйте інший запит.
        </p>
      ) : (
        <ul>
          {makes.slice(0, 20).map((m) => (
            <li key={m.make_id}>
              <Link to={`/resources/${m.make_id}`}>
                <h3>{m.make_display}</h3>
              </Link>
              <p>Country: {m.make_country || "—"}</p>
            </li>
          ))}
        </ul>
      )}

      {makes.length > 20 && (
        <p style={{ marginTop: 16, color: "#6b7280" }}>
          Показано перші 20 із {makes.length} результатів
        </p>
      )}
    </div>
  );
}
