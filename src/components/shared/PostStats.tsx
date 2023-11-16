import { Models } from 'appwrite';

import { useUserContext } from '@/context';
import { useDeleteSavedPost, useLikePost, useSavePost } from '@/lib/react-query';
import { MouseEvent, useEffect, useState } from 'react';
import { checkIsLiked } from '@/lib/utils';

export default function PostStats({ post, userId }: { post: Models.Document; userId: string }) {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost(),
    { mutate: savePost } = useSavePost(),
    { mutate: deleteSavedPost } = useDeleteSavedPost();

  const { user } = useUserContext();

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation();

    let newLikes = checkIsLiked(likes, userId) ? likes.filter((id) => id !== userId) : [...likes, userId];
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = () => {};

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
