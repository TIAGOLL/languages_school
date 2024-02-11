import { PrismaClient } from "@prisma/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../services/auth";
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

  CreateStudent: async (req, res) => {
    const {
      email,
      password,
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
    } = req.body;

    const uid = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        return value.user.uid;
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
    if (uid) {
      const student = await prisma.students.create({
        data: {
          id: uid,
          email: email,
          first_name: firstName,
          last_name: lastName,
          cpf: cpf,
          phone: phone,
          date_of_birth: dateOfBirth,
          gender: gender,
          adresses: {
            connectOrCreate: {
              where: {
                students_id: uid,
              },
              create: {
                city: city,
                state: state,
                street: street,
                district: district,
                complement: complement,
                zip_code: zipCode,
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
      return res
        .status(200)
        .json({ response: student, message: "Estudante criado com sucesso!" });
    }
  },

  UpdateStudent: async (req, res) => {
    const {
      id,
      password,
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
        adresses: {
          update: {
            where: {
              students_id: id,
            },
            data: {
              city: city,
              state: state,
              street: street,
              district: district,
              complement: complement,
              zip_code: zipCode,
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

  GetStudentByEmail: async (req, res) => {
    const { email } = req.params;

    const student = await prisma.students
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
      });
  },
};
