import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";


export default function App() {
  return (
    <HashRouter>
      <nav style={{ padding: 16, display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </HashRouter>
  );
}
