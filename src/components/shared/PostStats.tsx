import { MouseEvent, useEffect, useState } from 'react';
import { Models } from 'appwrite';

import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query';
import { checkIsLiked } from '@/lib/utils';

export default function PostStats({ post, userId }: { post: Models.Document; userId: string }) {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost(),
    { mutate: savePost } = useSavePost(),
    { mutate: deleteSavedPost } = useDeleteSavedPost(),
    { data: currentUser } = useGetCurrentUser();

  // Function to handle the like post event
  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation(); // Prevents the event from bubbling up the DOM tree

    // Check if the post is already liked by the user, if yes then remove the like, else add the like
    let newLikes = checkIsLiked(likes, userId) ? likes.filter((id: string) => id !== userId) : [...likes, userId];
    setLikes(newLikes); // Update the likes state
    likePost({ postId: post.$id, likesArray: newLikes }); // Call the likePost function with the new likes array
  };

  // Function to handle the save post event
  const handleSavePost = (e: MouseEvent) => {
    e.stopPropagation(); // Prevents the event from bubbling up the DOM tree

    // Check if the post is already saved by the user
    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.$id === post.$id);

    if (savedPostRecord) {
      setIsSaved(false); // If the post is already saved, then unsave it
      deleteSavedPost(savedPostRecord.$id); // Delete the saved post record
    } else {
      setIsSaved(true); // If the post is not saved, then save it
      savePost({ postId: post.$id, userId }); // Save the post
    }
  };

  useEffect(() => {}, [likes]);

  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mr-5'>
        <img
          src={`/assets/icons/like${checkIsLiked(likes, userId) ? 'd' : ''}.svg`}
          alt='like'
          width={20}
          height={20}
          onClick={handleLikePost}
          className='cursor-pointer'
        />
        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>

      <div className='flex gap-2'>
        <img
          src={`/assets/icons/save${isSaved ? 'd' : ''}.svg`}
          alt='save'
          width={20}
          height={20}
          onClick={handleSavePost}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}
