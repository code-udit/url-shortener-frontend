const showToast = () => {
  const toast = document.createElement("div");
  toast.innerText = "Backend is waking up… this may take up to 20 seconds";

  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#ffcc00";
  toast.style.color = "#000";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
};

async function loadAnalytics() {
  const params = new URLSearchParams(window.location.search);
  const shortCode = params.get("code");

  if (!shortCode) {
    alert("No short code provided");
    return;
  }

  document.getElementById("code").innerText = shortCode;

  let timer = setTimeout(() => {
    showToast();
  }, 6000);

  try {
    const response = await fetch(`https://url-shortener-backend-4a8d.onrender.com/api/analytics/${shortCode}`);
    const data = await response.json();

    clearTimeout(timer);

    if (data.error) {
      alert("Link not found");
      return;
    }

    document.getElementById("originalUrl").innerText = data.original_url;
    document.getElementById("clicks").innerText = data.clicks;
    document.getElementById("createdAt").innerText =
      new Date(data.created_at).toLocaleString();

  } catch (error) {
    clearTimeout(timer);
    console.error(error);
    alert("Error loading analytics");
  }
}

loadAnalytics();