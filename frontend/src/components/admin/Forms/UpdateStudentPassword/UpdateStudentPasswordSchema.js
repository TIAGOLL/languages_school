import { z } from "zod";

export const UpdateStudentPasswordSchema = z.object({
  password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
	email: z.string().email("Email inválido"),
})