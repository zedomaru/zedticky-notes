import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { account } from '../appwrite/config';
import { ID, Models } from 'appwrite';

interface AuthContextType {
  user: Models.Preferences | null;
  setUser: (value: Models.Preferences) => void;
  loginUser: (userInfo: any) => void;
  logoutUser: () => void;
  registerUser: (userInfo: UserInfo) => void;
  checkUserStatus: () => void;
}

interface UserInfo {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
  checkUserStatus: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.Preferences | null>(null);

  const loginUser = async (userInfo: UserInfo) => {
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const userDetail = await account.get();
      setUser(userDetail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const logoutUser = () => {
    account.deleteSession('current');
    setUser(null);
  };

  const registerUser = async (userInfo: UserInfo) => {
    try {
      await account.create(ID.unique(), userInfo.email, userInfo.password);
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetail = await account.get();
      setUser(accountDetail);
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserStatus = async () => {
    try {
      let accountDetail = await account.get();
      setUser(accountDetail);
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    user,
    setUser,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
