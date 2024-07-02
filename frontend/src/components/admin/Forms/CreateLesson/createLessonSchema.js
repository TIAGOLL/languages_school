import { z } from "zod";

export const createLessonSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: "O nome deve ter no mínimo 3 caracteres",
		})
		.trim(),
	position: z.number({ invalid_type_error: "Digite um número" }),
	url: z
		.string()
		.min(1, {
			message: "Digite uma URL",
		})
		.url({
			message: "Digite uma URL válida",
		})
		.trim(),
	book: z.number({ invalid_type_error: "Um livro deve ser selecionado" }),
});
