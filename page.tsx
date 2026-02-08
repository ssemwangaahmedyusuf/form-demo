"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolve } from "path";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { email, minLength } from "zod";
import { z } from "zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type FormFields = z.infer<typeof schema>;

export default function page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "beckhambaka928@gmail.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <input type="text" {...register("email")} />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <br />
        <br />
        <label htmlFor="password" className="font-bold">
          Password:
        </label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <br />
        <button disabled={isSubmitting} type="submit" className="mx-18 my-10">
          {isSubmitting ? "loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
