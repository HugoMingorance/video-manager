import React from 'react';
import styles from '../styles/Header.module.css'; // Importa el módulo CSS

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerTitle}>VIDEO <span className={styles.lister}>LISTER</span></h1>
            </div>
            <div className={styles.headerRight}>
                <button className={styles.headerButton}>Nuevo</button>
                <button className={styles.headerButton}>Favoritos</button>
                <button className={styles.headerButton}>Perfil</button>
            </div>
        </header>
    );
}

export default Header;