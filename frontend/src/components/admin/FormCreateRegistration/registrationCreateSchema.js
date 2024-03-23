
import { z } from "zod";

export const registrationCreateSchema = z.object({
	student: z.string().min(1, "Selecione um estudante"),
	course: z.string().min(1, "Selecione um curso"),
	book: z.string().min(1, "Selecione um livro"),
	classroom: z.string().min(1, "Selecione uma sala"),
	registrationTime: z.string().min(1, "Selecione um tempo de matrícula"),
	monthlyFeeAmount: z.string().min(1, "Selecione um valor para a mensalidade"),
});
