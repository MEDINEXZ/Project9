const API_BASE =
  import.meta?.env?.VITE_VEHICLES_API_BASE ||
  "https://the-vehicles-api.herokuapp.com";

const mockBrands = [
  { id: 17, brand: "BMW" },
  { id: 36, brand: "Acura" },
  { id: 55, brand: "Toyota" },
  { id: 72, brand: "Ford" },
  { id: 81, brand: "Honda" },
];

const mockTypes = [
  { id: 1, type: "Car" },
  { id: 2, type: "Motorcycle" },
  { id: 3, type: "Truck" },
];

let nextModelId = 1000;
const M = (brandId, typeId, model) => {
  const brand = mockBrands.find((b) => b.id === brandId);
  const type = mockTypes.find((t) => t.id === typeId);
  return { id: nextModelId++, model, brand, type };
};

const mockModels = [
  M(17, 1, "3 Series"),
  M(17, 1, "5 Series"),
  M(17, 1, "X3"),
  M(17, 1, "X5"),
  M(36, 1, "Integra"),
  M(36, 1, "MDX"),
  M(55, 1, "Corolla"),
  M(55, 1, "Camry"),
  M(55, 3, "Tacoma"),
  M(72, 1, "Mustang"),
  M(72, 3, "F-150"),
  M(81, 1, "Civic"),
  M(81, 1, "Accord"),
  M(81, 2, "CBR500R"),
];

function mockModelsByBrandId(brandId) {
  const id = Number(brandId);
  return mockModels.filter((m) => m.brand?.id === id);
}

function mockModelsByTypeId(typeId) {
  const id = Number(typeId);
  return mockModels.filter((m) => m.type?.id === id);
}

async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

async function fetchWithRetry(url, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchWithTimeout(url, 8000);
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  throw lastErr;
}

async function getJson(path, { retry = 2 } = {}) {
  const url = `${API_BASE}${path}`;
  let res;

  try {
    res = await fetchWithRetry(url, retry);
  } catch (e) {
    return fallbackMock(path);
  }

  if (!res.ok) {
    return fallbackMock(path);
  }

  try {
    return await res.json();
  } catch {
    return fallbackMock(path);
  }
}

function fallbackMock(path) {
  if (path === "/brands") return mockBrands;
  if (path === "/types") return mockTypes;
  if (path.startsWith("/models?")) {
    const q = path.split("?", 2)[1] || "";
    const params = new URLSearchParams(q);
    const brandId = params.get("brandId");
    const typeId = params.get("typeId");
    if (brandId) return mockModelsByBrandId(brandId);
    if (typeId) return mockModelsByTypeId(typeId);
    return [];
  }
  return [];
}

export const vehiclesApi = {
  brands: () => getJson(`/brands`, { retry: 2 }),
  types: () => getJson(`/types`, { retry: 2 }),
  modelsByBrandId: (brandId) =>
    getJson(`/models?brandId=${encodeURIComponent(brandId)}`, { retry: 2 }),
  modelsByTypeId: (typeId) =>
    getJson(`/models?typeId=${encodeURIComponent(typeId)}`, { retry: 2 }),
};

export { API_BASE };
