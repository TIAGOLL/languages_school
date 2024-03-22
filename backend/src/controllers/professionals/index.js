const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("bcrypt");

const professionals = {
  CreateClassroom: async (req, res) => {
    const { date, hour, book, course } = req.body;

    const classroom = prisma.classrooms.create({
      data: {
        date: date,
        hour: hour,
        books: {
          connect: {
            id: parseInt(book),
          },
        },
        courses: {
          connect: {
            id: parseInt(course),
          },
        },
      },
    });

    await prisma
      .$transaction([classroom])
      .then(() => {
        return res.status(200).json({ message: "Turma criada com sucesso!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar turma!" });
      });
  },

  GetRegistrations: async (req, res) => {
    const registrations = await prisma.registration.findMany({
      include: {
        students: {
          select: {
            name: true,
            email: true,
          },
        },
        classrooms: {
          select: {
            date: true,
            hour: true,
            books: {
              select: {
                name: true,
                number: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(registrations);
  },

  CreateRegistration: async (req, res) => {
    const {
      student,
      classroom,
      registrationTime,
      startDate,
      endDate,
      monthlyFeeAmount,
      createBy,
    } = req.body;

    const registration = prisma.registration.create({
      data: {
        students: {
          connect: {
            id: parseInt(student),
          },
        },
        classrooms: {
          connect: {
            id: parseInt(classroom),
          },
        },
        registration_time: registrationTime,
        start_date: startDate,
        end_date: endDate,
        monthly_fee_amount: monthlyFeeAmount,
        created_by: createBy,
      },
    });

    await prisma
      .$transaction([registration])
      .then(() => {
        return res
          .status(200)
          .json({ message: "Matricula criada com sucesso!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar matricula!" });
      });
  },

  GetClassrooms: async (req, res) => {
    const classrooms = await prisma.classrooms.findMany({
      include: {
        books: {
          select: {
            name: true,
            number: true,
          },
        },
        courses: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json(classrooms);
  },

  GetInfoForCreateRegistration: async (req, res) => {
    const students = await prisma.students.findMany({
      select: {
        user: true,
        name: true,
        email: true,
      },
    });

    const classrooms = await prisma.classrooms.findMany({
      select: {
        id: true,
        date: true,
        hour: true,
        books_id: true,
      },
    });

    const books = await prisma.books.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const courses = await prisma.courses.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return res.status(200).json({
      students: students,
      classrooms: classrooms,
      books: books,
      courses: courses,
    });
  },

  CreateRegistration: async (req, res) => {
    const { student, classroom, course, book, createdBy, amountpaid } =
      req.body;

    const registration = await prisma.registration.create({
      data: {
        students: {
          connect: {
            id: parseInt(student),
          },
        },
        classrooms: {
          connect: {
            id: parseInt(classroom),
          },
        },
        amountpaid: amountpaid,
        created_by: createdBy,
      },
    });

    prisma
      .$transaction([registration])
      .then(() => {
        return res
          .status(200)
          .json({ message: "Matricula criada com suscesso!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro criar a matricula!" });
      });
  },

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

    await prisma.students
      .update({
        where: {
          id: id,
        },
        data: {
          active: false,
          adresses: {
            update: {
              active: false,
            },
          },
        },
      })
      .then(() => {
        return res
          .status(200)
          .json({ message: "Estudante desativado com sucesso!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao deletar estudante!" });
      });
  },

  DeleteStudent: async (req, res) => {
    const { id, adresses_id } = req.body;
    console.log(req.body);
    const deleteStudent = prisma.students.delete({
      where: {
        id: parseInt(id),
      },
    });

    const deleteAdress = prisma.adresses.delete({
      where: {
        id: parseInt(adresses_id),
      },
    });

    prisma
      .$transaction([deleteStudent, deleteAdress])
      .then(() => {
        return res
          .status(200)
          .json({ message: "Estudante deletado com sucesso!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao deletar estudante!" });
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

  GetCourses: async (req, res) => {
    const courses = await prisma.courses.findMany({});
    return res.status(200).json(courses);
  },
  CreateCourse: async (req, res) => {
    const { name, price } = req.body;
    console.log(req.body);
    const createCourse = prisma.courses.create({
      data: {
        name: name,
        price: parseFloat(price),
      },
    });
    prisma
      .$transaction([createCourse])
      .then(() => {
        return res.status(200).json({ message: "Curso criado com sucesso!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar curso!" });
      });
  },

  GetActiveStudents: async (req, res) => {
    const students = await prisma.students
      .findMany({
        where: {
          active: true,
          registration: {
            every: {
              classrooms: {
                books: {
                  name: {
                    contains: req.query.book,
                  },
                },
              },
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
          id: true,
          name: true,
          adresses_id: true,
          user: true,
          registration: {
            select: {
              classrooms: {
                include: {
                  books: {
                    select: {
                      name: true,
                      number: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .catch((error) => console.log(error));

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
      createdBy,
      password,
      user,
      number,
    } = req.body;

    const passwordHash = await hash(password, 6);
    const student = await prisma.students
      .create({
        data: {
          password: passwordHash,
          name: firstName + " " + lastName,
          user: user,
          email: email + "@school.com",
          first_name: firstName,
          last_name: lastName,
          cpf: cpf,
          phone: phone,
          date_of_birth: dateOfBirth,
          gender: gender,
          created_by: createdBy,
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
      registration,
      city,
      state,
      street,
      district,
      complement,
      zipCode,
      number,
      updatedBy,
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
        updated_by: updatedBy,
        updated_at: new Date(),
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
        registration: {
          connect: {
            id: parseInt(registration),
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

  UpdateProfessionalPassword: async (req, res) => {
    const { email, password } = req.body;

    const passwordHash = await hash(password, 6);

    await prisma.professionals.update({
      where: {
        email: email,
      },
      data: {
        password: passwordHash,
      },
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
          registration: {
            include: {
              classrooms: {
                include: {
                  books: {
                    select: {
                      name: true,
                      number: true,
                    },
                  },
                },
              },
            },
          },
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
