async function loadAnalytics() {
  const params = new URLSearchParams(window.location.search);
  const shortCode = params.get("code");

  if (!shortCode) {
    alert("No short code provided");
    return;
  }

  document.getElementById("code").innerText = shortCode;

  try {
    const response = await fetch(`/api/analytics/${shortCode}`);
    const data = await response.json();

    if (data.error) {
      alert("Link not found");
      return;
    }

    document.getElementById("originalUrl").innerText = data.original_url;
    document.getElementById("clicks").innerText = data.clicks;
    document.getElementById("createdAt").innerText =
      new Date(data.created_at).toLocaleString();

  } catch (error) {
    console.error(error);
    alert("Error loading analytics");
  }
}

loadAnalytics();