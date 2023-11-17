// index.ts
import {
  // Auth Queries
  useCreateUserAccount,
  useSignInAccount,
  useSignOutAccount,
  // Post Queries
  useCreatePost,
  useGetPosts,
  useGetPostById,
  useGetRecentPosts,
  useGetUserPosts,
  useSearchPosts,
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useUpdatePost,
  useDeletePost,
  // User Queries
  useGetCurrentUser,
  useGetUsers,
  useGetUserById,
  useUpdateUser,
} from '@/lib/react-query/queries';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';
import { QueryProvider } from '@/lib/react-query/QueryProvider';

export {
  // Auth Queries
  useCreateUserAccount,
  useSignInAccount,
  useSignOutAccount,
  // Post Queries
  useCreatePost,
  useGetPosts,
  useGetPostById,
  useGetRecentPosts,
  useGetUserPosts,
  useSearchPosts,
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useUpdatePost,
  useDeletePost,
  // User Queries
  useGetCurrentUser,
  useGetUsers,
  useGetUserById,
  useUpdateUser,
  // QUERY KEYS
  QUERY_KEYS,
  // PROVIDER
  QueryProvider,
};
