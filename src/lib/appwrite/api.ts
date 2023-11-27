import { ID, Query } from 'appwrite';

import { appwriteConfig, account, avatars, databases, storage } from '@/lib/appwrite';
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types';

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
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
    console.error("Oh no! The gremlins stole your account creation request! They're probably using it to buy tiny hats.", error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: { accountId: string; name: string; email: string; username?: string; imageUrl: URL }) {
  try {
    const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), user);
    return newUser;
  } catch (error) {
    console.error(
      "Oopsie daisy! Your user got lost in the database jungle! Don't worry, we've sent out a search party with GPS-equipped monkeys.",
      error
    );
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.error('Oh snap! Your info is as elusive as a ninja in the shadows. Maybe your email or password is in stealth mode.', error);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error('Houston, we have a problem! Failed to retrieve your account. Mission Control suggests checking under the couch cushions.', error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ]);
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error("Well, this is awkward. It seems your user information is taking a vacation. We're sending a postcard when it returns.", error);
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.error("Logging out... Error! The logout button has gone rogue. It's currently on a coffee break. Please try again later.", error);
  }
}

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tagType = post.tags?.includes('#') ? '#' : ',';
    const tags = post.tags?.replace(/ /g, '').split(tagType) || [];

    // Create post
    const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, ID.unique(), {
      creator: post.userId,
      caption: post.caption,
      imageUrl: fileUrl,
      imageId: uploadedFile.$id,
      location: post.location,
      tags,
    });
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.error('Oops! Failed to create your masterpiece. Blame it on the cosmic rays or the mischievous art goblins.', error);
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);
    return uploadedFile;
  } catch (error) {
    console.error(
      'File upload failed! Our pigeons are on strike, and the carrier hamsters are napping. Please try again when the animal kingdom is back to work.',
      error
    );
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.error(
      "Error fetching file preview! It seems the file is on vacation, sipping coconut water on a tropical server island. We'll send a virtual postcard.",
      error
    );
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: 'ok' };
  } catch (error) {
    console.error('File deletion failed! The file is playing hide and seek in the digital labyrinth. Our cyber bloodhounds are on the case.', error);
  }
}

// TODO ============================== GET POSTS
export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [
      Query.search('caption', searchTerm),
      //! Query.search('tags', searchTerm),
    ]);
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.error(
      "Searching for posts... Error! It seems the posts are on a secret mission. We'll notify you once they return from espionage.",
      error
    );
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(9)];

  if (pageParam) queries.push(Query.cursorAfter(pageParam.toString()));

  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, queries);
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.error(
      "Fetching infinite posts... Error! The posts are stuck in an infinite loop. We've sent in a mathematician to negotiate their release.",
      error
    );
  }
}

// ============================== GET POST BY ID
export async function getPostById(postId?: string) {
  if (!postId) throw Error;
  try {
    const post = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, postId);
    if (!post) throw Error;
    return post;
  } catch (error) {
    console.error('Fetching post... Error! The post is currently in interstellar transit. Please be patient; space travel takes time.', error);
  }
}

export async function getUserPosts(userId?: string) {
  if (!userId) return;
  try {
    const post = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [
      Query.equal('creator', userId),
      Query.orderDesc('$createdAt'),
    ]);
    if (!post) throw Error;
    return post;
  } catch (error) {
    console.error(
      "Fetching user's posts... Error! The posts are in a rebellious phase. They refuse to be fetched right now. Try again later.",
      error
    );
  }
}

// ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(20),
    ]);
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.error(
      "Fetching popular posts... Error! The posts are busy counting their likes. We'll let you know when they finish their popularity contest.",
      error
    );
  }
}

// ============================== UPDATE POST
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

    // Convert tags into array
    const tagType = post.tags?.includes('#') ? '#' : ',';
    const tags = post.tags?.replace(/ /g, '').split(tagType) || [];

    //  Update post
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
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) await deleteFile(post.imageId);

    return updatedPost;
  } catch (error) {
    console.error(
      "Oops! Failed to update your masterpiece. The pixels are protesting for better working conditions. We're negotiating with the digital labor union.",
      error
    );
  }
}

// ============================== DELETE POST
export async function deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, postId);
    if (!statusCode) throw Error;
    await deleteFile(imageId);
    return { status: 'Ok' };
  } catch (error) {
    console.error("Deleting post... Error! The post is putting up a resistance. It must really like existing. We'll try to persuade it.", error);
  }
}

// ============================== LIKE / UNLIKE POST
export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, postId, { likes: likesArray });
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.error("Liking/Unliking post... Error! The post is having an identity crisis. It can't decide if it wants to be liked or not.", error);
  }
}

// ============================== SAVE POST
export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, ID.unique(), {
      user: userId,
      post: postId,
    });
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.error(
      "Saving post... Error! The post is currently in the witness protection program. We'll let you know when it's safe to access again.",
      error
    );
  }
}

// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, savedRecordId);
    if (!statusCode) throw Error;
    return { status: 'Ok' };
  } catch (error) {
    console.error("Deleting saved post... Error! The saved post is having separation anxiety. We're consoling it with virtual tissues.", error);
  }
}

// ============================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc('$createdAt')];

  if (limit) queries.push(Query.limit(limit));

  try {
    const users = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, queries);
    if (!users) throw Error;

    return users;
  } catch (error) {
    console.error('Fetching users... Error! The users are currently on strike, demanding better avatar options and unlimited coffee breaks.', error);
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, userId);
    if (!user) throw Error;
    return user;
  } catch (error) {
    console.error(
      "Fetching user... Error! The user is currently on a digital sabbatical. We'll notify you when they return from their tech detox.",
      error
    );
  }
}

// TODO ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  try {
  } catch (error) {
    console.error(
      'Updating user... Error! The user is undergoing a metamorphosis into a digital butterfly. Please wait for their magnificent transformation to complete.',
      error
    );
  }
}
