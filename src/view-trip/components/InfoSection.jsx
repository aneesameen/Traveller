import { GetPlaceDetails, PHOTO_REF_URL } from "../../services/GlobalApi"
import { useEffect, useState } from "react"

function InfoSection({ trip }) {

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
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[9].name);
            setPhoto(photoUrl);
        })
    }

    return (
        <div>
            <img src={photo ? photo : '/placeholder.jpg'} className="h-[340px] w-full object-cover rounded-xl shadow-lg" />

            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                <div className="flex flex-col md:flex-row gap-5">
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md md:text-md">📅 {trip?.userSelection?.noOfDays}  Days</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md md:text-md">💸 {trip?.userSelection?.budget}</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md md:text-md">🧑‍🤝‍🧑 No of travellers {trip?.userSelection?.traveller}</h2>
                </div>
            </div>
        </div>
    )
}
export default InfoSection