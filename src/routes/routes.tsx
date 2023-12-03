import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./RenderRoutes";

export const routes: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
