import { z } from "zod";

export const SchemaUpdateProfessionalPassword = z.object({
	email: z.string().min(1, "Preencha o campo de e-mail").email("Preencha um e-mail válido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
