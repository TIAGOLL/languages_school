const { PrismaClient } = require("@prisma/client");
const { compare, hash } = require("bcrypt");
const prisma = new PrismaClient();
const auth = {
  SignIn: async (req, res) => {
    try {
      const { user, password } = req.params;

      const students = await prisma.students.findFirst({
        where: { user: user },
      });
      const professionals = await prisma.professionals.findFirst({
        where: { user: user },
      });

      if (!students && !professionals) {
        throw new Error("Usúario não encontrado!");
      }

      if (students) {
        if (await compare(password, students.password)) {
          return res.status(200).send(students);
        }
      }

      if (professionals) {
        if (await compare(password, professionals.password)) {
          return res.status(200).send(professionals);
        }
      }

      throw new Error("Usúario ou senha inválidos!");
    } catch (error) {
      res.status(500).send({ message: error.message, error: error });
    }
  },
};

module.exports = { auth };
