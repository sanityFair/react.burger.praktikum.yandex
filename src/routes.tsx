import { createBrowserRouter } from 'react-router-dom';
import {
  FeedDetailsPage,
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientDetailsPage,
  LoginPage,
  NotFoundPage,
  OrderHistoryPage,
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
            Component: OrderHistoryPage,
          },
        ],
      },
      {
        path: 'profile/orders/:id',
        element: <ProtectedRouteElement element={<FeedDetailsPage />} />,
      },
      {
        path: 'ingredients/:id',
        Component: IngredientDetailsPage,
      },
      {
        path: 'feed',
        Component: FeedPage,
      },
      {
        path: 'feed/:id',
        Component: FeedDetailsPage,
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
