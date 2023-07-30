import { useRouter } from "next/router"
import axios from 'axios'
import { useState, useEffect, useContext } from "react"

import PhotoGrid from '../../Components/PhotosView/PhotoGrid'
import PhotoList from '../../Components/PhotosView/PhotoList'
import style from '../../styles/User.module.css'
import Loader from "../../Components/Loader/Loader"
import Navbar from "@/Components/Navbar/Navbar"
import { ThemeContext } from '@/pages/themeContext'


const themes2 = {
    light:{
        primaryColor:'#000',
        secondaryColor:'#F5F5F5',
    },
    dark:{
        primaryColor:'#fff',
        secondaryColor:'#000',
    }
};

const UserDetail = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { theme, toggle, themes } = useContext(ThemeContext);

    // console.log(userId);

    const [user, setUser] = useState([]);
    const [userPhotos, setUserPhotos] = useState([]);
    const [viewMode, setViewMode] = useState('grid');

    // console.log("viewMode");
    // console.log(viewMode);

    const fetchUserDetail = async () => {
        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
        try {
            const response = await axios.get(
                `https://api.unsplash.com/users/${userId}?client_id=${accessKey}`
            );
            // console.log(response);
            setUser(response.data);

            const photosResponse = await axios.get(
                `https://api.unsplash.com/users/${userId}/photos?client_id=${accessKey}`
            );
            // console.log("photoResponse");
            // console.log(photosResponse);
            setUserPhotos(photosResponse.data);
            // console.log("userPhotos");
            // console.log(userPhotos);

        }
        catch (error) {
            console.log('Error in fetching user details', error);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, [userId]);


    const handleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
        // console.log("viewMode");
        // console.log(viewMode);
    };

    if (!user) {
        <div className={style.userDetail}>
            <Loader />
        </div>
    }
    return (
        < >
            <Navbar />
            <div className={style.userDetail} style={{
                backgroundColor: themes[theme].secondaryColor,
                color: themes[theme].primaryColor,
            }}>
                <div style={{
                    backgroundColor: themes[theme].secondaryColor,
                    color: themes[theme].primaryColor,
                }}>
                    {user &&
                        <div className={style.userDetails}>
                            <div className={style.userImage}>
                                {user.profile_image && < img src={user.profile_image.large} alt={user.name}></img>}
                            </div>
                            <div className={style.userInfo}>
                                <div>
                                    <h2 className={style.userName}>{user.name}</h2>
                                    {user.location && <p>Location - {user.location || 'N/A'}</p>}
                                    {user.instagram_username && <p>Instagram - {user.instagram_username || 'N/A'}</p>}
                                </div>
                                <div className={style.postCount}>
                                    {user.total_photos && <div className={style.postSubCount}>{user.total_photos} Photos</div>}
                                    {user.total_likes && <div className={style.postSubCount}>{user.total_likes} Likes</div>}
                                    {(user.total_collections && user.total_collections >= 0) && <div className={style.postSubCount}>{user.total_collections} Collections</div>}
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <div className={style.photoComponent}>
                    <div className={style.switch}>
                        {user.profile_image && <button className={style.button} style={{
                            backgroundColor: themes2[theme].secondaryColor,
                            color: themes2[theme].primaryColor,
                        }} role="button" onClick={handleViewMode}>Switch View </button>}
                    </div>
                    {userPhotos.length === 0 ? (
                        <Loader />
                    ) : viewMode === 'grid' ? <PhotoGrid userid={userId} /> : <PhotoList userid={userId} />}
                </div>
            </div >
        </>
    )
}

export default UserDetail;