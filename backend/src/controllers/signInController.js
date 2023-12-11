import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

  async firstLogin(req, res) {
    const { uid, email } = req.body;

    prisma.students
      .update({
        where: {
          email: email,
        },
        data: {
          googleId: uid,
        },
      })
      .then((student) => {
        res.status(200).json({ body: student });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  },
};
