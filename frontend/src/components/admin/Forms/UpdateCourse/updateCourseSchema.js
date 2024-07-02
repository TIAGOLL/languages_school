import { z } from "zod";

export const updatedCourseSchema = z.object({
	id: z.number({ invalid_type_error: "Um ID não foi selecionado" }),
	name: z
		.string()
		.min(3, {
			message: "O nome deve ter no mínimo 3 caracteres",
		})
		.trim(),
	price: z.number({ invalid_type_error: "Digite um número" }).min(1, {
		message: "Digite um preço",
	}),
});
