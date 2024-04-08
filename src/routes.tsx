import { createBrowserRouter } from "react-router-dom";
import * as React from 'react';
import Course from './components/courseEdit.tsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Course />,
  },
]);