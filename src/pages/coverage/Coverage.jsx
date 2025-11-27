import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useEffect, useRef, useState } from "react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (district) {
      mapContainerRef.current?.flyTo(
        [district.latitude, district.longitude],
        12,
      );
    }
  }, [searchText, serviceCenters]);

  const handleSearch = (event) => {
    setSearchText(event.target.value.trim());
  };

  console.log(searchText);

  return (
    <section className="custom-container mx-auto mt-10 mb-20">
      <h1 className="text-5xl font-bold text-black mb-10">
        We are available in 64 districts
      </h1>
      <label className="input mb-10">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={handleSearch}
          type="search"
          className="grow"
          placeholder="Search"
        />
      </label>
      <MapContainer
        ref={mapContainerRef}
        className="w-full h-[450px]"
        center={position}
        zoom={8}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceCenters.map((center) => (
          <Marker
            key={center.district}
            position={[center.latitude, center.longitude]}
          >
            <Popup>
              <strong>{center.district}</strong>
              <br />
              <br />
              Service Areas:{" "}
              {center.covered_area.map((area) => area).join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default Coverage;
