const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const students = {
  GetBook: async (req, res) => {
    const { email, course } = req.params;
    const book = await prisma.students.findFirst({
      where: {
        email: email,
        registrations: {
          some: {
            students_has_classrooms: {
              classrooms: {
                books: {
                  courses: {
                    id: parseInt(course),
                  },
                },
              },
            },
          },
        },
      },
      select: {
        registrations: {
          include: {
            students_has_classrooms: {
              include: {
                classrooms: {
                  include: {
                    books: {
                      select: { position: true, name: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.status(200).json(book.books);
  },

  GetUrlLesson: async (req, res) => {
    const { book, lesson } = req.params;

    const url = await prisma.lessons.findFirst({
      where: {
        books_id: parseInt(book),
        id: parseInt(lesson),
      },
      select: {
        url: true,
      },
    });

    return res.status(200).json(url);
  },

  GetInfoOfStudent: async (req, res) => {
    const { email } = req.params;

    const student = await prisma.students.findFirst({
      where: {
        email: email,
      },
      select: {
        name: true,
        email: true,
        avatar_url: true,
        registrations: {
          include: {
            courses: true,
            students_has_classrooms: {
              include: {
                classrooms: {
                  include: {
                    books: {
                      include: { lessons: true, courses: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const books = student.registrations.map((registration) => {
      return registration.students_has_classrooms.classrooms.books;
    });

    return res.status(200).json({ ...student, books });
  },

  UploadPhoto: async (req, res) => {
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
