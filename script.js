document.addEventListener("DOMContentLoaded", () => {

  const shortenBtn = document.getElementById("shortenBtn");

  // 🛑 If button doesn't exist, stop script (analytics page safe)
  if (!shortenBtn) return;

  shortenBtn.addEventListener("click", async () => {
    console.log("Button clicked");

    const longUrlInput = document.getElementById("longUrl");
    const customCodeInput = document.getElementById("customCode");
    const resultDiv = document.getElementById("result");
    const loader = document.getElementById("loader");

    if (!longUrlInput || !resultDiv || !loader) return;

    const longUrl = longUrlInput.value;
    const customCode = customCodeInput ? customCodeInput.value : null;

    if (!longUrl) {
      alert("Please enter a URL");
      return;
    }

    resultDiv.innerHTML = "";
    loader.classList.remove("hidden");

    try {
      const response = await fetch("https://url-shortener-backend-4a8d.onrender.com/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: longUrl,
          customCode: customCode || null
        })
      });

      const data = await response.json();
      loader.classList.add("hidden");

      if (data.shortUrl) {

        // ✅ Extract short code
        const shortCode = data.shortUrl.split("/").pop();

        resultDiv.innerHTML = `
          <p>Your Short Link:</p>
          <a id="shortLink" href="https://url-shortener-backend-4a8d.onrender.com/${shortCode}" target="_blank">
            https://url-shortener-backend-4a8d.onrender.com/${shortCode}
          </a>
          <button id="copyBtn" class="copy-btn">Copy</button>
          <button id="analyticsBtn" class="copy-btn">Analytics</button>
        `;

        document.getElementById("copyBtn")
          .addEventListener("click", () => {
            navigator.clipboard.writeText(`https://url-shortener-backend-4a8d.onrender.com/${shortCode}`)
              .then(() => alert("Link copied!"));
          });

        document.getElementById("analyticsBtn")
          .addEventListener("click", () => {
            window.location.href = `/analytics.html?code=${shortCode}`;
          });

      } else {
        resultDiv.innerText = data.error || "Error creating short URL";
      }

    } catch (err) {
      loader.classList.add("hidden");
      console.error(err);
      alert("Something went wrong");
    }
  });

});