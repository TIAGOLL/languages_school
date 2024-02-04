import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const students = {
  GetBookNumber: async (req, res) => {
    const { email } = req.params;

    const bookNumber = await prisma.students.findFirst({
      where: {
        email: email,
      },
      select: {
        books: {
          select: { id: true },
        },
      },
    });

    return res.status(200).json(bookNumber.books);
  },

  GetActiveStudents: async (req, res) => {
    const students = await prisma.students.findMany({
      where: {
        active: true,
        books: {
          name: {
            contains: req.query.book,
          },
        },
        name: {
          contains: req.query.name,
        },
        email: {
          contains: req.query.email,
        },
      },
      select: {
        email: true,
        name: true,
        books: {
          select: {
            name: true,
            numero: true,
          },
        },
      },
    });

    return res.status(200).json({ students: students });
  },
};
