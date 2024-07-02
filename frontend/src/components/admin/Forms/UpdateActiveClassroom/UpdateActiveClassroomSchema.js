import { z } from "zod";

export const UpdateActiveClassroomSchema = z.object({
	classroom: z.number().int().positive(),
	registration: z.number().int().positive(),
});
