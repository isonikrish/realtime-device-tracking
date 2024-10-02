const socket = io();
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (err) => {
            console.log(err);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        }
    );
}


const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
}).addTo(map);   
const markersClusterGroup = L.markerClusterGroup();
map.addLayer(markersClusterGroup);
const markers = {};

socket.on("recieve-location", (data) => {
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        const marker = L.marker([latitude, longitude]);
        markers[id] = marker;
        
        // Add marker to the cluster group instead of the map directly
        markersClusterGroup.addLayer(marker);
    }
}); 

socket.on("user-disconnected", (id)=> {
    if(markers[id]){
        markers[id].remove();
        delete markers[id];
    }
})
