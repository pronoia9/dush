import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Loader, useToast } from '@/components';
import { useUserContext } from '@/context';
import { useSignInAccount } from '@/lib/react-query';
import { SigninValidation } from '@/lib/validation';

export default function SigninForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: { email: '', password: '' },
  });

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SigninValidation>) {
    try {
      const session = await signInAccount(user);
      if (!session) {
        toast({ title: 'Sign in failed. Double-check your email and password and give it another shot.' });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) form.reset(), navigate('/');
      else {
        toast({ title: 'Sign in failed. Try again, and this time, visualize your success! 🚀' });
        return;
      }
    } catch (error) {
      console.error('Oops! Something went wrong. Take a deep breath, and try again later. 🌬️', error);
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Log in to your account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome back! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormLabel className='shad-form_label'>Email</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormLabel className='shad-form_label'>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' className='shad-button_primary'>
            {isLoading || isUserLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Log in'
            )}
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Don&apos;t have an account?{' '}
            <Link to='/sign-up' className='text-primary-500 text-small-semibold ml-1'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
