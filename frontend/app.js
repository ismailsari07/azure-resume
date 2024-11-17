// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

async function updateVisitorCount() {
  // The Azure Function URL and key will be dynamically replaced via GitHub Actions
  const proxyUrl = "__AZURE_FUNCTION_URL__?code=__AZURE_FUNCTION_KEY__";

  try {
    // Call the proxy function to fetch the visitor count
    const response = await fetch(proxyUrl);
    if (response.ok) {
      const data = await response.json();
      const visitorElement = document.getElementById("visitor-count");
      if (visitorElement) {
        visitorElement.innerText = data.count;
      } else {
        console.error("Visitor count element not found in the DOM.");
      }
    } else {
      console.error("Error fetching visitor count:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to update the visitor count on page load
updateVisitorCount();
