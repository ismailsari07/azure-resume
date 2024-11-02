// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// View counter functionality
async function updateViewCount() {
  try {
    const response = await fetch('https://resume-counter-app.azurewebsites.net/api/GetResumeCounter?code=HN0RTNHcUdBNHVTVY-VPcxBfnw36-wvFihyN2_iQ_ih_AzFu-J4Cpg==');
    const data = await response.json();
    document.getElementById('viewCount').textContent = data.count.toLocaleString();
  } catch (error) {
    console.error('Error updating view count:', error);
  }
}

// Call updateViewCount when the page loads
document.addEventListener('DOMContentLoaded', updateViewCount);
