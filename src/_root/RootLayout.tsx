import { Outlet } from 'react-router-dom';

import { Bottombar, LeftSidebar, Topbar } from '@/components';

export default function RootLayout() {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      
      <Bottombar />
    </div>
  );
}
