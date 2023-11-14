import * as z from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Hold up! Your name should be at least 2 characters. We want to remember you!' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters. Be a trendsetter with a longer username!' }),
  email: z.string().email({ message: 'Uh-oh! Your email looks a bit off. Check again, and let’s make sure it’s shipshape.' }),
  password: z.string().min(8, { message: 'Whoa there! Your password should be at least 8 characters. Make it tough, like a fortress!' }),
});

export const SigninValidation = z.object({
  email: z.string().email({ message: 'Uh-oh! Your email looks a bit off. Check again, and let’s make sure it’s shipshape.' }),
  password: z.string().min(8, { message: 'Whoa there! Passwords should be tough, like a fortress!' }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: 'Hold your horses! Your caption needs to be at least 5 characters. Make it snappy, like a stand-up comedian!' })
    .max(2000, { message: "Whoa there! Your caption is too epic. Keep it under 2000 characters; we're not writing the next great novel... yet." }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, { message: 'Tiny location, big problems! Your location should be at least 2 characters. Where in the world are you?' })
    .max(100, {
      message: 'Easy there! Your location is longer than a tweet. Keep it under 100 characters and save the novel for later.',
    }),
  tags: z.string(),
});

