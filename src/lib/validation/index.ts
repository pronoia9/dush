import * as z from 'zod';

export const signupValidationSchema = z.object({
  name: z.string().min(2, { message: 'Name too short.' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password too short.' })
});