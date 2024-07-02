import { z } from "zod";

export const studentsUpdateSchema = z.object({
	email: z.string(),
	firstName: z.string().min(1, "Preencha o primeiro nome").trim(),
	user: z.string(),
	lastName: z.string().min(1, "Preencha o sobrenome").trim(),
	number: z.number({ invalid_type_error: "Preencha com um número" }).positive("O número deve ser acima de 0"),
	cpf: z.string().max(14, "O CPF deve ter 11 digitos").min(14, "O CPF deve ter 11 digitos"),
	phone: z.string().max(11, "O telefone deve ter 11 digitos").min(11, "O telefone deve ter 11 digitos").trim(),
	dateOfBirth: z.date().refine((data) => {
		return new Date(data) <= new Date();
	}, "A data de nascimento deve ser menor que a data atual"),
	gender: z.string().min(1, "Preencha o gênero").trim(),
	city: z.string().min(1, "Preencha a cidade").trim(),
	state: z.string().min(1, "Preencha o estado").trim(),
	street: z.string().min(1, "Preencha a rua").trim(),
	district: z.string().min(1, "Preencha o bairro").trim(),
	complement: z.string().min(1, "Preencha o complemento").trim(),
	zipCode: z.string({ invalid_type_error: "Preencha com um CEP válido" }).min(8, "O CEP deve ter 8 digitos").max(8, "O CEP deve ter 8 digitos"),
	id: z.number(),
});
