import { z } from "zod";

export const signInSchema = z.object({
	user: z.string().max(45, "Máximo 45 caracteres").min(1, "Preencha o usúario").trim(),
	password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").trim(),
});
