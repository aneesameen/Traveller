import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import InfoSection from "../components/InfoSection";
import HotelList from "../components/HotelList";
import PlacesToVisit from "../components/PlacesToVisit";

function Viewtrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, 'AI_TRIPS', tripId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // console.log("Document:", docSnap.data());
            setTrip(docSnap.data())
        } else {
            // console.log("No such Document");
            toast.error("No such trip found");
        }
    }


    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information section */}

            <InfoSection trip={trip} />

            {/* Recommended Hotels */}

            <HotelList trip={trip} />

            {/* Daily plan */}

            <PlacesToVisit trip={trip} />
        </div>
    )
}
export default Viewtrip