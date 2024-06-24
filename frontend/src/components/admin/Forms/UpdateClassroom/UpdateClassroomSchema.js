import { z } from "zod";

export const UpdateClassroomSchema = z.object({
	classroom: z.number().int().positive(),
	registration: z.number().int().positive(),
});
