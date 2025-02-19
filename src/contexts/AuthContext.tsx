import {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from "react";
import { API } from "@/utils/api";
import { useRouter } from "next/router";

interface IAuthContext {
  isLoggedIn: boolean;
  login(name: string, email: string): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  async login() {},
  async logout() {},
});

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<IAuthContext["isLoggedIn"]>(false);

  async function login(name: string, email: string) {
    try {
      const response = await API.post("/auth/login", { name, email });
      if (response.status === 200) {
        setIsLoggedIn(true);
        router.push("/search");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    try {
      await API.post("/auth/logout");
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}