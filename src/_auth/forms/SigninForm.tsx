import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Loader, useToast } from '@/components';
import { useUserContext } from '@/context/AuthContext';
import { useSignInAccount } from '@/lib/react-query';
import { SignupValidationSchema } from '@/lib/validation';

export default function SigninForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: { email: '', password: '' },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    const session = await signInAccount({ email: values.email, password: values.password });
    if (!session) return toast({ title: 'Sign in failed. Please try again.' });

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) form.reset(), navigate('/');
    else toast({ title: 'Sign up failed. Please try again.' });
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Log in to your account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome back! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input type='email' className='shad-input' placeholder='spearmint-rhino@mindmelder.com' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' className='shad-button_primary mt-5'>
            {!isUserLoading ? 'Submit' : <Loader />}
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Don't have an accout?{' '}
            <Link to='/sign-up' className='text-primary-500 text-small-semibold'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
