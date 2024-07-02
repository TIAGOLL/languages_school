import { z } from "zod";

export const createClassroomSchema = z.object({
	book: z.string({ required_error: "Selecione um livro" }),
	course: z.string({ required_error: "Selecione um curso" }),
	date: z.string({ required_error: "Selecione o dia" }),
	hour: z.string({ required_error: "Selecione a hora" }).min(1, "Selecione a hora"),
});
