import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import axios from 'axios'

import style from '../../styles/User.module.css'

const UserDetail = () => {
    const router = useRouter();
    const {userId} = router.query;

    console.log(userId);

    const [user, setUser] = useState([]);
    const [userPhotos, setUserPhotos] = useState([]);
    const [viewMode, setViewMode] = useState('grid');

    const fetchUserDetail = async () =>{
        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
        console.log(accessKey)
        try{
            const response = await axios.get(
                `https://api.unsplash.com/users/${userId}?client_id=${accessKey}`
            );
            setUser(response.data);

            const photosResponse = await axios.get(
                `https://api.unsplash.com/users/${userId}/photos?client_id=${accessKey}`
            );
            setUserPhotos(photosResponse.data);

        }
        catch(error){
            console.log('Error in fetching user details',error);
        }
    };

    useEffect(()=>{
        fetchUserDetail();
    },[userId]);


    const handleViewMode = () =>{
        setViewMode((prevMode)=>(prevMode === 'list'?'grid':'list'));
    };

    if(!user)
    {
        <div className={style.userDetail}>
            <div>
                Loading...
            </div>
        </div>
    }
    return (
        <div className={style.userDetail}>
            <div>

            </div>
        </div>
    )
}

export default UserDetail;