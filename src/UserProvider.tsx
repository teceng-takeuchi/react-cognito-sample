import { Auth, Hub } from "aws-amplify";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Amplify } from '@aws-amplify/core';
Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_xxxx',
    userPoolWebClientId: 'xxxx',
  }
})

type Props = {
  children: ReactNode
}
export const UserContext = createContext<any | null>(null)


export const UserProvider: React.FC<Props> = (props) => {
  const { children } = props
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  const getUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      // デバッグ用
      Auth.currentSession().then((data) => {
        console.log(`token: ${data.getIdToken().getJwtToken()}`);
      });
      console.log(userData);
      return userData;
    } catch (e) {
      return console.log('Not signed in');
    }
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>

  )
}