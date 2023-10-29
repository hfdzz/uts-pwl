import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'

import Add_edit, {
  loader as addEditLoader
} from './pages/add_edit.jsx'

import Detail, {
  loader as productLoader
} from './pages/detail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "add/",
    element: <Add_edit />,
    loader: addEditLoader,
  },
  {
    path: "product/:id/edit",
    element: <Add_edit />,
    loader: addEditLoader,
  },
  {
    path: "product/:id",
    element: <Detail />,
    loader: productLoader,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)