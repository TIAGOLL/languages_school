import { z } from "zod";
import { VerifyCpfExistsStudents, VerifyEmailExists } from "../../../../lib/utils";

export const studentsCreateSchema = z.object({
	email: z
		.string()
		.max(45, "Máximo 45 caracteres")
		.min(1, "Preencha o email")
		.trim()
		.refine(async (email) => {
			return await VerifyEmailExists(email + "@school.com");
		}, "Email já existe"),
	firstName: z.string().min(1, "Preencha o primeiro nome").trim(),
	user: z.string().min(1, "Preencha o usuário").trim(),
	password: z.string().min(1, "Preencha a senha").trim(),
	lastName: z.string().min(1, "Preencha o sobrenome").trim(),
	number: z.number({ invalid_type_error: "Preencha o número" }).positive("O número deve ser acima de 0"),
	cpf: z
		.string()
		.max(14, "O CPF deve ter 11 digitos")
		.min(14, "O CPF deve ter 11 digitos")
		.refine(async (cpf) => {
			cpf = cpf.replace(/[^a-zA-Z0-9]/g, "");
			return await VerifyCpfExistsStudents(cpf);
		}, "CPF já cadastrado"),
	phone: z.string().max(11, "O telefone deve ter 11 digitos").min(11, "O telefone deve ter 11 digitos").trim(),
	dateOfBirth: z.date().refine((data) => {
		return new Date(data) < new Date();
	}, "A data de nascimento deve ser menor que a data atual"),
	gender: z.string({ required_error: "Preencha o gênero" }).trim(),
	city: z.string().min(1, "Preencha a cidade").trim(),
	state: z.string().min(1, "Preencha o estado").trim(),
	street: z.string().min(1, "Preencha a rua").trim(),
	district: z.string().min(1, "Preencha o bairro").trim(),
	complement: z.string().min(1, "Preencha o complemento").trim(),
	zipCode: z.string().max(8, "O CEP deve ter 8 digitos").min(8, "O CEP deve ter 8 digitos").trim(),
});
