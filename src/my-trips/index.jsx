import { useEffect, useState } from "react";
import { useNavigation } from 'react-router-dom';
import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";


function MyTrips() {

    const navigation = useNavigation();
    const [userTrips, setuserTrips] = useState([]);


    useEffect(() => {
        GetUserTrips();
    }, [])


    // get all the user trips here

    // const GetUserTrips = async () => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (!user) {
    //         navigation('/');
    //         return;
    //     }
    //     setuserTrips([]);

    //     const q = query(collection(db, 'AI_TRIPS'), where('userEmail', '==', user.email));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.userEmail, " => ", doc.data());
    //         // setuserTrips(prevVal => [...prevVal, doc.data])
    //     });
    // }



    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }


        // Query the AI_TRIPS collection
        const q = query(collection(db, 'AI_TRIPS'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        // Reset the user trips state
        setuserTrips([]);

        // Create a temporary array to store trip data
        const trips = [];
        querySnapshot.forEach((doc) => {
            // Add each document's data to the trips array
            trips.push(doc.data());
        });

        // Update the state with the new trips array
        setuserTrips(trips);
    };



    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-16 mb-16">
            <h2 className="font-bold text-3xl">My TRIPS</h2>

            <div className="mt-10 mb-[150px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} />
                ))
                    : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className="h-[180px] w-ful bg-slate-200 animate-pulse rounded-xl">
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default MyTrips