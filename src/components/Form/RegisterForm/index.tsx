import Input from "../Input";

import { useForm, SubmitHandler } from "react-hook-form";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";

export interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<IRegisterFormData> = (formData) => {
    userRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input placeholder="Nome" type="text" register={register("name") } error={errors.name} />
      <Input placeholder="Email" type="email" register={register("email")}error={errors.email} />
      <Input
        placeholder="Senha"
        type="password"
        register={register("password")}error={errors.password}
      />
      <Input
        placeholder="Confirme a senha"
        type="password"
        register={register("confirm")}error={errors.confirm}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
