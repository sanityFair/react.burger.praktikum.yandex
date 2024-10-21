import { ErrorBoundary, AppHeader } from '@/components';
import { Outlet } from 'react-router';

export const App = () => (
  <ErrorBoundary fallback="Произошла ошибка.">
    <AppHeader />
    <Outlet />
  </ErrorBoundary>
);
