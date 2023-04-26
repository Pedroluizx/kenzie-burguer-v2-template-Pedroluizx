import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { IRegisterFormData } from "../components/Form/RegisterForm";
import { ILOGINFORMDATA } from "../components/Form/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IUserContext {
  userLogin: (formData: ILOGINFORMDATA) => Promise<void>;
  userRegister: (formData: IRegisterFormData) => Promise<void>;
  user: IUser | null;
  userLogout: () => void;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

interface IUserProviderProps {
  children: React.ReactNode;
}
export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  useEffect(() => {
    const userId = localStorage.getItem("@USERID");
    const token = localStorage.getItem("@TOKEN");

    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@userId");
      }
    };
    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  const userLogin = async (formData: ILOGINFORMDATA) => {
    try {
      const { data } = await api.post<IUserLoginResponse>("/login", formData);
      localStorage.setItem("@TOKEN", data.accessToken);
      localStorage.setItem("@USERID", data.user.id);
      setUser(data.user);
      navigate("/shop");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    }
  };

  const userRegister = async (formData: IRegisterFormData) => {
    try {
      await api.post<IUserRegisterResponse>("/users", formData);
      toast.success("cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    }
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ userLogin, userRegister, user, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
