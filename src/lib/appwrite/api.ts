import { ID, Query } from 'appwrite';

import { appwriteConfig, account, avatars, databases, storage } from '@/lib/appwrite';
import { INewPost, INewUser, IUpdatePost } from '@/types';

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
    // Upload image to storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags
    const tagType = post.tags?.includes('#') ? '#' : ',';
    const tags = post.tags?.replace(/ /g, '').split(tagType) || [];

    // Save post to database
    const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, ID.unique(), {
      creator: post.userId,
      caption: post.caption,
      imageUrl: fileUrl,
      imageId: uploadedFile.$id,
      location: post.location,
      tags,
    });
    if (!newPost) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log('error creating post', error);
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = { imageUrl: post.imageUrl, imageId: post.imageId };
    
    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags
    const tagType = post.tags?.includes('#') ? '#' : ',';
    const tags = post.tags?.replace(/ /g, '').split(tagType) || [];

    // Update post in the database
    const updatedPost = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, post.postId, {
      caption: post.caption,
      imageUrl: image.imageUrl,
      imageId: image.imageId,
      location: post.location,
      tags: tags,
    });

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) await deleteFile(image.imageId);
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) await deleteFile(post.imageId);

    return updatedPost;
  } catch (error) {
    console.log('error updating post', error);
  }
}

export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error('missing info');

  try {
    const statusCode = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, postId);
    if (!statusCode) throw Error;
    await deleteFile(imageId);
    return statusCode;
  } catch (error) {
    console.log('error deleting post', error);
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

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
    return fileUrl;
  } catch (error) {
    console.log('error getting file preview', error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: 'ok' };
  } catch (error) {
    console.log('error deleting file', error);
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [
    Query.orderDesc('$createdAt'),
    Query.limit(20),
  ]);
  if (!posts) throw Error;
  return posts;
  // try {
  // } catch (error) {
  //   console.log('error getting recent posts', error);
  // }
  // return [];
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, postId, { likes: likesArray });
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log('error liking post', error);
  }
}

export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, ID.unique(), {
      user: userId,
      post: postId,
    });
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log('error saving post', error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, savedRecordId);
    if (!statusCode) throw Error;
    return statusCode;
  } catch (error) {
    console.log('error deleting saved post', error);
  }
}

export async function getPostById(postId: string) {
  try {
    const posts = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, postId);
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log('error getting posts by id', error);
  }
}
