import { ID } from 'appwrite';

import { account, avatars } from '@/lib/appwrite';
import { INewUser } from '@/types';

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log('createUserAccount error', error);
    return error;
  }
}

export async function saveUserToDB(user: { accountId: string; name: string; email: string; username?: string; imageUrl: URL }) {
  try {
  } catch (error) {}
}
