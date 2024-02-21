import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const professionals = {
  updateUrlPhoto: async (req, res) => {
    const { id, avatar_url } = req.body;

    const user = await prisma.professionals.update({
      where: {
        id: id,
      },
      data: {
        avatar_url: avatar_url,
      },
    });

    return res.status(200).json(user);
  },
};
