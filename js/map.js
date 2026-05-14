
if (document.getElementById("map")) {

    var map = L.map('map').setView([28.6139, 77.2090], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    const landslides = [
        {lat: 31.1048, lng: 77.1734, place: "Himachal Pradesh", risk: "High"},
        {lat: 30.0668, lng: 79.0193, place: "Uttarakhand", risk: "Medium"},
        {lat: 27.7172, lng: 85.3240, place: "Nepal", risk: "Severe"}
    ];

    landslides.forEach(data => {
        L.marker([data.lat, data.lng])
            .addTo(map)
            .bindPopup(
                `<b>${data.place}</b><br>Risk Level: ${data.risk}`
            );
    });
}