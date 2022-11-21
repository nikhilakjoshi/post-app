import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.post.findMany();
  res.status(200).json(examples);
};

export default posts;
