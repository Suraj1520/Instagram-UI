
import style from '../styles/Index.module.css'
import Loader from '../Components/Loader/Loader'
import Navbar from '@/Components/Navbar/Navbar'
import { ThemeContext } from '@/pages/themeContext'

import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import { AiOutlineLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { MdOutlineAddReaction } from 'react-icons/md'


export default function Home() {

  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);

  const router = useRouter();
  const { theme, themes } = useContext(ThemeContext);

  const handleNavigateToUser = (userId) => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`);
  }

  const fetchRandomPhotos = async () => {
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
    const perPage = 10;

    try {
      const cachedData = localStorage.getItem('cachedData');
      const cachedExpireTime = localStorage.getItem('cachedExpireTime');

      let response;
      if (cachedData && cachedExpireTime) {
        const currentTime = Date.now();
        if (currentTime < +cachedExpireTime) {
          response = JSON.parse(cachedData);
        }
        
        else {
          response = await axios.get(
            `https://api.unsplash.com/photos/random?count=${perPage}&page=${page}&client_id=${accessKey}`
          )
          const expirationTime = Date.now() + 1 * 30 * 1000;
          localStorage.setItem('cachedExpireTime', expirationTime);
          localStorage.setItem('cachedData', JSON.stringify(response));
        }
      }
      else {
        response = await axios.get(
          `https://api.unsplash.com/photos/random?count=${perPage}&page=${page}&client_id=${accessKey}`
        )
        const expirationTime = Date.now() + 1 * 30 * 1000;
        localStorage.setItem('cachedExpireTime', expirationTime);
        localStorage.setItem('cachedData', JSON.stringify(response));
      }
      // console.log('response');
      // console.log(response);

      setPage((prevPage) => prevPage + 1);

      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    }
    catch (error) {
      console.log('Some error occured while fetching photos', error);
    }
  };

  useEffect(() => {
    fetchRandomPhotos();
  }, []);

  return (
    <>
      <Navbar />
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchRandomPhotos}
        hasMore={true}
        loader={<Loader style={{
          backgroundColor: themes[theme].secondaryColor,
          color: themes[theme].primaryColor,
        }} />}
      >
        <div className={style.newsFeed} style={{
          backgroundColor: themes[theme].secondaryColor,
          color: themes[theme].primaryColor,
        }}>
          {photos.map((randomPhoto,index) => (

            <div key={`${randomPhoto.id}-${index}`} className={style.card} style={{
              backgroundColor: themes[theme].secondaryColor,
              color: themes[theme].primaryColor,
            }}>
              <div className={style.userCard}>
                <div className={style.userInfo} onClick={() => handleNavigateToUser(randomPhoto.user.username)}>
                  <img src={randomPhoto.user.profile_image.small} className={style.userProfilePic} />
                  <h2>{randomPhoto.user.first_name}&nbsp;
                    {randomPhoto.user.last_name ? randomPhoto.user.last_name : " "}
                  </h2>
                </div>
                <img src={randomPhoto.urls.small} alt={randomPhoto.description} className={style.postImage} />
                <div className={style.actionButtons}>
                  <AiOutlineLike className={style.icon} />
                  <BiComment className={style.icon} />
                  <MdOutlineAddReaction className={style.icon} />
                </div>
              </div>
            </div>
          )
          )}
        </div>
      </InfiniteScroll>
    </>
  )
}
