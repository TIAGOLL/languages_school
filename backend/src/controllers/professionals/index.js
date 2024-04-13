const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("bcrypt");

const professionals = {
  GetCourseById: async (req, res) => {
    const { id } = req.params;
    await prisma.courses
      .findFirst({
        where: {
          id: parseInt(id),
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

  DeleteRegistration: async (req, res) => {
    const { id } = req.params;
    await prisma
      .$transaction(async (trx) => {
        // verifica se a matricula ja teve movimentação financeira
        const monthly_fees = await trx.monthly_fee.findMany({
          where: { registrations_id: parseInt(id) },
        });
        monthly_fees.map((item) => {
          if (item.paid) {
            throw new Error(
              "Não é possível deletar uma matricula com mensalidades pagas!"
            );
          }
        });

        // pega a matricula
        const registration = await trx.registrations.findFirst({
          where: {
            id: parseInt(id),
          },
          include: {
            students: {
              select: {
                id: true,
              },
            },
          },
        });

        // decrementa o valor total pago mensalmente pelo estudante se a matricula ainda não esta trancada
        if (!registration.locked) {
          await trx.students.update({
            where: {
              id: registration.students.id,
            },
            data: {
              amount_paid_for_month: {
                decrement: registration.monthly_fee_amount,
              },
            },
          });
        }

        // deleta as mensalidades não pagas
        await trx.monthly_fee.deleteMany({
          where: {
            registrations_id: parseInt(id),
          },
        });

        // deleta a relação entre a matricula e a turma
        await trx.students_has_classrooms.deleteMany({
          where: {
            registrations_id: parseInt(id),
          },
        });

        // deleta a matricula
        await trx.registrations.delete({
          where: {
            id: parseInt(id),
          },
        });
      })
      .then(() => {
        return res.status(200).json({ message: "Matricula deletada!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
      });
  },

  HandleClassroom: async (req, res) => {
    const { registrationId, classroomId } = req.body;
    await prisma
      .$transaction(async (trx) => {
        // deleta a relação entre a matricula e a turma
        await trx.students_has_classrooms.deleteMany({
          where: {
            registrations_id: parseInt(registrationId),
          },
        });

        // cria a relação entre a matricula e a turma
        return await trx.students_has_classrooms.create({
          data: {
            registrations: {
              connect: {
                id: parseInt(registrationId),
              },
            },
            classrooms: {
              connect: {
                id: parseInt(classroomId),
              },
            },
          },
        });
      })
      .then(() => {
        return res.status(200).json({ message: "Sala trocada!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao mudar sala!" });
      });
  },

  UpdateCourse: async (req, res) => {
    const { id, name, price } = req.body;
    const course = prisma.courses.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        price: parseFloat(price),
      },
    });

    await prisma
      .$transaction([course])
      .then(() => {
        return res.status(200).json({ message: "Curso atualizado!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao atualizar curso!" });
      });
  },

  DeleteCourse: async (req, res) => {
    const { id } = req.body;

    if (
      await prisma.classrooms.findFirst({
        where: { books: { courses_id: parseInt(id) } },
      })
    ) {
      return res.status(400).json({
        message: "Delete as TURMAS associadas a esse curso antes de exclui-lo!",
      });
    }

    if (
      await prisma.books.findFirst({
        where: { courses_id: parseInt(id) },
      })
    ) {
      return res.status(400).json({
        message: "Delete os BOOKS associados a esse curso antes de exclui-lo!",
      });
    }

    const course = prisma.courses.delete({
      where: {
        id: parseInt(id),
      },
    });

    await prisma
      .$transaction([course])
      .then(() => {
        return res.status(200).json({ message: "Curso deletado!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao deletar curso!" });
      });
  },

  DeleteClassroom: async (req, res) => {
    const { id } = req.body;

    if (
      await prisma.registrations.findFirst({
        where: { classrooms_id: parseInt(id) },
      })
    ) {
      return res.status(400).json({
        message:
          "Delete as MATRICULAS associadas a essa turma antes de exclui-la!",
      });
    }

    const classroom = prisma.classrooms.delete({
      where: {
        id: parseInt(id),
      },
    });

    await prisma
      .$transaction([classroom])
      .then(() => {
        return res.status(200).json({ message: "Turma deletada!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao deletar turma!" });
      });
  },

  UpdateClassroom: async (req, res) => {
    const { id, date, hour, book } = req.body;

    const classroom = prisma.classrooms.update({
      where: {
        id: parseInt(id),
      },
      data: {
        date: date,
        hour: hour,
        books: {
          connect: {
            id: parseInt(book),
          },
        },
      },
    });

    await prisma
      .$transaction([classroom])
      .then(() => {
        return res.status(200).json({ message: "Turma atualizada!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao atualizar turma!" });
      });
  },

  CreateClassroom: async (req, res) => {
    const { date, hour, book } = req.body;

    const classroom = prisma.classrooms.create({
      data: {
        date: date,
        hour: hour,
        books: {
          connect: {
            id: parseInt(book),
          },
        },
      },
    });

    await prisma
      .$transaction([classroom])
      .then(() => {
        return res.status(200).json({ message: "Turma criada!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar turma!" });
      });
  },

  GetRegistrations: async (req, res) => {
    const registrations = await prisma.registrations.findMany({
      include: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        students_has_classrooms: {
          include: {
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
        },
        courses: true,
      },
    });
    return res.status(200).json(registrations);
  },

  GetRegistrationById: async (req, res) => {
    const { id } = req.params;

    await prisma
      .$transaction(async (trx) => {
        const courses = await trx.courses.findMany({});

        const classrooms = await trx.classrooms.findMany({});

        const registration = await trx.registrations.findFirst({
          where: {
            id: parseInt(id),
          },
          include: {
            students: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            students_has_classrooms: {
              include: {
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
            },
            courses: true,
          },
        });
        return { courses, classrooms, registration };
      })
      .then((value) => {
        return res.status(200).json(value);
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao buscar matricula!" });
      });
  },

  HandleLockRegistration: async (req, res) => {
    const { id } = req.params;

    await prisma
      .$transaction(async (trx) => {
        await trx.students.update({
          where: {
            id: (
              await prisma.registrations.findFirst({
                where: { id: parseInt(id) },
              })
            ).students_id,
          },
          data: {
            amount_paid_for_month: {
              decrement: (
                await prisma.registrations.findFirst({
                  where: { id: parseInt(id) },
                })
              ).monthly_fee_amount,
            },
          },
        });

        if (
          await trx.students_has_classrooms.findFirst({
            where: { registrations_id: parseInt(id) },
          })
        ) {
          await trx.students_has_classrooms.delete({
            where: {
              registrations_id: parseInt(id),
            },
          });
        }
        return await trx.registrations.update({
          where: {
            id: parseInt(id),
          },
          data: {
            locked: (
              await prisma.registrations.findFirst({
                where: { id: parseInt(id) },
              })
            ).locked
              ? false
              : true,
          },
        });
      })
      .then((value) => {
        return res.status(200).json({
          message: value.locked
            ? "Matricula trancada!"
            : "Matricula destrancada!",
        });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao trancar matricula!" });
      });
  },

  HandleValuePaid: async (req, res) => {
    const { id, value } = req.body;

    await prisma.$transaction(async (trx) => {
      await trx.registrations.update({
        data: {
          monthly_fee_amount: parseFloat(value),
        },
      });
    });
  },

  CreateRegistration: async (req, res) => {
    const { student, course, monthlyFeeAmount, createdBy, classroom } =
      req.body;
    let { startDate } = req.body;

    startDate = new Date(startDate);

    //verifica se o estudante esta ativo
    if (
      !(await prisma.students.findFirst({
        where: { id: parseInt(student), active: true },
      }))
    ) {
      return res.status(400).json({
        message:
          "O estudante está desativado, reative-o para matrícula-lo a algum curso!",
      });
    }

    await prisma
      .$transaction(async (trx) => {
        const { registrations_time } = await trx.configs.findFirst({
          select: {
            registrations_time: true,
          },
        });

        //pega o tempo de duração da matricula definido no banco
        let endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + parseInt(registrations_time));

        //pega o tempo de matricula e gera as mensalidades
        let monthlyFee = [];
        for (let i = 0; i < parseInt(registrations_time); i++) {
          monthlyFee.push({
            due_date: new Date(
              startDate.getFullYear(),
              startDate.getMonth() + i,
              startDate.getDate()
            ),
            amount_to_be_paid: parseFloat(monthlyFeeAmount),
          });
        }

        //atualiza o valor total pago mensalmente pelo estudante
        await trx.students.update({
          where: {
            id: parseInt(student),
          },
          data: {
            amount_paid_for_month: {
              increment: parseFloat(monthlyFeeAmount),
            },
          },
        });

        //cria a matricula
        await trx.registrations.create({
          data: {
            students: {
              connect: {
                id: parseInt(student),
              },
            },
            courses: {
              connect: {
                id: parseInt(course),
              },
            },
            start_date: startDate,
            end_date: endDate,
            monthly_fee_amount: parseFloat(monthlyFeeAmount),
            created_by: createdBy,
            monthly_fee: {
              createMany: {
                // cria as mensalidades
                data: monthlyFee,
              },
            },
            students_has_classrooms: {
              create: {
                // cria a relação entre a matricula e a turma
                classrooms: {
                  connect: {
                    id: parseInt(classroom),
                  },
                },
              },
            },
          },
        });

        trx.students.update({
          where: {
            id: parseInt(student),
          },
          data: {
            amount_paid_for_month: {
              increment: parseFloat(monthlyFeeAmount),
            },
          },
        });
      })
      .then(() => {
        return res.status(200).json({ message: "Matricula criada!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar matricula!" });
      });
  },

  GetClassroomsById: async (req, res) => {
    const { id } = req.params;
    const classrooms = await prisma.classrooms.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        books: true,
      },
    });

    return res.status(200).json(classrooms);
  },

  GetClassrooms: async (req, res) => {
    const classrooms = await prisma.classrooms.findMany({
      include: {
        books: {
          select: {
            name: true,
            number: true,
            courses: true,
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
        id: true,
      },
    });

    const classrooms = await prisma.classrooms.findMany({
      include: {
        books: {
          include: {
            courses: true,
          },
        },
      },
    });

    const books = await prisma.books.findMany({
      include: {
        courses: true,
      },
    });

    const courses = await prisma.courses.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
    });

    return res.status(200).json({
      students: students,
      classrooms: classrooms,
      books: books,
      courses: courses,
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

    // verifica se o estudante tem matriculas ativas
    if (await prisma.registrations.findFirst({ where: { students_id: id } })) {
      return res.status(400).json({
        message: "O estudante possui matriculas ativas, desative-as antes!",
      });
    }

    await prisma
      .$transaction(async (trx) => {
        // desativa o estudante e seu endereço
        await trx.students.update({
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
        });
      })
      .then(() => {
        return res.status(200).json({ message: "Estudante desativado!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao deletar estudante!" });
      });
  },

  DeleteStudent: async (req, res) => {
    const { id } = req.body;

    // verifica se o estudante tem matriculas ativas
    if (await prisma.registrations.findFirst({ where: { students_id: id } })) {
      return res.status(400).json({
        message: "O estudante possui matriculas ativas, exclua elas antes!",
      });
    }

    prisma
      .$transaction(async (trx) => {
        // deleta o estudante e seu endereço
        await prisma.students.delete({
          where: {
            id: parseInt(id),
          },
          include: {
            adresses: true,
          },
        });
      })
      .then(() => {
        return res.status(200).json({ message: "Estudante deletado!" });
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
    const courses = await prisma.courses.findMany({
      include: {
        books: true,
        registrations: true,
      },
    });

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
        return res.status(200).json({ message: "Curso criado!" });
      })
      .catch((error) => {
        console.error(error.message);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar curso!" });
      });
  },

  GetActiveStudents: async (req, res) => {
    if (!req.query.course) {
      const students = await prisma.students
        .findMany({
          where: {
            active: true,
            name: {
              contains: req.query.name,
            },
            email: {
              contains: req.query.email,
            },
          },
          include: {
            registrations: {
              include: {
                courses: true,
              },
            },
          },
          orderBy: {
            registrations: {
              _count: "desc",
            },
          },
        })
        .catch((error) => console.log(error));

      return res.status(200).json({ students: students });
    }
    if (req.query.course) {
      const students = await prisma.students
        .findMany({
          where: {
            active: true,
            registrations: {
              some: {
                courses: {
                  name: {
                    contains: req.query.course,
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
            cpf: true,
            amount_paid_for_month: true,
            id: true,
            name: true,
            adresses_id: true,
            user: true,
            registrations: {
              include: {
                courses: true,
              },
            },
          },
          orderBy: {
            registrations: {
              _count: "desc",
            },
          },
        })
        .catch((error) => console.log(error));

      return res.status(200).json({ students: students });
    }
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
      .json({ response: student, message: "Estudante criado!" });
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
      message: "Estudante atualizado!",
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
      message: "Senha atualizada!",
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
          registrations: {
            include: {
              students_has_classrooms: {
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
