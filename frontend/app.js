document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

async function updateVisitorCount() {
  // The URL and Function Key will be inserted by GitHub Actions during deployment
  const functionUrl = process.env.AZURE_FUNCTION_URL; // Use GitHub Actions to inject this secret
  const functionKey = process.env.AZURE_FUNCTION_KEY; // Use GitHub Actions to inject this secret

  try {
    const response = await fetch(`${functionUrl}?code=${functionKey}`);
    if (response.ok) {
      const data = await response.json();
      document.getElementById("visitor-count").innerText = data.count; // Adjust the ID if needed
    } else {
      console.error("Error fetching visitor count");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to update the visitor count on page load
updateVisitorCount();
