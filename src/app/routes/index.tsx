import { createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './private-routes';
import PublicRoutes from './public-routes';

export const router = createBrowserRouter([PrivateRoute(), PublicRoutes()]);
