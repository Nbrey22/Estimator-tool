import React from 'react';
import './Header.css';

function Header(){
    return(
        <header className="app-header"> {/*Apply styles from .App-header in css */}
            <div className='header-box'>Estimator Tool</div>
        </header>
    );
}
export default Header;