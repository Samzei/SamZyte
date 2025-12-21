const API_BASE = "https://api.github.com";
const CACHE_KEY = (u) => `gh_repos_${u}`;
const CACHE_MS = 10 * 60 * 1000; // 10 minutes

export async function fetchRepos(username) {
  // 1) Try cache first
  const cached = sessionStorage.getItem(CACHE_KEY(username));
  if (cached) {
    const { savedAt, data } = JSON.parse(cached);
    if (Date.now() - savedAt < CACHE_MS) return data;
  }

  // 2) Fetch from GitHub
  const url = `${API_BASE}/users/${username}/repos?per_page=100&sort=updated`;

  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

  const data = await res.json();

  // 3) Save cache
  sessionStorage.setItem(CACHE_KEY(username), JSON.stringify({ savedAt: Date.now(), data }));

  return data;
}
