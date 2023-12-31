import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite';

import {
  Button,
  FileUploader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Loader,
  Input,
  Textarea,
  useToast,
} from '@/components';
import { useUserContext } from '@/context';
import { useCreatePost, useUpdatePost } from '@/lib/react-query';
import { PostValidation } from '@/lib/validation';

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update';
};

export default function PostForm({ post, action }: PostFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const { mutateAsync: createPost, isLoading: isLoadingCreate } = useCreatePost(),
    { mutateAsync: updatePost, isLoading: isLoadingUpdate } = useUpdatePost();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      if (post && action === 'Update') {
        const updatedPost = await updatePost({ ...values, postId: post.$id, imageId: post?.imageId, imageUrl: post?.imageUrl });
        if (!updatedPost) toast({ title: "Oops! Couldn't update the post. Looks like it's playing hard to get. Give it another shot!" });
        navigate(`/posts/${post.$id}`);
      } else if (action === 'Create') {
        const newPost = await createPost({ ...values, userId: user.id });
        if (!newPost) toast({ title: 'Uh-oh! Creating the post failed. Maybe your creativity level is too high for us to handle. Try again!' });
        navigate('/');
      } else toast({ title: 'Confused about what to do? So are we! Try a different action, maybe something more sensible.' });
    } catch (error) {
      console.error(
        'Yikes! An unexpected error appeared. Our programmers are trying to catch it with a virtual butterfly net. Give it another go!',
        error
      );
    }
  }

  const preTitle = action === 'Create' ? 'Add' : 'Edit';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-9 w-full max-w-5xl'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>{preTitle} Caption</FormLabel>
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
              <FormLabel className='shad-form_label'>{preTitle} Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
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
              <FormLabel className='shad-form_label'>{preTitle} Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
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
              <FormLabel className='shad-form_label'>
                {preTitle} Tags <em>(separated by comma "art, music" or hashtag "#art #music")</em>
              </FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' placeholder='Art, Nature, Humor' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex gap-4 items-center justify-end'>
          <Button type='button' className='shad-button_dark_4' style={{ maxHeight: '2.5rem' }} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type='submit' className='shad-button_primary whitespace-nowrap' disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
