import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/home'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return null;
  }

  return (
    <div>
      <h1>Perfil del usuario</h1>
      <p>Correo electrónico: {user.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;