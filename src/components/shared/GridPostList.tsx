import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

import { useUserContext } from '@/context';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

export default function GridPostList({ posts, showUser = true, showStats = true }: GridPostListProps) {
  const { user } = useUserContext();

  return (
    <ul className='grid-container'>
      {posts.map((post, index) => (
        <li key={post.$id} className='relative min-w-80 h-80'>
          <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img src={post.imageUrl} alt='post image' className='h-full w-full object-cover' />
          </Link>
        </li>
      ))}
    </ul>
  );
}
