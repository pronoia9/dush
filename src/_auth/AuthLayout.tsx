import { Outlet, Navigate } from 'react-router-dom';

export default function AuthLayout() {
  const isAuthenticated = false; // !TEMP

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
}
