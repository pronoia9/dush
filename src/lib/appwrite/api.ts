import { ID, Query } from 'appwrite';

import { appwriteConfig, account, avatars, databases, storage } from '@/lib/appwrite';
import { INewPost, INewUser } from '@/types';

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

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ]);
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log('error getting current user', error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log('error signing out', error);
  }
}

export async function createPost(post: INewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    const fileUrl = getFilePreview(uploadedFile.$id);
    // const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, ID.unique(), post);
    // return newPost;
  } catch (error) {
    console.log('error creating post', error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);
    return uploadedFile;
  } catch (error) {
    console.log('error uploading file', error);
  }
}

export async function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
    return fileUrl;
  } catch (error) {
    console.log('error getting file preview', error);
  }
}