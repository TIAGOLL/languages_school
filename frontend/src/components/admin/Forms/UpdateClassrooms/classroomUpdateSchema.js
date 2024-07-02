import { z } from "zod";

export const classroomUpdateSchema = z.object({
	book: z.number({ required_error: "Selecione um book" }),
	course: z.number({ required_error: "Selecione um curso" }),
	date: z.string({ required_error: "Selecione o dia" }),
	hour: z.string().min(1, "Selecione a hora"),
});
