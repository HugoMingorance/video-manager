import { useAuth } from '../context/AuthContext';
import UserLists from '../components/UserLists';
import Header from '../components/Header';
import Login from '../components/Login';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <Header userId={user && user.uid} />
      {user ? (
        <UserLists userId={user.uid} />
      ) : (
        <Login />
      )}
    </div>
  );
}