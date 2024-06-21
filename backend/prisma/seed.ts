const { PrismaClient } = require("@prisma/client");
const { createSeedClient } = require("@snaplet/seed");
const prisma = new PrismaClient();

const main = async () => {
  console.log("Start seeding...");
  const seed = await createSeedClient();

  await seed.$resetDatabase();

  const { courses } = await seed.courses((x) =>
    x(20, ({ seed }) => ({ name: `curso${seed.substring(10, 12)}` }))
  );

  const { books } = await seed.books((x) => x(400), { connect: { courses } });

  const { classrooms } = await seed.classrooms((x) => x(1000), {
    connect: { books },
  });

  const { adresses } = await seed.adresses((x) => x(1000));

  const { students } = await seed.students((x) =>
    x(1000, ({ seed }) => ({ cpf: `12345678${seed.substring(11, 14)}` }))
  );

  const { registrations } = await seed.registrations((x) => x(500), {
    connect: { students, courses },
  });

  const { students_has_classrooms } = await seed.students_has_classrooms(
    (x) => x(490),
    {
      connect: { registrations, classrooms },
    }
  );

  const { professionals } = await seed.professionals((x) =>
    x(1000, ({ seed }) => ({ cpf: `12345678${seed.substring(16, 19)}` }))
  );

  // define os cargos
  await prisma.$executeRaw`insert into role(id, name) values (1, 'Professor');`;
  await prisma.$executeRaw`insert into role(id, name) values (2, 'Secretário');`;

  // define o primeiro usuário como administrador
  await prisma.$executeRaw`insert into professionals(cpf, name, first_name, last_name, email, phone, gender, date_of_birth, admin, role_id, user, password, adresses_id) values ('00000000000', "teste", 'Teste', 'teste', 'teste@school.com', '00000000000', 'M', '2000-09-7', 1, 1, "teste", "$2b$06$m416xpOaQ5qjUYzfPyjHLO6gpV/8S3tPjxjze9FwtYAAqrKsnsTmi", 2);`;

  // define as configurações iniciais
  await prisma.$executeRaw`INSERT INTO configs(id, registrations_time) VALUES (1, 6);`;

  console.log("Database seeded successfully!");

  process.exit();
};

main();
