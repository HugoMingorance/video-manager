import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'; // Importa el módulo CSS

const Header = ({ userId }) => {
  const router = useRouter();

  const handleNewClick = () => {
    console.log('Navigating to newVideo page'); // Añadir un log para verificar que la función se llama
    router.push(`/newVideo?userId=${userId}`);
  };

  const handleProfileClick = () => {
    console.log('Navigating to profile page'); // Añadir un log para verificar que la función se llama
    router.push('/profile');
  };

  const handleFavoriteClick = () => {
    console.log('Navigating to profile page'); // Añadir un log para verificar que la función se llama
    router.push('/favorites');
  };


  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>VIDEO <span className={styles.lister}>LISTER</span></h1>
      </div>
      <div className={styles.headerRight}>
        <button className={styles.headerButton} onClick={handleNewClick}>Nuevo</button>
        <button className={styles.headerButton} onClick={handleFavoriteClick}>Favoritos</button>
        <button className={styles.headerButton} onClick={handleProfileClick}>Perfil</button>
      </div>
    </header>
  );
}

export default Header;