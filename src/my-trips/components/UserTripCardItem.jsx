import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../services/GlobalApi";
import { Link } from "react-router-dom";


function UserTripCardItem({ trip }) {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data.places[0].photos[3].name)
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[8].name);
            setPhoto(photoUrl);
        })
    }


    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className="hover:scale-105 transition-all rounded-xl">
                <img className="rounded-xl h-[180px] w-full object-cover" src={photo ? photo : '/placeholder.jpg'} alt="" />

                <div className="mt-5 px-2">
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                    <p className="text-sm tex-gray-500">{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</p>            </div>
            </div>
        </Link>
    )
}
export default UserTripCardItem