import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import style from '../styles/Index.module.css'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import { AiOutlineLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { MdOutlineAddReaction } from 'react-icons/md'


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);

  const router = useRouter();

  const handleNavigateToUser = (userId) => {
    // event.stopPropagation();
    router.push(`http://localhost:3000/user/${userId}`);
  }

  const fetchRandomPhotos = async () => {
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
    console.log('accesskey');
    console.log(accessKey);
    const perPage = 10;
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?count=${perPage}&page=${page}&client_id=${accessKey}`
      )
      console.log('response');
      console.log(response);

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
    <InfiniteScroll
      dataLength={photos.length}
      next={fetchRandomPhotos}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className={style.newsFeed}>
        {photos.map((randomPhoto) => (

          <div key={randomPhoto.id} className={style.card}>
            <div className={style.userCard}>
              <div className={style.userInfo} onClick={() => handleNavigateToUser(randomPhoto.user.instagram_username)}>
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
  )
}
