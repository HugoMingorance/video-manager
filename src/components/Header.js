import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'; // Importa el módulo CSS

const Header = ({ userId }) => {
  const router = useRouter();

  const handleNewClick = () => {
    router.push(`/newVideo?userId=${userId}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>VIDEO <span className={styles.lister}>LISTER</span></h1>
      </div>
      <div className={styles.headerRight}>
        <button className={styles.headerButton} onClick={handleNewClick}>Nuevo</button>
        <button className={styles.headerButton}>Favoritos</button>
        <button className={styles.headerButton}>Perfil</button>
      </div>
    </header>
  );
}

export default Header;