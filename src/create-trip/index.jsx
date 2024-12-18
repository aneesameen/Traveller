import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/option';
import { toast } from 'sonner';
import { chatSession } from '../services/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [OpenBox, setOpenBox] = useState(false);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
    }, [formData])


    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const generateTrip = async () => {

        const user = localStorage.getItem("user");

        if (!user) {
            toast.error("please login first");
            setOpenBox(true);
            return;
        }



        if (!formData?.noOfDays || !formData?.budget || !formData?.location || !formData?.traveller) {
            toast.error("please fill everything");
            return;
        } else if (formData?.noOfDays <= 0) {
            toast.error("please enter valid trip days");
            return;
        } else if (formData?.noOfDays > 8) {
            toast.error("please enter trip days less than 8");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveller}', formData?.traveller)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        SaveAiTrip(result?.response?.text())
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString()
        await setDoc(doc(db, "AI_TRIPS", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);

        navigate('/view-trip/' + docId);

    }


    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenBox(false);
            generateTrip();
        })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-16 mb-16'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            }
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input placeholder={'Ex.3'} type="number"
                        onChange={
                            (e) => handleInputChange("noOfDays", e.target.value)
                        }
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange("budget", item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange("traveller", item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveller == item.people && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className='mt-10' />
            <div className='my-10 flex justify-center'>
                <Button disabled={loading} onClick={generateTrip}>
                    {loading ?
                        <VscLoading className='h-7 w-7 animate-spin' /> : "Generate plan"
                    }
                </Button>
            </div>

            <Dialog open={OpenBox} onOpenChange={setOpenBox}>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            <img src="/logo.svg" />
                            <h2 className='font-bold'>TRAVELLER</h2>
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign in to the app with Google authentication securely</p>

                            <Button onClick={login} className="w-full mt-4 flex gap-4 item-center text-md">
                                <FcGoogle />Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateTrip
