import { useEffect, useMemo, useState } from "react";
import { fetchRepos } from "../services/github";
import { projectMeta } from "../data/projectMeta";

export default function Projects() {
  const username = import.meta.env.VITE_GITHUB_USER;

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const data = await fetchRepos(username);
        if (!ignore) setRepos(data);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load repos");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [username]);

  // Filter out stuff you probably don’t want on a portfolio
const featuredNames = (import.meta.env.VITE_FEATURED_REPOS || "")
  .split(",")
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

  const featuredSet = useMemo(
    () => new Set(featuredNames), [featuredNames]
  );


const featured = useMemo(() => {
  const clean = repos.filter(r => !r.fork && !r.archived);
  if (!featuredNames.length) return clean;

  const set = new Set(featuredNames);
  const picked = clean.filter(r => set.has(r.name.toLowerCase()));
  const rest = clean.filter(r => !set.has(r.name.toLowerCase()));

  return [...picked, ...rest];
}, [repos, featuredNames]);


  if (loading) return <p>Loading projects…</p>;
  if (err) return <p>Error: {err}</p>;

  const isNarrow = window.innerwidth < 800;

  return (
    <div>
      <h1>Projects</h1>
      <p>GitHub: <a href={`https://github.com/${username}`}>{username}</a></p>

      <div
        style={{
          display: "grid",
          gap: 16,
          marginTop: 16,
          gridTemplateColumns: isNarrow ? "1fr" : "repeat(2, minmax(0, 1fr))",
        }}
      >
        {featured.map((repo) => {
          const isFeatured = featuredSet.has(repo.name.toLowerCase());
          const demoUrl = projectMeta[repo.name]?.demo || repo.homepage;

          return (
            <article key={repo.id} style={{
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: 16,
              padding: 18,
              background: "rgba(255, 255, 255, 0.03)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minHeight: 180,
            }}>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none"}}>
                  {repo.name}
                </a>

                {isFeatured && <span style={badgeStyle}>Featured</span>}
              </h3>

              <p style={{ marginTop: 8 }}>
                {projectMeta[repo.name]?.description || repo.description || "No description yet."}
              </p>

              <small>
                {repo.language ? `Tech: ${repo.language} • ` : ""}
              ⭐ {repo.stargazers_count} • Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </small>

              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <a href={repo.html_url} target="_blank" rel="noreferrer" style={btnSmall}>
                  GitHub
                </a>

                {demoUrl && (
                  <a href={demoUrl} target="_blank" rel="noreferrer" style={btnSmallOutline}>
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          );
        })}

      </div>
    </div>
  );
}

const badgeStyle = {
  marginLeft: 10,
  padding: "3px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.2)",
  fontSize: 12,
  opacity: 0.85,
};

const btnSmall = {
  padding: "8px 12px",
  borderRadius: 12,
  border: "1px solid #444",
  textDecoration: "none",
  color: "white",
  background: "#222",
  fontSize: 14,
};

const btnSmallOutline = {
  ...btnSmall,
  background: "transparent",
};

