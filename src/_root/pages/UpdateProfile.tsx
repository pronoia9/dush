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

  return !currentUser ? (
    <div className='flex-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <div>UpdateProfile</div>
  );
}
