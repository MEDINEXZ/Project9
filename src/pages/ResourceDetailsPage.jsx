import { useLoaderData, Link } from "react-router-dom";

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

export async function detailsLoader({ params }) {
  const { resourceId } = params;
  
  try {
    const apiUrl = `http://www.carqueryapi.com/api/0.3/?cmd=getMakes&make_id=${resourceId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Failed to fetch resource details" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return data.Makes[0];
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    return mockMakes.find(m => m.make_id === resourceId) || mockMakes[0];
  }
}

export default function ResourceDetailsPage() {
  const resource = useLoaderData();

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>{resource.make_display}</h1>
      
      <div style={{ marginBottom: 24 }}>
        <p style={{ marginBottom: 8 }}>
          <strong>ID:</strong> {resource.make_id}
        </p>
        <p style={{ marginBottom: 8 }}>
          <strong>Country:</strong> {resource.make_country || "—"}
        </p>
        <p style={{ marginBottom: 8 }}>
          <strong>Make:</strong> {resource.make_display}
        </p>
        {resource.make_is_common && (
          <p style={{ marginBottom: 8 }}>
            <strong>Common:</strong> {resource.make_is_common}
          </p>
        )}
      </div>
      
      <p style={{ marginTop: 16 }}>
        <Link to="/resources">← Назад до списку</Link>
      </p>
    </div>
  );
}
