import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Root from "./pages/Root.jsx";
import Welcome from "./pages/Welcome.jsx";
import ErrorPage from "./pages/Error.jsx";
import AdminArea from "./pages/AdminArea.jsx";
import BrandPage, { brandLoader } from "./pages/BrandPage.jsx";
import ModelPage, { modelsLoader } from "./pages/ModelPage.jsx";
import ModelSpecsPage, { specsLoader } from "./pages/ModelSpecsPage.jsx";
import ResourceListPage, { listLoader } from "./pages/ResourceListPage.jsx";
import ResourceDetailsPage, { detailsLoader } from "./pages/ResourceDetailsPage.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Welcome />} />
      <Route path="admin" element={<AdminArea />} />

      <Route path="brands" element={<BrandPage />} loader={brandLoader} errorElement={<ErrorPage />} />
      <Route path="brands/:brandName" element={<BrandPage />} loader={brandLoader} errorElement={<ErrorPage />} />
      <Route path="models" element={<ModelPage />} loader={modelsLoader} errorElement={<ErrorPage />} />
      <Route path="models/:brandId" element={<ModelPage />} loader={modelsLoader} errorElement={<ErrorPage />} />
      <Route path="models/:brandId/specs" element={<ModelSpecsPage />} loader={specsLoader} errorElement={<ErrorPage />} />

      <Route
        path="resources"
        element={<ResourceListPage />}
        loader={listLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="resources/:resourceId"
        element={<ResourceDetailsPage />}
        loader={detailsLoader}
        errorElement={<ErrorPage />}
      />

      <Route path="*" element={<ErrorPage />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
