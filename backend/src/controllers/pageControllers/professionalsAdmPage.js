import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default {
  async loadData(req, res) {
    try {
      const data = await prisma.professionals.findMany({
        include: {
          occupations: true,
          cities: true,
        },
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};
