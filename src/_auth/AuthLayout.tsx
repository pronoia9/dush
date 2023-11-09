import { Outlet, Navigate } from 'react-router-dom';

export default function AuthLayout() {
  const isAuthenticated = false; // !TEMP

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
          <img src='/assets/images/side-img.svg' alt='sign side image' className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
        </>
      )}
    </>
  );
}
