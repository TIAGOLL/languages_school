import { z } from "zod";

export const studentSchema = z.object({
  email: z.string().email("Digite um email válido").trim(),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres").trim(),
  firstName: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  lastName: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
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
  gender: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  book: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  city: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  state: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  street: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  district: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  complement: z.string().min(1, "Digite no mínimo 1 caracter").trim(),
  zipCode: z
    .string()
    .max(8, "O CEP deve ter 8 digitos")
    .min(8, "O CEP deve ter 8 digitos")
    .trim(),
  id: z.string().optional(),
});
