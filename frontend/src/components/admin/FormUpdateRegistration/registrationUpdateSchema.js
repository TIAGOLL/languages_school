// import { z } from "zod";

// export const registrationCreateSchema = z.object({
// 	student: z.string().min(1, "Selecione um estudante").or(z.number().min(1, "Selecione um estudante")),
// 	course: z.string().min(1, "Selecione um curso"),
// 	startDate: z
// 		.string()
// 		.min(1, "Selecione uma data")
// 		.or(z.date().min(new Date(-100000000), "Selecione uma data de início")),
// 	classroom: z.string().min(1, "Selecione uma turma"),
// 	monthlyFeeAmount: z.string().or(z.number().min(1, "Selecione um estudante")),
// 	discount: z.string().min(1, "Se ouver desconto, informe, se não, informe 0"),
// });
