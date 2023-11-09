import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Loader } from '@/components';
import { signupValidationSchema } from '@/lib/validation';

export default function SignupForm() {
  const isLoading = false; // !TEMP

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: { name: '', username: '', email: '', password: '' },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signupValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>To use DÜSH, please enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input type='text' className='shad-input' placeholder='Dr. Penguin' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input type='text' className='shad-input' placeholder='SpaceCowboy69' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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

          <Button type='submit' className='shad-button_primary'>
            {!isLoading ? 'Submit' : <Loader />}
          </Button>
        </form>
      </div>
    </Form>
  );
}
