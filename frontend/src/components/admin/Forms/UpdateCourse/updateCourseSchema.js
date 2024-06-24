import { z } from "zod";

export const updatedCourseSchema = z.object({
	id: z
		.string()
		.min(1, {
			message: "Um id não foi selecionado",
		})
		.or(
			z.number().min(1, {
				message: "Um id não foi selecionado",
			})
		),
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
		.or(
			z.number().min(1, {
				message: "Digite um preço",
			})
		),
});