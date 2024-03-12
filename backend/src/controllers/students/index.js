const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const students = {
  GetBook: async (req, res) => {
    const { email } = req.params;
    const book = await prisma.students.findFirst({
      where: {
        email: email,
      },
      select: {
        books: {
          select: { number: true, name: true },
        },
      },
    });
    return res.status(200).json(book.books);
  },

  UpdateUrlPhoto: async (req, res) => {
    const { id, avatar_url } = req.body;

    const user = await prisma.students.update({
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

module.exports = { students };
