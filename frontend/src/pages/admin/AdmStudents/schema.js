import { z } from "zod";

export const studentSchema = z.object({
  email: z
    .string()
    .max(45, "Máximo 45 caracteres")
    .min(1, "Preencha o email")
    .trim(),
  firstName: z.string().min(1, "Preencha o primeiro nome").trim(),
  password: z.string().trim(),
  lastName: z.string().min(1, "Preencha o sobrenome").trim(),
  cpf: z
    .string()
    .max(11, "O CPF deve ter 11 digitos")
    .min(11, "O CPF deve ter 11 digitos")
    .trim(),
  phone: z
    .string()
    .max(11, "O telefone deve ter 11 digitos")
    .min(11, "O telefone deve ter 11 digitos")
    .trim(),
  dateOfBirth: z.date().refine((data) => {
    return data < new Date();
  }, "A data de nascimento deve ser menor que a data atual"),
  gender: z.string().min(1, "Preencha o gênero").trim(),
  book: z.string().min(1, "Preencha o livro").trim(),
  city: z.string().min(1, "Preencha a cidade").trim(),
  state: z.string().min(1, "Preencha o estado").trim(),
  street: z.string().min(1, "Preencha a rua").trim(),
  district: z.string().min(1, "Preencha o bairro").trim(),
  complement: z.string().min(1, "Preencha o complemento").trim(),
  zipCode: z
    .string()
    .max(8, "O CEP deve ter 8 digitos")
    .min(8, "O CEP deve ter 8 digitos")
    .trim(),
  id: z.string().optional(),
});
