import { NavLink, Outlet, useNavigation } from "react-router-dom";


const HEADER_HEIGHT = 64;

const linkStyle = ({ isActive }) => ({
    marginLeft: 24,
    textDecoration: "none",
    fontWeight: 500,
    color: isActive ? "#ffffff" : "#e5e7eb",
    borderBottom: isActive ? "2px solid #ffffff" : "none",
    paddingBottom: 4,
});

export default function Root() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#3f51b5",
            zIndex: 9999,
            animation: "loading 1s ease-in-out infinite",
          }}
        >
          <style>
            {`
              @keyframes loading {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
              }
            `}
          </style>
        </div>
      )}

      <header style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          background: "#3f51b5",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}>
        <nav
          style={{
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <NavLink to="/" end style={linkStyle}>Home</NavLink>
            <NavLink to="/brands" style={linkStyle}>Brands</NavLink>
            <NavLink to="/models" style={linkStyle}>Models</NavLink>
            <NavLink to="/resources" style={linkStyle}>Resources</NavLink>
          </div>
          <NavLink to="/about" style={linkStyle}>About</NavLink>
        </nav>
      </header>

      <main
        style={{
          paddingTop: HEADER_HEIGHT + 24,
          maxWidth: 1100,
          margin: "0 auto",
          paddingLeft: 16,
          paddingRight: 16,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
