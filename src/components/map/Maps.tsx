import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useStateStore } from "@/store";
import { getPosts } from "@/app/_action";
import { Button } from "../ui/button";
import Image from "next/image";
import EventCard from "../Events/EventCard";
import { Badge } from "../ui/badge";
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
  }, []);

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
      style={{ width: "100%", height: "100dvh", zIndex: 0 }}
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
              closeButton={true}
            >
              <div className="w-fit h-[25rem] flex flex-col justify-between ">
                <div className="space-y-4">
                  <div className="flex w-full justify-between items-center">
                    <span className="flex md:flex-row flex-col gap-2 items-center text-xs">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={200}
                        height={200}
                        className="w-6 h-6 rounded-full"
                      />
                      {post.author.name}
                    </span>
                    <Badge variant={"destructive"}>
                      {post.category.replaceAll("_", " ")}
                    </Badge>
                  </div>
                  <Image
                    src={post.image}
                    alt={post.category}
                    width={200}
                    height={80}
                    className="w-full h-3/4 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-lg">{post.description}</span>
                </div>

                <div>
                  <div className="flex justify-between w-full text-xs text-slate-400">
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-bold text-center">Posted at</span>
                      <span>
                        {post.createdAt.getDate() < 10
                          ? "0" + post.createdAt.getDate()
                          : post.createdAt.getDate()}
                        -
                        {post.createdAt.getMonth() + 1 < 10
                          ? "0" + (post.createdAt.getMonth() + 1)
                          : post.createdAt.getMonth() + 1}
                        -{post.createdAt.getFullYear()}
                      </span>
                      <span>
                        {post.createdAt.getHours() < 10
                          ? "0" + post.createdAt.getHours()
                          : post.createdAt.getHours()}
                        :
                        {post.createdAt.getMinutes() < 10
                          ? "0" + post.createdAt.getMinutes()
                          : post.createdAt.getMinutes() < 10
                          ? "0" + post.createdAt.getMinutes()
                          : post.createdAt.getMinutes()}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <span className="font-bold text-center">Ends at</span>
                      <span>
                        {post.expectedCompletion.getDate() < 10
                          ? "0" + post.expectedCompletion.getDate()
                          : post.expectedCompletion.getDate()}
                        -
                        {post.expectedCompletion.getMonth() + 1 < 10
                          ? "0" + (post.expectedCompletion.getMonth() + 1)
                          : post.expectedCompletion.getMonth() + 1}
                        -{post.expectedCompletion.getFullYear()}
                      </span>

                      <span>
                        {post.expectedCompletion.getHours() < 10
                          ? "0" + post.expectedCompletion.getHours()
                          : post.expectedCompletion.getHours()}
                        :
                        {post.expectedCompletion.getMinutes() < 10
                          ? "0" + post.expectedCompletion.getMinutes()
                          : post.expectedCompletion.getMinutes() < 10
                          ? "0" + post.expectedCompletion.getMinutes()
                          : post.expectedCompletion.getMinutes()}
                      </span>
                    </div>
                  </div>
                </div>
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
