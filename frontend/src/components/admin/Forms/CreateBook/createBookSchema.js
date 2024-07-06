import { z } from "zod";

export const createBookSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: "O nome deve ter no mínimo 3 caracteres",
		})
		.trim(),
	position: z.number({ invalid_type_error: "Digite um número" }).int().min(1, { message: "A posição deve ser maior que 0" }),
	course: z.number({ invalid_type_error: "Um curso deve ser selecionado" }),
});
