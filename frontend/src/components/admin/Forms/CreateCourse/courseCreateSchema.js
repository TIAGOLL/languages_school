import { z } from "zod";

export const courseCreateSchema = z.object({
	course: z.object({
		name: z
			.string()
			.min(3, {
				message: "O nome deve ter no mínimo 3 caracteres",
			})
			.trim(),
		price: z.number({ invalid_type_error: "Digite um número" }).positive({
			message: "O preço deve ser maior que 0",
		}),
	}),
	books: z
		.array(
			z.object({
				name: z
					.string()
					.min(3, {
						message: "O nome deve ter no mínimo 3 caracteres",
					})
					.trim(),
				position: z.number({ invalid_type_error: "Digite um número" }).positive({
					message: "A posição deve ser maior que 0",
				}),
			})
		)
		.min(1, {
			message: "Adicione pelo menos um livro",
		}),
});
