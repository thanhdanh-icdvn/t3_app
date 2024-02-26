import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

import { loginSchema, signUpSchema } from "@/common/validation/auth";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, username } = input;

      const exists = await ctx.db.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await ctx.db.user.create({
          data: { email, password: hashedPassword, username },
        });

        return {
          status: 201,
          message: "Account created successfully",
          result: result.email,
        };
      } catch (error) {}
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const form = await loginSchema.parseAsync(input);
    const user = await ctx.db.user.findFirst({
      where: { email: form.email },
    });
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(form.password, user.password!);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }),
});
