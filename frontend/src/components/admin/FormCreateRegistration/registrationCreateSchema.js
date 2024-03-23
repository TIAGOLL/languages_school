import { z } from "zod";

export const registrationCreateSchema = z.object({
	student: z.string().min(1, "Selecione um estudante"),
	course: z.string().min(1, "Selecione um curso"),
	book: z.string().min(1, "Selecione um livro"),
	classroom: z.string().min(1, "Selecione uma sala"),
	registrationTime: z.string().min(1, "Selecione um tempo de matrícula"),
	monthlyFeeAmount: z.string().min(1, "Selecione um valor para a mensalidade"),
<<<<<<< HEAD
=======
	startDate: z.date(),
	endDate: z.date(),
>>>>>>> 39c8d20d1114fd156937fbe4dea89ce82c7b053b
});
