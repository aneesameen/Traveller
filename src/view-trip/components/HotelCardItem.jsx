import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { GetPlaceDetails, PHOTO_REF_URL } from "../../services/GlobalApi";

function HotelCardItem({ hotel }) {

    const [photo, setPhoto] = useState();

    useEffect(() => {
        hotel && getPlacePhoto();
    }, [hotel])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data.places[0].photos[3].name)
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[8].name)
            setPhoto(photoUrl);
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + hotel?.hotel?.address} target="_blank">
            <div className="hover:scale-105 cursor-pointer shadow-lg h-full rounded-xl transition-all p-2">
                <img src={photo ? photo : '/placeholder.jpg'} className="rounded-xl h-[180px] w-full object-cover" />
                <div className="flex flex-col gap-2 my-3">
                    <h2 className="font-medium ">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-600">📍 {hotel?.address}</h2>
                    <h2 className="text-sm text-gray-900">💰 {hotel?.price}</h2>
                    <h2 className="text-xs text-gray-700">⭐ {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}
export default HotelCardItem