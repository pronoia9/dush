import { MouseEvent, useEffect, useState } from 'react';
import { Models } from 'appwrite';
import { useLocation } from 'react-router-dom';

import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query';
import { checkIsLiked } from '@/lib/utils';

export default function PostStats({ post, userId }: { post: Models.Document; userId: string }) {
  const location = useLocation();
  // Extract the list of user IDs who liked the post from the post object
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  // Initialize state variables for likes and saved status
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  // Destructure and get mutations and data from custom React Query hooks
  const { mutate: likePost } = useLikePost(),
    { mutate: savePost } = useSavePost(),
    { mutate: deleteSavedPost } = useDeleteSavedPost(),
    { data: currentUser } = useGetCurrentUser();

  // Check if the post is already saved by the current user
  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post.$id);
  useEffect(() => setIsSaved(!!savedPostRecord), [currentUser]);

  // Handle the like action for a post
  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation();

    // Toggle the like status for the current user
    let likesArray = checkIsLiked(likes, userId) ? likes.filter((id: string) => id !== userId) : [...likes, userId];
    // Update state with the new likes array and trigger the likePost mutation
    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  // Handle the save action for a post
  const handleSavePost = (e: MouseEvent) => {
    e.stopPropagation();

    // Toggle the saved status and trigger the appropriate mutation
    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ postId: post.$id, userId });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith('/profile') ? ' w-full' : '';

  // Render the component UI
  return (
    <div className={`flex justify-between items-center z-20${containerStyles}`}>
      <div className='flex gap-2 mr-5'>
        {/* Like button with dynamic icon based on whether the user has liked the post */}
        <img
          src={`/assets/icons/like${checkIsLiked(likes, userId) ? 'd' : ''}.svg`}
          alt='like'
          width={20}
          height={20}
          onClick={handleLikePost}
          className='cursor-pointer'
        />
        {/* Display the number of likes */}
        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>

      <div className='flex gap-2'>
        {/* Save button with dynamic icon based on whether the post is saved */}
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
