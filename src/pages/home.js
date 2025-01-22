import { useState } from 'react';
import Login from '../components/Login';
import UserLists from '../components/UserLists';
import Header from '../components/Header';

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <div>
     <Header />
      {user ? (
        <UserLists userId={user.uid} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}