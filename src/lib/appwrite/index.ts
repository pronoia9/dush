import { client, account, databases, storage, avatars } from '@/lib/appwrite/config';
import { createUserAccount, signInAccount, getCurrentUser, signOutAccount, createPost } from '@/lib/appwrite/api';

export {
  client, account, databases, storage, avatars,
  createUserAccount, signInAccount, getCurrentUser, signOutAccount, createPost,
};