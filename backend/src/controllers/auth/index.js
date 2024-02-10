import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const auth = {
  GetInfoForAuth: async (req, res) => {
    const { id } = req.params;

    const user =
      (await prisma.students
        .findFirst({
          where: {
            id: id,
          },
          select: {
            first_name: true,
            avatar_url: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            error: err.message,
            message: "Erro ao buscar informações do usuário",
          });
        })) ||
      (await prisma.professionals
        .findFirst({
          where: {
            id: id,
          },
          select: {
            first_name: true,
            avatar_url: true,
            admin: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            error: err.message,
            message: "Erro ao buscar informações do usuário",
          });
        }));
    return res.status(200).json({
      user: { ...user, admin: user?.admin ? 1 : 0 },
      message: "Dados carregados com sucesso",
    });
  },
};
