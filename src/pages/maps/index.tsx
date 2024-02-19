import Map from "@/components/map/Map"
import { useEffect, useState } from "react";

interface LocationData {
    latitude: number;
    longitude: number;
}

const MapsMain: React.FC = () => {
    const [data, setData] = useState<LocationData | null>(null); // Set initial state as null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.maptiler.com/geolocation/ip.json?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`);
                const jsonData = await response.json();
                setData({
                    latitude: jsonData.latitude,
                    longitude: jsonData.longitude
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {data && <Map lat={data.latitude} long={data.longitude} />}
        </>
    )
}

export default MapsMain;
