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
};

module.exports = { students };
