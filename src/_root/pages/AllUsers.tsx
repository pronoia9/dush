import { Loader, UserCard, useToast } from '@/components';
import { useGetUsers } from '@/lib/react-query';

export default function AllUsers() {
  const { toast } = useToast();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Oops! Looks like our users are hiding. They're probably playing hide and seek. We'll keep searching; you go grab a snack!" });
    return;
  }

  return (
    <div className='common-container'>
      <div className='user-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className='user-grid'>
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className='flex-1 min-w-[200px] w-full'>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
