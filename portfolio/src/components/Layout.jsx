import { Link } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div>
            <header style={headerStyle}>
                <div style={headerInner}>
                <div style={{ fontWeight: 700 }}>Samzei</div>

                <nav style={{ display: "flex", gap: 14 }}>
                    <Link to="/" style={navLink}>Home</Link>
                    <Link to="/projects" style={navLink}>Projects</Link>
                </nav>
                </div>
            </header>

            <div style={pageWrap}>
                {children}
            </div>
        </div>
    );
}

const headerStyle = {
  position: "sticky",
  top: 0,
  backdropFilter: "blur(8px)",
  background: "rgba(20,20,20,0.7)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  zIndex: 10,
};

const headerInner = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "14px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const navLink = {
  color: "white",
  textDecoration: "none",
  opacity: 0.85,
};

const pageWrap = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "0 24px",
};