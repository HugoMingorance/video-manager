import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import styles from '../styles/Auth.module.css'; // Importa el módulo CSS común

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home'); // Redirigir a la página de inicio después de iniciar sesión
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register'); // Redirigir a la página de registro
  };

  return (
    <div className={styles.authContainer}>
      <header className={styles.authHeader}>
        <h1>Bienvenido</h1>
        <p>Por favor, inicia sesión para continuar</p>
      </header>
      <button onClick={handleRegisterRedirect} className={styles.backButton}>
        Crear cuenta
      </button>
      <div className={styles.authBox}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;