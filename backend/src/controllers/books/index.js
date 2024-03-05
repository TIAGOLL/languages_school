const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const books = {
  GetBooks: async (req, res) => {
    const books = await prisma.books
      .findMany({
        where: {
          name: {
            contains: req.params.name ?? "",
          },
        },
      })
      .catch((error) => {
        console.error(error);
      });
    return res.status(200).json(books);
  },
};

module.exports = { books };
