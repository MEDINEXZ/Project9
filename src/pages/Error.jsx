import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Помилка";
  let message = "Щось пішло не так.";
  let details = null;

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || message;
    if (typeof error.data === "string") message = error.data;
    details = {
      type: "route",
      status: error.status,
      statusText: error.statusText,
      data: error.data,
    };
  } else if (error instanceof Error) {
    message = error.message;
    details = {
      type: "error",
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>{title}</h1>
      <p style={{ color: "crimson", fontSize: 16 }}>{message}</p>

      {details && (
        <pre
          style={{
            marginTop: 12,
            padding: 12,
            background: "#111827",
            color: "#e5e7eb",
            borderRadius: 8,
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {JSON.stringify(details, null, 2)}
        </pre>
      )}

      <p style={{ marginTop: 16 }}>
        <Link to="/">← На головну</Link>
      </p>
    </div>
  );
}