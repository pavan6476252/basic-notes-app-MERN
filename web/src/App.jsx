import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";
import AddNote from "./pages/AddNote";
import NoteDetails from "./pages/NoteDetails";
 
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/note/:id", element: <NoteDetails /> },
  { path: "/add", element: <AddNote onSubmit={console.log} /> },
  { path: "/edit/:id", element: <EditNote onSubmit={console.log} /> },
 
]);
const App = () => {
  return (
    <div className="container mx-auto">
      <RouterProvider router={router} />

    </div>
  );
};

export default App;
