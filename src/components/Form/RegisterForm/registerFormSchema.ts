import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, "O nome é obrigatorio e precisa ter no minimo 3 caracteres "),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Forneca um email válido"),
  password: z
    .string()
    .min(7, "A senha deve conter no minimo 7 caracteres")
    .regex(/(?=.*?[#?!@$%^&*-])/, "É necessário pelo menos um caracter especial")
    .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula"),
  confirm : z.string().nonempty("É obrigatorio confirmar a senha")  
  
}).refine(({password,confirm})=> password === confirm,{
  message: "A confirmação de senha precisa corresponder com a senha.",
  path: ["confirm"]
})
