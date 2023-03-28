import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createHashRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import DetailPage from './pages/Detail';
import Login from './pages/Login'

const router = createHashRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/listPage",
    element: <ListPage />,
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const startApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}


reportWebVitals();
