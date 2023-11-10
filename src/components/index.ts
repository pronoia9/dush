/****************  _AUTH  ****************/
import SigninForm from '@/_auth/forms/SigninForm';
import SignupForm from '@/_auth/forms/SignupForm';
import AuthLayout from '@/_auth/AuthLayout';

/****************  _ROOT  ****************/
import Home from '@/_root/pages/Home';
import RootLayout from '@/_root/RootLayout';

/**************  COMPONENTS  *************/
// FORMS
// SHARED
import Loader from './shared/Loader';
// UI
import { Button, buttonVariants } from '@/components/ui/button';
import { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from './ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export {
  /****************  _AUTH  ****************/
  SigninForm,
  SignupForm,
  AuthLayout,

  /****************  _ROOT  ****************/
  Home,
  RootLayout,
  
  /**************  COMPONENTS  *************/
  // FORMS
  // SHARED
  Loader,
  // UI
  Button, buttonVariants,
  useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField,
  Input,
  Label,
};