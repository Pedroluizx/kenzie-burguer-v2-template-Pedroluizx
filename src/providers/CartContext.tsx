import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosResponse } from "axios";

interface ICartContext {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  itensCart: never[]
}

interface ICartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [itensCart, setItensCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const loadProducts = async () => {
      try {
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setItensCart(response.data);
        
      } catch (error) {}
    };
   
    loadProducts();
  }, []);

  return (
    <CartContext.Provider value={{ openModal, setOpenModal,itensCart }}>
      {children}
    </CartContext.Provider>
  );
};
