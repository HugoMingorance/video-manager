import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import styles from '../styles/Auth.module.css'; // Importa el módulo CSS común

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/home'); // Redirigir a la página de inicio después de crear la cuenta
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirigir a la página de login
  };

  return (
    <div className={styles.authContainer}>
      <header className={styles.authHeader}>
        <h1>Bienvenido</h1>
        <p>Por favor, crea una cuenta para continuar</p>
      </header>
      <button onClick={handleLoginRedirect} className={styles.backButton}>
        Volver al Login
      </button>
      <div className={styles.authBox}>
        <h2>Crear Cuenta</h2>
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
          <button type="submit">Registrar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;