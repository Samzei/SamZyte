export default function Home() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <section style={{ marginTop: 40 }}>
        <h1 style={{ fontSize: 42, margin: 0 }}>Samzei</h1>
        <p style={{ fontSize: 18, opacity: 0.85, marginTop: 10 }}>
          Computer Science student building web apps with React and Node.js.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
          <a
            href="https://github.com/Samzei"
            target="_blank"
            rel="noreferrer"
            style={btnStyle}
          >
            GitHub
          </a>
          <a href="#/projects" style={btnStyleOutline}>
            View Projects
          </a>
        </div>
      </section>

      <section style={{ marginTop: 50 }}>
        <h2 style={{ marginBottom: 12 }}>Skills</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["React", "JavaScript", "Node.js", "Git/GitHub", "HTML/CSS", "Java"].map((s) => (
            <span key={s} style={chipStyle}>{s}</span>
          ))}
        </div>
      </section>

        <section style={{ marginTop: 50 }}>
            <h2 style={{ marginBottom: 12 }}>About</h2>
            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                I'm a final-year Computer Science student based in London. I enjoy building
                clean, user-friendly web apps and improving them with feedback. I'm currently
                working on projects involving React, APIs, and data-driven features.
            </p>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginTop: 16 }}>
                <div style={cardStyle}>
                <div style={cardTitle}>Focus</div>
                <div style={cardValue}>Front-end + APIs</div>
                </div>
                <div style={cardStyle}>
                <div style={cardTitle}>Tech</div>
                <div style={cardValue}>React • Node • Git</div>
                </div>
                <div style={cardStyle}>
                <div style={cardTitle}>Goal</div>
                <div style={cardValue}>Junior Dev roles</div>
                </div>
            </div>
        </section>

    </main>
  );
}

const btnStyle = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #444",
  textDecoration: "none",
  color: "white",
  background: "#222",
};

const btnStyleOutline = {
  ...btnStyle,
  background: "transparent",
};

const chipStyle = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #333",
  fontSize: 14,
  opacity: 0.9,
};

const cardStyle = {
  border: "1px solid #333",
  borderRadius: 16,
  padding: 14,
  background: "rgba(255,255,255,0.03)",
};

const cardTitle = {
  fontSize: 12,
  opacity: 0.7,
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 1,
};

const cardValue = {
  fontSize: 16,
  fontWeight: 600,
};

