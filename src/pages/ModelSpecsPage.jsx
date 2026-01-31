import { useLoaderData, Link } from "react-router-dom";
import { vehiclesApi } from "../api/vehiclesApi";

export async function specsLoader({ params }) {
  const brandId = params.brandId;
  const models = await vehiclesApi.modelsByBrandId(brandId);

  if (!Array.isArray(models) || models.length === 0) {
    throw new Response(`Specs not found for brandId=${brandId}`, { status: 404 });
  }

  const brand = models[0]?.brand;
  const byType = new Map();
  for (const m of models) {
    const t = m.type?.type || "Unknown";
    byType.set(t, (byType.get(t) || 0) + 1);
  }

  const typeStats = Array.from(byType.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));

  return {
    brandId,
    brand,
    totalModels: models.length,
    typeStats,
    sample: models.slice(0, 10),
  };
}

export default function ModelSpecsPage() {
  const { brandId, brand, totalModels, typeStats, sample } = useLoaderData();

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>
        Specs (summary) for brandId: {brandId}
      </h1>

      <p>
        Brand: <b>{brand?.brand ?? "—"}</b>
      </p>
      <p>
        Total models: <b>{totalModels}</b>
      </p>

      <h3 style={{ marginTop: 18 }}>Models by type</h3>
      <ul>
        {typeStats.map((s) => (
          <li key={s.type}>
            {s.type}: <b>{s.count}</b>
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: 18 }}>Sample models</h3>
      <ol>
        {sample.map((m) => (
          <li key={m.id}>
            {m.model} (type: {m.type?.type || "Unknown"})
          </li>
        ))}
      </ol>

      <p style={{ marginTop: 16 }}>
        <Link to={`/models/${brandId}`}>← Назад до моделей</Link>
      </p>
    </div>
  );
}
