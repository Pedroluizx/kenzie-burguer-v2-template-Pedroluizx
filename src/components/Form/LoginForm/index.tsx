import { useContext } from 'react';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from '../../../providers/UserContext';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from './loginFormSchema';


export interface ILOGINFORMDATA {
  email: string;
  password: string;
}



const LoginForm = () => {

  const {userLogin} = useContext(UserContext)

  const {register,handleSubmit,formState: {errors}}= useForm<ILOGINFORMDATA>({
    resolver: zodResolver(loginFormSchema)
  });

  const submit : SubmitHandler<ILOGINFORMDATA> = (formData)=>{
    userLogin(formData)
  }

  return(
  <StyledForm onSubmit={handleSubmit(submit)}>
    <Input type='text' placeholder='Email' register={register("email")} error={errors.email} />
    <Input type='password' placeholder='Senha' register={register("password")} error={errors.password}/>
    <StyledButton $buttonSize='default' $buttonStyle='green'>
      Entrar
    </StyledButton>
  </StyledForm>
);
}

export default LoginForm;
