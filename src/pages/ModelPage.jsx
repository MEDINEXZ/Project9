import { useLoaderData, Link } from "react-router-dom";
import { vehiclesApi, API_BASE } from "../api/vehiclesApi";

export async function modelsLoader({ params }) {
  if (params.brandId) {
    const brandId = params.brandId;
    const models = await vehiclesApi.modelsByBrandId(brandId);

    if (!Array.isArray(models) || models.length === 0) {
      throw new Response(`Models not found for brandId=${brandId}`, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const brand = models[0]?.brand;
    return { brandId, brand, models, brands: null };
  }

  const brands = await vehiclesApi.brands();
  brands.sort((a, b) => a.brand.localeCompare(b.brand));
  return { brands: brands.slice(0, 20), brandId: null, brand: null, models: null };
}

export default function ModelPage() {
  const { brandId, brand, models, brands } = useLoaderData();

  if (brandId) {
    return (
      <div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Models</h1>
        <ul>
          {models.slice(0, 50).map((m) => (
            <li key={m.id}>
              {m.model}
            </li>
          ))}
        </ul>

        {models.length > 50 && <p>Показано перші 50 із {models.length}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Models</h1>

      <ul>
        {brands.map((b) => (
          <li key={b.id}>
            <Link to={`/models/${b.id}`}>Models for {b.brand}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
