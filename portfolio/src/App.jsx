import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Projects from "./pages/Projects";


export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 16, display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div style={{ padding: 24 }}><h1>Samzei Portfolio</h1></div>} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
