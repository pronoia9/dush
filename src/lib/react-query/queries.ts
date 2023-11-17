import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

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
} from '@/lib/appwrite';
import { QUERY_KEYS } from '@/lib/react-query';
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types';

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ============================================================
// POST QUERIES
// ============================================================

// (Create)RUD
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
    },
  });
};

// C(Read)UD
// TODO
export const useGetPosts = () => {
};

export const useGetPostById = (postId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

// TODO
export const useSearchPosts = (searchTerm: string) => {
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => savePost(postId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
};

// CR(Update)D
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id] });
    },
  });
};

// CRU(Delete)
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) => deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
    },
  });
};

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};