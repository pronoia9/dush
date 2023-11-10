import { ID } from 'appwrite';

import { account } from '@/lib/appwrite';
import { INewUser } from '@/types';

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
  } catch (error) {
    console.log('createUserAccount error', error);
    return error;
  }
}
