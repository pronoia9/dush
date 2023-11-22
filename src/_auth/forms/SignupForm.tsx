import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Loader, useToast } from '@/components';
import { useUserContext } from '@/context';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query';
import { SignupValidation } from '@/lib/validation';

export default function SignupForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: { name: '', username: '', email: '', password: '' },
  });

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SignupValidation>) {
    try {
      const newUser = await createUserAccount(user);
      if (!newUser) {
        toast({ title: 'Oops! Something went wrong during signup. It seems the unicorns took a break. Please try again. 🦄✨' });
        return;
      }

      const session = await signInAccount({ email: user.email, password: user.password });
      if (!session) {
        toast({ title: "Hold up! It seems we've encountered an unexpected issue. Let's try that again. 🤖🔄" });
        navigate('/sign-in');
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) form.reset(), navigate('/');
      else {
        toast({ title: 'Oh no! The toaster is acting up. We couldn’t retrieve your account. Please check your connection and try again. 🍞🤔' });
        return;
      }
    } catch (error) {
      console.log("Oops! Something went wrong while checking the user authentication. Gremlins, maybe? Let's investigate and fix the issue. 🕵️‍♂️🔍", {
        error,
      });
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>To use DÜSH, please enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormLabel className='shad-form_label'>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormLabel className='shad-form_label'>Username</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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
            {isCreatingUser || isSigningInUser || isUserLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account?{' '}
            <Link to='/sign-in' className='text-primary-500 text-small-semibold ml-1'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
