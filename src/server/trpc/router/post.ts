import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const postRouter = router({
  //   hello: publicProcedure
  //     .input(z.object({ text: z.string().nullish() }).nullish())
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input?.text ?? "world"}`,
  //       };
  //     }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  createPost: publicProcedure
    .input(z.object({ post: z.string().min(10).max(200) }))
    .mutation(({ ctx, input }) => {
      const createdPost = ctx.prisma.post.create({
        data: {
          post: input.post,
        },
      });

      return createdPost;
    }),
});
