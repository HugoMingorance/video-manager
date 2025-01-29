import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Header from '../components/Header'; // Asegúrate de importar el componente Header
import styles from '../styles/profile.module.css'; // Importa el módulo CSS para cualquier estilo adicional

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/home'); // Redirigir a la página de inicio si el usuario no está autenticado
    return null;
  }

  return (
    <>
      <Header /> {/* Añadir el componente Header */}
      <div className="user-lists" style={{ color: 'white' }}>
        <h2>Perfil del usuario</h2>
        <p>Correo electrónico: {user.email}</p>
        <button className="headerButton" onClick={logout}>Cerrar sesión</button>
      </div>
    </>
  );
};

export default Profile;