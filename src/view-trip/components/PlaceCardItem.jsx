import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { GetPlaceDetails, PHOTO_REF_URL } from "../../services/GlobalApi";


function PlaceCardItem({ place }) {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        place && getPlacePhoto();
    }, [place])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data.places[0].photos[3].name)
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[8].name)
            setPhoto(photoUrl);
        })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target="_blank">
            <div className="border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 hover:text-black transition-all hover:shadow-md cyrsor-pointer">
                <img src={photo ? photo : '/placeholder.jpg'} className="h-[150px] object-cover w-[130px] rounded-xl" />

                <div>
                    <h2 className="font-bold text-lg">{place?.placeName}</h2>
                    <p className="text-sm text-gray-600">{place?.placeDetails || place?.details}</p>
                    <h2 className="mt-2 text-sm text-orange-400">🏃 {place?.bestTimeToVisit}</h2>
                    <p className="mt-2 text-sm text-gray-500">💲 {place?.ticketPricing}</p>
                </div>
            </div>
        </Link>
    )
}
export default PlaceCardItem