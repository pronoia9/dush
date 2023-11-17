import { Link, useParams } from 'react-router-dom';

import { Button, Loader } from '@/components';
import { useUserContext } from '@/context';
import { useGetPostById } from '@/lib/react-query';
import { multiFormatDateString } from '@/lib/utils';

export default function PostDetails() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id || '');
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className='post_details-container'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='post_details-card'>
          <img src={post?.imageUrl} alt='post image' className='post_details-img' />

          <div className='post_details-info'>
            <div className='flex-between w-full'>
              <div className='flex items-center gap-3'>
                <Link to={`/profile/${post?.creator.$id}`}>
                  <img
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt='creator'
                    className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
                  />
                </Link>

                <div className='flex flex-col'>
                  <Link to={`/profile/${post?.creator.$id}`}>
                    <p className='base-medium lg:body-bold text-light-1'>{post?.creator.name}</p>
                  </Link>
                  <div className='flex-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-regular'>{multiFormatDateString(post?.$createdAt)}</p> -{' '}
                    <p className='subtle-semibold lg:small-regular'>{post?.location}</p>
                  </div>
                </div>
              </div>

              {user.id === post?.creator.$id && (
                <div className='flex-center lg:gap-2'>
                  <Link to={`/update-post/${post?.$id}`}>
                    <img src='/assets/icons/edit.svg' width={24} height={24} />
                  </Link>
                  <Button onClick={handleDeletePost} variant='ghost' className='ghost_details-delete_btn'>
                    <img src='/assets/icons/delete.svg' alt='delete' width={24} height={24} />
                  </Button>
                </div>
              )}
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className='small-medium lg:base-medium py-5'>
              <p>{post?.caption}</p>
              <ul className='flex gap-1 mt-2'>
                {post?.tags.map((tag: string) => (
                  <li key={tag} className='text-light-3'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
