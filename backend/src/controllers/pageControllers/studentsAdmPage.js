import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async loadData(req, res) {
    try {
      const { email } = req.params;

      const data = await prisma.students.findMany({
        where: {
          email: email,
        },
        include: {
          books: {
            include: {
              lessons: true,
            },
          },
        },
      });
      res.json(data);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
