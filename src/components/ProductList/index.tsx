import { CartContext } from "../../providers/CartContext";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { StyledProductList } from "./style";
import { UserContext } from "../../providers/UserContext";

const ProductList = () => {
  const { itensCart } = useContext(CartContext);
console.log(itensCart)
  return (
    <StyledProductList>
      {itensCart.map((item) => (
        <ProductCard />
      ))}
    </StyledProductList>
  );
};
export default ProductList;
