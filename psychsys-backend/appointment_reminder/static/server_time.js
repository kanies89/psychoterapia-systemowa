// static/js/server_time.js
function updateServerTime() {
    fetch('api/server-time/')
        .then(response => response.json())
        .then(data => {
            const timeElement = document.getElementById('server-time-display');
            if (timeElement) {
                timeElement.textContent = `Server Time: ${data.server_time}`;
            }
        })
        .catch(error => console.error('Error fetching server time:', error));
}

// Update the time every 5 seconds
setInterval(updateServerTime, 5000);

// Initial fetch
document.addEventListener('DOMContentLoaded', updateServerTime);
