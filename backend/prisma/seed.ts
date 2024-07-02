const { PrismaClient } = require("@prisma/client");
const { createSeedClient } = require("@snaplet/seed");
const prisma = new PrismaClient();

const main = async () => {
  console.log("Start seeding...");
  const seed = await createSeedClient();

  console.log("Resetando banco de dados...");
  await seed.$resetDatabase();

  console.log("Criando casos para testes...");
  await prisma.$executeRaw`INSERT INTO adresses (id, street,zip_code,district,complement,city,state,number) VALUES (1, "Rua dos bobos", "75765178", "Centro", "casa", "Curitiba", "Paraná", 1200);`;
  await prisma.$executeRaw`insert into students(id, cpf, name, first_name, last_name, email, phone, gender, date_of_birth,   user, password, adresses_id) values (1, '11122233344', "student", 'student', 'student', 'student@school.com', '00000000000', 'M', '2000-09-7', "teste1", "$2b$06$m416xpOaQ5qjUYzfPyjHLO6gpV/8S3tPjxjze9FwtYAAqrKsnsTmi", 1);`;
  await prisma.$executeRaw`insert into students(id, cpf, name, first_name, last_name, email, phone, gender, date_of_birth,   user, password, adresses_id) values (2001, '11122133344', "student1", 'student1', 'student1', 'student1@school.com', '00000100000', 'M', '2000-09-7', "teste2", "$2b$06$m416xpOaQ5qjUYzfPyjHLO6gpV/8S3tPjxjze9FwtYAAqrKsnsTmi", 1);`;
  await prisma.$executeRaw`INSERT INTO courses (id, name, price) values (30, "Inglês", 240);`;
  await prisma.$executeRaw`INSERT INTO courses (id, name, price) values (31, "Espanhol", 300);`;
  await prisma.$executeRaw`INSERT INTO registrations (id, start_date, end_date, monthly_fee_amount, students_id, courses_id) values (1, now(), DATE_ADD(now(),INTERVAL 6 month), 240, 1, 30);`;
  await prisma.$executeRaw`INSERT INTO registrations (id, start_date, end_date, monthly_fee_amount, students_id, courses_id) values (3, now(), DATE_ADD(now(),INTERVAL 6 month), 240, 1, 31);`;
  await prisma.$executeRaw`insert into books(id, name, position, courses_id) values (500, 'Book 1', 1, 30);`;
  await prisma.$executeRaw`INSERT INTO classrooms (id, books_id, date, hour) values (1, 500, "Segunda", "10:00");`;
  await prisma.$executeRaw`INSERT INTO students_has_classrooms (registrations_id, classrooms_id) values (1, 1);`;

  console.log("Criando cursos...");
  const { courses } = await seed.courses((x) =>
    x(20, ({ seed }) => ({
      name: `curso${seed.substring(10, 12)}`,
    }))
  );

  console.log("Criando livros...");
  const { books } = await seed.books((x) => x(400), { connect: { courses } });

  console.log("Criando lições...");
  const { lessons } = await seed.lessons((x) => x(4000), {
    connect: { books },
  });

  console.log("Criando salas de aula...");
  const { classrooms } = await seed.classrooms((x) => x(1000), {
    connect: { books },
  });

  console.log("Criando endereços...");
  const { adresses } = await seed.adresses((x) => x(1000));

  console.log("Criando alunos...");
  const { students } = await seed.students((x) =>
    x(500, ({ seed }) => ({
      cpf: () => {
        let cpf = "";
        for (let i = 0; i < 11; i++) {
          cpf += Math.floor(Math.random() * 10);
        }
        return cpf;
      },
      name: `aluno${seed.substring(11, 14)}`,
      email: `aluno${seed.substring(11, 14)}@school.com`,
      phone: `12345678${seed.substring(11, 14)}`,
    }))
  );

  console.log("Criando registros de alunos...");
  const { records_of_students } = await seed.records_of_students(
    (x) => x(2000),
    {
      connect: { students },
    }
  );

  console.log("Criando matrículas...");
  const { registrations } = await seed.registrations((x) => x(500), {
    connect: { students, courses },
  });

  const { students_has_classrooms } = await seed.students_has_classrooms(
    (x) => x(490),
    {
      connect: { registrations, classrooms },
    }
  );

  console.log("Criando profissionais...");
  const { professionals } = await seed.professionals((x) =>
    x(1000, ({ seed }) => ({ cpf: `12345678${seed.substring(16, 19)}` }))
  );

  console.log("Criando cargos...");
  await prisma.$executeRaw`insert into role(id, name) values (1, 'Professor');`;
  await prisma.$executeRaw`insert into role(id, name) values (2, 'Secretário');`;

  console.log("Criando o usuário admin...");
  await prisma.$executeRaw`insert into professionals(cpf, name, first_name, last_name, email, phone, gender, date_of_birth, admin, role_id, user, password, adresses_id) values ('00000000000', "teste", 'Teste', 'teste', 'teste@school.com', '00000000000', 'M', '2000-09-7', 1, 1, "teste", "$2b$06$m416xpOaQ5qjUYzfPyjHLO6gpV/8S3tPjxjze9FwtYAAqrKsnsTmi", 2);`;

  console.log("Criando configurações iniciais...");
  await prisma.$executeRaw`INSERT INTO configs(id, registrations_time) VALUES (1, 6);`;

  console.log("Database seeded successfully!");

  process.exit();
};

main();
