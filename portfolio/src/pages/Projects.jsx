import { useEffect, useMemo, useState } from "react";
import { fetchRepos } from "../services/github";

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

        console.log("ENV username =", username);
        console.log("Request URL =", `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);


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

  return (
    <div style={{ padding: 24 }}>
      <h1>Projects</h1>
      <p>GitHub: <a href={`https://github.com/${username}`}>{username}</a></p>

      <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
        {featured.map(repo => (
          <article key={repo.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
            <h3 style={{ margin: 0 }}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
            </h3>

            <p style={{ marginTop: 8 }}>
              {repo.description || "No description yet."}
            </p>

            <small>
              {repo.language ? `Tech: ${repo.language} • ` : ""}
              {repo.stargazers_count} • Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </small>

            {repo.homepage && (
              <div style={{ marginTop: 8 }}>
                Demo: <a href={repo.homepage} target="_blank" rel="noreferrer">{repo.homepage}</a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
