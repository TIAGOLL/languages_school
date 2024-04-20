import { z } from "zod";

export const courseCreateSchema = z.object({
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
			.trim(),
	}),
	books: z.array(
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
				.trim(),
		})
	).min(1, {
		message: "Adicione pelo menos um livro",
	}),
});
