import { z } from "zod";

export const courseUpdateSchema = z.object({
	course: z.object({
		name: z
			.string()
			.min(3, {
				message: "O nome deve ter no mínimo 3 caracteres",
			})
			.trim(),
		price: z
			.string()
			.min(1, {
				message: "Digite um preço",
			})
			.trim()
			.or(z.number(), {
				message: "Digite um número",
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
				position: z
					.string()
					.min(1, {
						message: "Digite uma posição",
					})
					.trim()
					.or(z.number(), {
						message: "Digite um número",
					}),
			})
		)
		.min(1, {
			message: "Adicione pelo menos um livro",
		}),
});
