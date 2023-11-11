import { ID } from 'appwrite';

import { account, avatars, databases } from '@/lib/appwrite';
import { INewUser } from '@/types';
import { appwriteConfig } from './config';

export async function createUserAccount(user: INewUser) {
  try {
    // Creates new user in auth
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    // Creates/saves the new user in user database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log('creating user account error', error);
    return error;
  }
}

export async function saveUserToDB(user: { accountId: string; name: string; email: string; username?: string; imageUrl: URL }) {
  try {
    const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), user);
    return newUser;
  } catch (error) {
    console.log('saving user to database error', error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log('signing into account error', error);
  }
}
