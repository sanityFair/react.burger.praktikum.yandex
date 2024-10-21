import { createBrowserRouter } from 'react-router-dom';
import {
  ForgotPasswordPage,
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  NotFoundPage,
  ProfileSettingsPage,
  RegistrationPage,
  ResetPasswordPage,
  UserProfileEditorPage,
} from './pages';
import { App, ProtectedRouteElement } from './components';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'profile',
        element: <ProtectedRouteElement element={<ProfileSettingsPage />} />,
        children: [
          {
            index: true,
            Component: UserProfileEditorPage,
          },
          {
            path: 'orders',
            element: 'orders',
            children: [
              {
                path: ':id',
                element: 'order-details',
              },
            ],
          },
        ],
      },
      {
        path: 'ingredients/:id',
        Component: IngredientDetailsPage,
      },
      {
        path: 'register',
        element: (
          <ProtectedRouteElement element={<RegistrationPage />} onlyUnAuth />
        ),
      },
      {
        path: 'login',
        element: <ProtectedRouteElement element={<LoginPage />} onlyUnAuth />,
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedRouteElement element={<ForgotPasswordPage />} onlyUnAuth />
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ProtectedRouteElement element={<ResetPasswordPage />} onlyUnAuth />
        ),
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
