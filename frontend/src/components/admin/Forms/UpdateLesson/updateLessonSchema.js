import { z } from "zod";

export const updateLessonSchema = z.object({
	id: z.number({ invalid_type_error: "Um ID deve ser selecionado" }),
	name: z
		.string()
		.min(3, {
			message: "O nome deve ter no mínimo 3 caracteres",
		})
		.trim(),
	position: z.number({ invalid_type_error: "Digite um número" }),
	url: z
		.string()
		.url({
			message: "Digite uma URL válida",
		})
		.trim(),
});
