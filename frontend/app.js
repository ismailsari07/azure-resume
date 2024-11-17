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
  const proxyUrl = "__AZURE_FUNCTION_URL__&code=__AZURE_FUNCTION_KEY__";

  console.log("Fetching visitor count from:", proxyUrl); // Debug log

  try {
    // Call the proxy function to fetch the visitor count and increment it
    const response = await fetch(proxyUrl, {
      method: "POST", // Use POST to increment the count
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
    });

    console.log("Azure Function response:", response); // Debug log

    if (response.ok) {
      const data = await response.json();
      console.log("Visitor count data:", data); // Debug log

      const visitorElement = document.getElementById("visitor-count");
      if (visitorElement) {
        visitorElement.innerText = `👁 Views: ${data.visitor_count}`;
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
