document.addEventListener("DOMContentLoaded", function() {
    let map = L.map('map').setView([48.268333, 14.251389], 13); // Koordinaten der HTL Leonding

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let redIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        iconSize: [38, 45],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });

    let marker = L.marker([48.268333, 14.251389], { icon: redIcon, id: 'htl-leonding' }).addTo(map)
        .bindPopup('HTL Leonding')
        .openPopup();

});