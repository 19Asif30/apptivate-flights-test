'use client';

import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Card, CardContent } from "../ui/card";

const mapOptions = {
	libraries: ["places"],
	mapContainerStyle: {
		height: "80vh",
		width: "100%",
	},
	options: {
		zoomControl: true,
		gestureHandling: "greedy",
		fullScreenControl: true,
		mapTypeControl: false,
	},
	googleMapsApiKey: '',
	zoomOut: 5,
	zoomIn: 20,
	initialCenter: {
		lat: 51.504072277875366,
		lng: -0.11052504100824097,
	},
};

// const MapLoader = ({ loading }) => {
// 	return (
// 		<>
// 			{loading ? (
// 				<div
// 					className="position-absolute d-flex align-items-center justify-content-center w-100 h-100"
// 					style={{ zIndex: 15 }}
// 				>
// 					<Spinner color={'success'} />
// 				</div>
// 			) : (
// 				<></>
// 			)}
// 		</>
// 	);
// };

const GmapWrapper = ({ zoomData, loading, children,googleMapsApiKey }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: googleMapsApiKey,
		libraries: mapOptions.libraries,
	});
	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	if (loadError) return "Error";
	if (!isLoaded) return "Loading...";
	return (
		<div className={"relative"}>
			{/* <MapLoader loading={loading} /> */}
			<Card>
				<CardContent>
					<GoogleMap
						id="map"
						mapContainerStyle={mapOptions.mapContainerStyle}
						zoom={mapOptions.zoomOut}
						center={
							(!zoomData)
								? mapOptions.initialCenter
								: zoomData.position
						}
						options={mapOptions.options}
						onLoad={onMapLoad}
					>
						{children}
					</GoogleMap>
				</CardContent>
			</Card>
			
		</div>
	);
};

export default GmapWrapper;
