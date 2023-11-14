import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, FileUploader, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@/components';

const formSchema = z.object({
  caption: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function PostForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-9 w-full max-w-5xl'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea className='shad-textarea custom-scrollbar' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' placeholder='Art, Expression, Learning, Humor' />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex gap-4 items-center justify-end'>
          <Button type='button' className='shad-button_dark_4' style={{ maxHeight: '2.5rem' }}>
            Submit
          </Button>
          <Button type='submit' className='shad-button_primary whitespace-nowrap'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
