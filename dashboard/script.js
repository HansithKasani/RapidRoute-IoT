// Initialize map
var map = L.map('map').setView([17.3850, 78.4867], 13); // Hyderabad default

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add ambulance marker
var ambulance = L.marker([17.3850, 78.4867]).addTo(map)
    .bindPopup("Ambulance")
    .openPopup();

// Simple test movement
document.getElementById("startBtn").addEventListener("click", function() {
    ambulance.setLatLng([17.3950, 78.4967]);
    document.getElementById("signal1").innerText = "GREEN";
});

