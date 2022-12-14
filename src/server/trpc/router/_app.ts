import { router } from "../trpc";
import { exampleRouter } from "./example";
import { postRouter } from "./post";

export const appRouter = router({
  example: exampleRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
