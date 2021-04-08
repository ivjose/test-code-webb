import { createContext, useContext, useState, useMemo } from 'react';

const LoginAuth = createContext();

function useLoginAuth() {
  const context = useContext(LoginAuth);

  if (!context) {
    throw new Error('useLoginAuth must be use within Login Auth Provider');
  }

  return context;
}

const userList = [
  {
    username: 'admin@email.com',
    password: '12345',
    role: 'admin',
  },
  {
    username: 'user@email.com',
    password: '12345',
    role: 'basic',
  },
];

export const defaulValue = {
  username: '',
  password: '',
  role: '',
};

const LoginAuthProvider = (props) => {
  const [userLogin, setUserLogin] = useState(defaulValue);
  const [error, setError] = useState('');

  const value = useMemo(() => {
    const authLogin = (value) => {
      const authCheck = userList.find(
        (user) =>
          user.username === value.username && user.password === value.password
      );

      if (authCheck) {
        return setUserLogin({ ...authCheck });
      }
      return setError('Invalid Credentails');
    };
    const logout = () => {
      setUserLogin(defaulValue);
    };

    // Setter
    return [{ ...userLogin, error }, authLogin, logout];
  }, [userLogin, error]);
  return <LoginAuth.Provider value={value} {...props} />;
};

export { LoginAuthProvider, useLoginAuth };
