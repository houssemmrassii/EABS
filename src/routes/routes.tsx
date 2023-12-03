import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./RenderRoutes";
import SuspenseComponent from "@/components/Suspense/SuspenseComponent";

export const routes: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<SuspenseComponent />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
