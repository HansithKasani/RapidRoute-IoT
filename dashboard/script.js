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
    // Hospital Data (Example Hyderabad Hospitals)
const hospitals = [
    { name: "Care Hospital", lat: 17.4065, lng: 78.4772 },
    { name: "Apollo Hospital", lat: 17.4116, lng: 78.4487 },
    { name: "Yashoda Hospital", lat: 17.4362, lng: 78.4430 }
];

// Function to calculate distance (Haversine Formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function findNearestHospital(ambulanceLat, ambulanceLng) {
    let nearest = null;
    let minDistance = Infinity;

    hospitals.forEach(hospital => {
        const distance = getDistance(
            ambulanceLat,
            ambulanceLng,
            hospital.lat,
            hospital.lng
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearest = hospital;
        }
    });

    // Update UI
    document.getElementById("hospitalName").innerText = nearest.name;
    document.getElementById("hospitalDistance").innerText =
        "Distance: " + minDistance.toFixed(2) + " km";

    // Add marker
    L.marker([nearest.lat, nearest.lng])
        .addTo(map)
        .bindPopup("Nearest Hospital: " + nearest.name);
}


// Simple test movement
 document.getElementById("startBtn").addEventListener("click", function() {

    const newLat = 17.3950;
    const newLng = 78.4967;

    ambulance.setLatLng([newLat, newLng]);

    document.getElementById("ambulanceCoords").innerText =
        "Lat: " + newLat.toFixed(4) +
        " | Lng: " + newLng.toFixed(4);

    findNearestHospital(newLat, newLng);
});


function toggleSignal(num) {
    const buttons = document.getElementsByClassName("signal-btn");
    const btn = buttons[num - 1];

    if (btn.classList.contains("red")) {
        btn.classList.remove("red");
        btn.classList.add("green");
        btn.innerText = "GREEN";
    } else {
        btn.classList.remove("green");
        btn.classList.add("red");
        btn.innerText = "RED";
    }
}

