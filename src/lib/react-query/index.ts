import { useCreateUserAccount, useSignInAccount, useSignOutAccount, useCreatePost, useGetRecentPosts, useLikePost, useSavePost, useDeleteSavedPost, useGetCurrentUser, useGetPostById, useUpdatePost, useDeletePost, } from '@/lib/react-query/queries';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';
import { QueryProvider } from '@/lib/react-query/QueryProvider';

export {
  // QUERIES
  useCreateUserAccount, useSignInAccount, useSignOutAccount, useCreatePost, useGetRecentPosts, useLikePost, useSavePost, useDeleteSavedPost, useGetCurrentUser, useGetPostById, useUpdatePost, useDeletePost,
  // QUERY KEYS
  QUERY_KEYS,
  // PROVIDER
  QueryProvider,
};
