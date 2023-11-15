import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

export default function PostCard({ post }: { post: Models.Document }) {
  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img src={post.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt='creator' className='rounded-full w-12 lg:h-12' />
          </Link>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>{post.creator.name}</p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>{post.$createdAt}</p> -{' '}
              <p className='subtle-semibold lg:small-regular'>{post.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {
//   "caption": "caption",
//   "tags": [
//     "Fantasy"
//   ],
//   "imageUrl": "[]",
//   "imageId": "",
//   "location": "N/A",
//   "$id": "",
//   "$createdAt": "2023-11-14T22:11:43.341+00:00",
//   "$updatedAt": "2023-11-14T22:11:43.341+00:00",
//   "$permissions": [
//     "read(\"user:\")",
//     "update(\"user:\")",
//     "delete(\"user:\")"
//   ],
//   "creator": {
//     "name": "Kevin Bacon",
//     "username": "BaconImpersonator",
//     "accountId": "",
//     "email": "bacon@hollywoodmail.com",
//     "bio": null,
//     "imageId": null,
//     "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Kevin+Bacon&project=654b9597a269a93e30f3",
//     "$id": "",
//     "$createdAt": "2023-11-14T18:42:08.257+00:00",
//     "$updatedAt": "2023-11-14T18:42:08.257+00:00",
//     "$permissions": [],
//     "liked": [],
//     "save": [],
//     "$databaseId": "",
//     "$collectionId": ""
//   },
//   "likes": [],
//   "save": [],
//   "$databaseId": "",
//   "$collectionId": ""
// }
