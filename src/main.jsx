import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import Footer from './components/custom/Footer.jsx';
import MyTrips from './my-trips/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },
  {
    path: '/my-trips',
    element: <MyTrips />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router}>
      </RouterProvider>
      <Footer />
    </GoogleOAuthProvider>
  </StrictMode >,
)