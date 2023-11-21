import { Models } from 'appwrite';

import { Loader, PostCard, UserCard } from '@/components';
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query';

export default function Home() {
  // const { toast } = useToast();
  const { data: posts, isLoading: isPostsLoading, isError: isErrorPosts } = useGetRecentPosts();
  // TODO
  // const { data: creators, isLoading: isUserLoading, isError: isErrorCreators } = useGetUsers(10);

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        {isErrorPosts ? (
          <p className='body-medium text-light-1'>Something bad happened</p>
        ) : (
          <div className='home-posts'>
            <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
            {isPostsLoading && !posts ? (
              <Loader />
            ) : (
              <ul className='flex flex-col flex-1 gap-9 w-full '>
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className='flex justify-center w-full'>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* <div className='home-creators'>
        {isErrorCreators ? (
          <p className='body-medium text-light-1'>Something bad happened</p>
        ) : (
          <>
            <h3 className='h3-bold text-light-1'>Top Creators</h3>
            {isUserLoading && !creators ? (
              <Loader />
            ) : (
              <ul className='grid 2xl:grid-cols-2 gap-6'>
                {creators?.documents.map((creator) => (
                  <li key={creator?.$id}>
                    <UserCard user={creator} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div> */}
    </div>
  );
}
