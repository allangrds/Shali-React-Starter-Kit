import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.css';

const Navbar = () =>
    <nav className={styles.Navbar}>
        <ul className={styles.Navbar.ul}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about/">About</Link>
            </li>
        </ul>
    </nav>

export default Navbar