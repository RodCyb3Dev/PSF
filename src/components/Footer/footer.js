import React from 'react';
import styles from './footer.css';
import { Link } from 'react-router-dom';

import { CURRENT_YEAR } from '../../config';

const footer = () => (
    <div className={styles.footer}>
        <Link to="/" className={styles.logo}>
            <img alt="PSF Logo" src="/images/nba_logo.png"/>
        </Link>
        <div className={styles.right}>
        &#169; {CURRENT_YEAR} <b>SPF |</b> All Rights Reserved | Powered by  
            <a className="badge badge-info ml-1" target="_new" title="Developers Blog" href="https://kodeflash.herokuapp.com/"> <big>Kodeflash</big></a>
        </div>
    </div>
)

export default footer;