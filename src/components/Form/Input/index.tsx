import { UseFormRegisterReturn } from "react-hook-form";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { FieldError } from "react-hook-form";

interface IINPUTPROPS {
  label?: string;
  error?: FieldError;
  type: "text" | "email" | "number" | "password";
  placeholder?: string;
  register: UseFormRegisterReturn<string>;
}

export const Input = ({ label, type, placeholder, register,error }: IINPUTPROPS) => {
  return (
    <div>
      <StyledInputContainer>
        {label ? <label>{label}</label> : null}
        <input type={type} placeholder={placeholder} {...register} />
        </StyledInputContainer>
        {error ?  <StyledParagraph fontColor='red'>{error.message}</StyledParagraph> : null}
       
      
    </div>
  );
};

export default Input;
