import { useState, useEffect } from "react";

export const useGeolocation = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }, []);

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // @ts-ignore
        setLocation({ lat, lon });
    }

    function error() {
        console.log("Unable to retrieve your location");
    }
    return location;
};
