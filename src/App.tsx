import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { Auth } from 'aws-amplify';
import { Login } from './Login';

function App() {
  const user = useContext(UserContext)
  console.log(user)

  return user ? (
    <div>
      <p>サインイン済み</p>
      <p>ユーザー名: {user.username}</p>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
    </div>
  ) : (
    <Login />
  )
}

export default App;
