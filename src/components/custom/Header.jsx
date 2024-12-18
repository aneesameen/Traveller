import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigation } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';

function Header() {

    // const user = JSON.parse(localStorage.getItem('user'));
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const [OpenBox, setOpenBox] = useState(false);

    useEffect(() => {
        // console.log(user.picture);
    }, [])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenBox(false);
            window.location.reload();
        })
    }

    return (
        <div className='p-2 pt-4 shadow-sm flex justify-between items-center px-16'>
            <a href="/">
                <div className='cursor-pointer flex flex-col justify-center'>
                    <img src='/logo.svg' />
                    <h2 className='font-bold'>TRAVELLER</h2>
                </div>
            </a>

            <div>
                {user ?
                    <div className='flex gap-3 items-center'>
                        <a href="/my-trips">
                            <Button variant='outline' className="rounded-full">My Trips</Button>
                        </a>
                        <a href="/create-trip">
                            <Button variant='outline' className="rounded-full">+ Create Trip</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger className=" flex items-center gap-2 font-medium border px-2 py-1 bg-[#1a1a1a] text-white rounded-full">
                                <img src={user?.picture} alt='user' className='h-[30px] w-[3\0px] object-cover rounded-full' />
                                <p>{user.name}</p>
                            </PopoverTrigger>
                            <PopoverContent className='bg-white mr-5 text-center mt-2'>
                                <h2 className='cursor-pointer font-medium text-lg' onClick={() => {
                                    googleLogout();
                                    localStorage.clear();
                                    window.location.reload();
                                    window.location.href = '/';
                                }}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div> :
                    <Button onClick={() => setOpenBox(true)}>Sign In</Button>
                }
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
    // className='flex border rounded-full px-2 items-center bg-black text-white text-sm font-bold'
}

export default Header
