import { useLoaderData, Link } from "react-router-dom";
import { vehiclesApi } from "../api/vehiclesApi";

export async function brandLoader({ params }) {
  const brands = await vehiclesApi.brands();
  brands.sort((a, b) => a.brand.localeCompare(b.brand));

  if (params.brandName) {
    const brandName = decodeURIComponent(params.brandName);
    const brand = brands.find(
      (b) => b.brand.toLowerCase() === brandName.toLowerCase()
    );

    if (!brand) {
      throw new Response(`Brand "${brandName}" not found`, { status: 404 });
    }

    return { brand, brands: null };
  }

  return { brands, brand: null };
}

export default function BrandPage() {
  const { brand, brands } = useLoaderData();

  if (brand) {
    return (
      <div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Brand: {brand.brand}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Brands</h1>

      <ul>
        {brands.map((b) => (
          <li key={b.id}>
            <Link to={`/brands/${encodeURIComponent(b.brand)}`}>{b.brand}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
