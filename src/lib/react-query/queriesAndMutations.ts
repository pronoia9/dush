import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

import { createUserAccount, signInAccount, signOutAccount } from '@/lib/appwrite';
import { INewUser } from '@/types';

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

export const signOut = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
