import { useGetCurrentUser } from '@/lib/react-query/queries';

import { GridPostList, Loader } from '@/components';

export default function LikedPosts() {
  const { data: currentUser } = useGetCurrentUser();

  return !currentUser ? (
    <div className='flex-center w-full h-full'>
      <Loader />
    </div>
  ) : (
    <>
      {currentUser.liked.length === 0 && <p className='text-light-4'>No liked posts</p>}
      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
}
