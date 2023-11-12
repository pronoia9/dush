import * as z from 'zod';

export const signupValidationSchema = z.object({
  name: z.string().min(2, { message: 'Hold up! Your name should be at least 2 characters. We want to remember you!' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters. Be a trendsetter with a longer username!' }),
  email: z.string().email({ message: 'Uh-oh! Your email looks a bit off. Check again, and let’s make sure it’s shipshape.' }),
  password: z.string().min(8, { message: 'Whoa there! Your password should be at least 8 characters. Make it tough, like a fortress!' }),
});

export const signinValidationSchema = z.object({
  email: z.string().email({ message: 'Uh-oh! Your email looks a bit off. Check again, and let’s make sure it’s shipshape.' }),
  password: z.string().min(8, { message: 'Whoa there! Your password should be at least 8 characters. Is is tough, like a fortress!' }),
});
