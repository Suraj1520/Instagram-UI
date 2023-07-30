import React from "react";
import style from '../Loader/Loader.module.css';

const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={style.spinner}></div>
        </div>
    )
};

export default Loader;