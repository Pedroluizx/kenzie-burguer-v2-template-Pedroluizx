import { z } from "zod";

export const loginFormSchema = z.object({

  email: z.string().nonempty("Insira um email"),
  password: z.string().nonempty("Insira uma senha")
})