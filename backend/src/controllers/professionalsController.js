import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async loadData(req, res) {
    try {
      const states = await prisma.states
        .findMany({
          include: {
            cities: true,
          },
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          res.json({ message: error });
        });

      const occupations = await prisma.occupations
        .findMany({})
        .then((data) => {
          return data;
        })
        .catch((error) => {
          res.json({ message: error });
        });

      return res.json({ states: states, occupations: occupations });
    } catch (error) {
      res.json({ message: error });
    }
  },
};
