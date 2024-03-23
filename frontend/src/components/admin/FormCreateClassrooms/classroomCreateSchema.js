import { z } from "zod";

export const classroomCreateSchema = z.object({
	book: z.string().min(1, "Selecione um book"),
	course: z.string().min(1, "Selecione um curso"),
	date: z.string().min(1, "Selecione o dia"),
	hour: z.string().min(1, "Selecione a hora"),
});
