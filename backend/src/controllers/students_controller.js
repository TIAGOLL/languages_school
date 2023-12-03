import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default {
  async find_all_students(req, res) {
    const students = await prisma.$queryRaw`SELECT * FROM students`;
    res.json(students)
  }
}
