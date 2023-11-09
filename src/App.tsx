import { Routes, Route } from 'react-router-dom';

import { SigninForm, SignupForm, Home } from '.';
import './globals.css';

export default function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route path='/sign-in' element={<SigninForm />} />
        <Route path='/sign-up' element={<SignupForm />} />

        {/* private routes */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}
