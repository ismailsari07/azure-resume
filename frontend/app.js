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
  // URL of the VisitorCounterProxy function
  const proxyUrl = "https://<https://resume-counter-app.azurewebsites.net/api/VisitorCounterProxy?code=jH5atoM3ASAUsq7CYBTkbYEf3-x0WZzxGh0hBi4opGWfAzFumCELXA%3D%3D"; // Replace with your actual function app name

  try {
    // Call the proxy function to fetch the visitor count
    const response = await fetch(proxyUrl);
    if (response.ok) {
      const data = await response.json();
      document.getElementById("visitor-count").innerText = data.count; // Adjust the ID if needed
    } else {
      console.error("Error fetching visitor count:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to update the visitor count on page load
updateVisitorCount();
