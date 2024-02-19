import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useStateStore } from "@/store";
import { getPosts } from "@/app/_action";
import { Button } from "../ui/button";
import Image from "next/image";
import { CardDemo } from "../Events/EventCard";
interface MapProps {
  lat: number;
  long: number;
}

const Map: React.FC<MapProps> = ({ lat, long }) => {
  const [markers, setMarkers] = useState<{ lat: number; long: number }[]>([]);
  const position: [number, number] = [lat, long];
  const { setLatitude, setLongitude } = useStateStore();
  const [postsData, setPostsData] = useState<any[]>([]);
  const setAddEventOpen = useStateStore((state) => state.setAddEventOpen);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts();
      setPostsData(posts);
    }
    fetchPosts();
  });

  // Define a custom icon
  const customIcon = new L.Icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [25, 41],
  });

  const AddMarkerOnClick = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkers([...markers, { lat, long: lng }]);
        setLatitude(lat);
        setLongitude(lng);
      },
    });

    return null;
  };

  return (
    <MapContainer
      style={{ width: "100%", height: "100vh", zIndex: 0 }}
      center={position}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {postsData.map((post, index) => {
        return (
<Marker
  key={index}
  position={[post.latitude, post.longitude]}
  icon={customIcon}
>
  <Popup
    className="bg-white bg-opacity-75 backdrop-blur-xs shadow-glass p-4 rounded-lg"
    closeButton={false}
  >

    <div>
  <CardDemo category={post.category} description={post.description} image={post.image} createdAt={post.createdAt} expectedCompletion={post.expectedCompletion} expiresAt={post.expiresAt} reports={post.reports} author={post.author}/>
    </div>
  </Popup>
</Marker>

        );
      })}
      <AddMarkerOnClick />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.long]}
          icon={customIcon}
        >
          <Popup>
            <span>
              <Button
                onClick={() => {
                  setAddEventOpen();
                }}
              >
                Add New Post
              </Button>
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

