const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("bcrypt");

const professionals = {
  GetEmails: async (req, res) => {
    const emails = await prisma.professionals.findMany({
      select: {
        email: true,
      },
    });
    return res.status(200).json(emails);
  },

  DesactiveStudent: async (req, res) => {
    const { id } = req.body;

    await prisma.students.update({
      where: {
        id: id,
      },
      data: {
        active: false,
        adresses: {
          update: {},
        },
      },
    });
  },

  DeleteStudent: async (req, res) => {
    const { id } = req.params;

    await prisma.students
      .delete({
        where: {
          id: parseInt(id),
        },
        include: {
          adresses: true,
        },
      })
      .then((value) => {
        return res.status(200).json(value);
      });
  },

  GetUsers: async (req, res) => {
    const users = await prisma.professionals.findMany({
      select: {
        user: true,
      },
    });
    return res.status(200).json(users);
  },

  GetStudentEmails: async (req, res) => {
    const emails = await prisma.students.findMany({
      select: {
        email: true,
      },
    });

    return res.status(200).json(emails);
  },

  UpdateUrlPhoto: async (req, res) => {
    const { id, avatar_url } = req.body;

    const user = await prisma.professionals.update({
      where: {
        id: id,
      },
      data: {
        avatar_url: avatar_url,
      },
    });

    return res.status(200).json(user);
  },

  GetActiveStudents: async (req, res) => {
    console.log(req.query);
    const students = await prisma.students
      .findMany({
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
              number: true,
            },
          },
        },
      })
      .catch((error) => console.log(error));
    console.log(students);

    return res.status(200).json({ students: students });
  },

  CreateStudent: async (req, res) => {
    const {
      email,
      firstName,
      lastName,
      cpf,
      phone,
      dateOfBirth,
      gender,
      book,
      city,
      state,
      street,
      district,
      complement,
      zipCode,
      CreatedBy,
      password,
      user,
      number,
    } = req.body;

    const passwordHash = await hash(password, 6);
    const student = await prisma.students
      .create({
        data: {
          password: passwordHash,
          user: user,
          email: email + "@school.com",
          first_name: firstName,
          last_name: lastName,
          cpf: cpf,
          phone: phone,
          date_of_birth: dateOfBirth,
          gender: gender,
          created_by: CreatedBy,
          adresses: {
            create: {
              city: city,
              state: state,
              street: street,
              district: district,
              complement: complement,
              zip_code: zipCode,
              number: number,
            },
          },
          books: {
            connect: {
              id: parseInt(book),
            },
          },
        },
      })
      .catch((error) => {
        console.error(error.message);

        return res.status(500).json({ message: error.message });
      });
    return res
      .status(200)
      .json({ response: student, message: "Estudante criado com sucesso!" });
  },

  UpdateStudent: async (req, res) => {
    const {
      id,
      firstName,
      lastName,
      cpf,
      phone,
      dateOfBirth,
      gender,
      book,
      city,
      state,
      street,
      district,
      complement,
      zipCode,
      CreatedBy,
      number,
    } = req.body;

    const student = await prisma.students.update({
      where: {
        id: id,
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        cpf: cpf,
        phone: phone,
        date_of_birth: dateOfBirth,
        gender: gender,
        created_by: CreatedBy,
        adresses: {
          update: {
            data: {
              city: city,
              state: state,
              street: street,
              district: district,
              complement: complement,
              zip_code: zipCode,
              number: number,
            },
          },
        },
        books: {
          connect: {
            id: parseInt(book),
          },
        },
      },
    });
    return res.status(200).json({
      response: student,
      message: "Estudante atualizado com sucesso!",
    });
  },

  UpdateStudentPassword: async (req, res) => {
    const { email, password } = req.body;

    const passwordHash = await hash(password, 6);

    const student = await prisma.students
      .update({
        where: {
          email: email,
        },
        data: {
          password: passwordHash,
        },
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao salvar", error: error.message });
      });

    return res.status(200).json({
      data: student,
      message: "Senha atualizada com sucesso!",
    });
  },

  GetStudentByEmail: async (req, res) => {
    const { email } = req.params;

    await prisma.students
      .findFirst({
        where: {
          email: email,
        },
        include: {
          books: true,
          adresses: true,
        },
      })
      .then((value) => {
        return res.status(200).json(value);
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500);
      });
  },

  GetStudentUsers: async (req, res) => {
    const users = await prisma.students.findMany({
      select: {
        user: true,
      },
    });

    return res.status(200).json(users);
  },
};

module.exports = { professionals };
