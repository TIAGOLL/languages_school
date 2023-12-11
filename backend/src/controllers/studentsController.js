var { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default {
  async findAllStudents(req, res) {
    const students = await prisma.students.findMany();
    res.json(students);
  },

  async updateStudent(req, res) {
    const body = req.body;

    try {
      prisma.students
        .update({
          where: {
            googleId: body.googleId,
          },
          data: {
            googleId: body.googleId,
            name: body.name,
            cpf: body.cpf,
            phone: body.phone,
            gender: body.gender,
            dateOfBirth: new Date(body.dateOfBirth).toISOString(),
            books_id: body.books_id,
          },
        })
        .then((response) => {
          console.log(response);
          res.json({ body: body, message: "Úsuario atualizado com suscesso!" });
        })
        .catch((error) => {
          console.log(error);
          res.json({ body: body, message: "Erro ao atualizar o úsuario!" });
        });
    } catch (error) {
      res.json({ body: body, message: "Erro ao atualizar o úsuario!" });
    }

    return;
  },

  async findStudentsByEmail(req, res) {
    const { email } = req.params;
    await prisma.students
      .findFirst({
        where: {
          email: email,
        },
        include: {
          books: true,
        },
      })
      .then((response) => {
        return res.json(response);
      })
      .catch((error) => {
        res.json({
          message: "Erro ao buscar o úsuario!",
          error: error.message,
        });
      });
  },
};
