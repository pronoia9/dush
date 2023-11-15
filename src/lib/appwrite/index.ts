import { appwriteConfig, client, account, databases, storage, avatars } from '@/lib/appwrite/config';
import { createUserAccount, signInAccount, getCurrentUser, signOutAccount, createPost, getRecentPosts } from '@/lib/appwrite/api';

export {
  appwriteConfig, client, account, databases, storage, avatars,
  createUserAccount, signInAccount, getCurrentUser, signOutAccount, createPost, getRecentPosts,
};