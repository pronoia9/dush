// index.ts
import { appwriteConfig, client, account, databases, storage, avatars } from '@/lib/appwrite/config';
import {
  // Authentication functions
  createUserAccount,
  saveUserToDB,
  signInAccount,
  getAccount,
  getCurrentUser,
  signOutAccount,
  // Post-related functions
  createPost,
  uploadFile,
  getFilePreview,
  deleteFile,
  searchPosts,
  getInfinitePosts,
  getPostById,
  getUserPosts,
  getRecentPosts,
  updatePost,
  deletePost,
  likePost,
  savePost,
  deleteSavedPost,
  // User-related functions
  getUsers,
  getUserById,
  updateUser,
} from '@/lib/appwrite/api';

export {
  appwriteConfig,
  client,
  account,
  databases,
  storage,
  avatars,
  // Authentication functions
  createUserAccount,
  saveUserToDB,
  signInAccount,
  getAccount,
  getCurrentUser,
  signOutAccount,
  // Post-related functions
  createPost,
  uploadFile,
  getFilePreview,
  deleteFile,
  searchPosts,
  getInfinitePosts,
  getPostById,
  getUserPosts,
  getRecentPosts,
  updatePost,
  deletePost,
  likePost,
  savePost,
  deleteSavedPost,
  // User-related functions
  getUsers,
  getUserById,
  updateUser,
};
