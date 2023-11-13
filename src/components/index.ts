/****************  _AUTH  ****************/
import SigninForm from '@/_auth/forms/SigninForm';
import SignupForm from '@/_auth/forms/SignupForm';
import AuthLayout from '@/_auth/AuthLayout';

/****************  _ROOT  ****************/
import RootLayout from '@/_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from '@/_root/pages';

/**************  COMPONENTS  *************/
// FORMS
// SHARED
import Loader from './shared/Loader';
import Bottombar from './shared/Bottombar';
import LeftSidebar from './shared/LeftSidebar';
import Topbar from './shared/Topbar';
// UI
import { Button, buttonVariants } from '@/components/ui/button';
import { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { useToast, toast } from '@/components/ui/use-toast';

export {
  /****************  _AUTH  ****************/
  SigninForm,
  SignupForm,
  AuthLayout,

  /****************  _ROOT  ****************/
  RootLayout,
  AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile,
  
  /**************  COMPONENTS  *************/
  // FORMS
  // SHARED
  Loader,
  Bottombar, LeftSidebar, Topbar,
  // UI
  Button, buttonVariants,
  useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField,
  Input,
  Label,
  ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction,
  Toaster,
  useToast, toast,
};
