/****************  _AUTH  ****************/
import SigninForm from '@/_auth/forms/SigninForm';
import SignupForm from '@/_auth/forms/SignupForm';
import AuthLayout from '@/_auth/AuthLayout';

/****************  _ROOT  ****************/
import RootLayout from '@/_root/RootLayout';
import AllUsers from '@/_root/pages/AllUsers';
import CreatePost from '@/_root/pages/CreatePost';
import EditPost from '@/_root/pages/EditPost';
import Explore from '@/_root/pages/Explore';
import Home from '@/_root/pages/Home';
import LikedPosts from '@/_root/pages/LikedPosts';
import PostDetails from '@/_root/pages/PostDetails';
import Profile from '@/_root/pages/Profile';
import Saved from '@/_root/pages/Saved';
import UpdateProfile from '@/_root/pages/UpdateProfile';

/**************  COMPONENTS  *************/
// FORMS
import PostForm from './forms/PostForm';
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
import { Textarea } from '@/components/ui/textarea';
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
  AllUsers, CreatePost, EditPost, Explore, Home, LikedPosts, PostDetails, Profile, Saved, UpdateProfile, 
  
  /**************  COMPONENTS  *************/
  // FORMS
  PostForm,
  // SHARED
  Loader,
  Bottombar, LeftSidebar, Topbar,
  // UI
  Button, buttonVariants,
  useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField,
  Input,
  Label,
  Textarea,
  ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction,
  Toaster,
  useToast, toast,
};
