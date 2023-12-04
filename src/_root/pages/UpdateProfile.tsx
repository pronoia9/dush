import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  Input,
  Button,
  ProfileUploader,
  Loader,
  useToast,
} from '@/components';

import { useUserContext } from '@/context';
import { useGetUserById, useUpdateUser } from '@/lib/react-query';
import { ProfileValidation } from '@/lib/validation';

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const { toast } = useToast();
  const { data: currentUser } = useGetUserById(id || '');
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useUpdateUser();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: { file: [], name: user.name, username: user.username, email: user.email, bio: user.bio || '' },
  });

  const handleSubmit = async (value: z.infer<typeof ProfileValidation>) => {};

  return !currentUser ? (
    <div className='flex-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl'>
          <img src='/assets/icons/edit.svg' width={36} height={36} alt='edit' className='invert-white' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-7 w-full mt-4 max-w-5xl'>
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem className='flex'>
                  <FormControl>
                    <ProfileUploader fieldChange={field.onChange} mediaUrl={currentUser.imageUrl} />
                  </FormControl>
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Name</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Username</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Email</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-form_label'>Bio</FormLabel>
                  <FormControl>
                    <Textarea className='shad-textarea custom-scrollbar' {...field} />
                  </FormControl>
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />

            <div className='flex gap-4 items-center justify-end'>
              <Button type='button' className='shad-button_dark_4' onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type='submit' className='shad-button_primary whitespace-nowrap' disabled={isLoadingUpdate}>
                {isLoadingUpdate && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
