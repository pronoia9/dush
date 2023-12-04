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
  return <div>UpdateProfile</div>;
}
