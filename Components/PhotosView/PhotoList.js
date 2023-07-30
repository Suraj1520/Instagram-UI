import axios from 'axios'
import { useState, useEffect } from "react"

import style from '../../styles/User.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../Loader/Loader'

const PhotoList = ({ userid }) => {
    const [page, setPage] = useState(1);
    const [userPhotos, setUserPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const capitalize = (str) =>{
        return str.charAt(0).toUpperCase()+str.slice(1);
    };

    const fetchUserDetail = async () => {
        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
        console.log(accessKey)
        try {
            const perPage = 10;
            console.log(`page: ${page}`);
            console.log(hasMore);

            const photosResponse = await axios.get(
                `https://api.unsplash.com/users/${userid}/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}`
            );
            console.log("photoResponse in list");
            console.log(photosResponse);
            if (photosResponse.data.length > 0) {
                setPage((prevPage) => prevPage + 1);
                console.log(`photosResponse: ${photosResponse}`);
                console.log(`photosResponse.data: ${photosResponse.data}`);
                setUserPhotos((prevUserPhotos) => {
                    const uniquePhotos = photosResponse.data.filter(
                        (newPhoto) => !prevUserPhotos.some((oldPhoto) => oldPhoto.id === newPhoto.id)
                    );
                    return [...prevUserPhotos, ...uniquePhotos]
                });
                console.log("userPhotos");
                console.log(userPhotos);
            }
            else {
                setHasMore(false);
            }

        }
        catch (error) {
            console.log('Error in fetching user details', error);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);


    return (
        <InfiniteScroll
            dataLength={userPhotos.length}
            hasMore={hasMore}
            next={fetchUserDetail}
            loader={<Loader />}
        >
            <div className={style.photo_list}>
                {userPhotos.map((photo) => (
                    <div key={photo.id} className={style.photo}>
                        {(photo.urls && photo.urls.small) ?
                            (
                                <div className={style.listView}>
                                    <div className={style.img}>
                                        <img src={photo.urls.small_s3} alt={photo.alt_description}></img>
                                    </div>
                                    <p>{photo.alt_description && capitalize(photo.alt_description)}</p>
                                </div>
                            ) : (
                                <p>No Image Available</p>
                            )
                        }
                    </div>
                ))
                }
            </div >
        </InfiniteScroll>
    )
};

export default PhotoList;