export async function getRecommendations(username, language) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/recommend/${username}?language=${language}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
}

export async function explainIssue(title, body) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/explain`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to explain issue");
  }

  return res.json();
}