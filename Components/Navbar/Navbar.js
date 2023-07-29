import Link from 'next/link';
import styles from './Navbar.module.css';
import {AiOutlineUser} from 'react-icons/ai';
import {MdOutlineLightMode} from 'react-icons/md';


const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.ul}>
                <li className={styles.list}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
            </ul>
            <ul className={styles.ul}>
                <li className={styles.list}>
                    <MdOutlineLightMode className={styles.icon}/>
                    <Link href="/about">
                        Light
                    </Link>
                </li>
                <li className={styles.list}>
                    <AiOutlineUser className={styles.icon}/>
                    <Link href="/user">
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;