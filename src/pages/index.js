import { useState } from 'react';
import Login from '../components/Login';
import UserLists from '../components/UserLists';

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <UserLists userId={user.uid} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}