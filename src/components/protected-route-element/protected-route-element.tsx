import { useGetUserQuery } from '@/services';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '../loader';

type Props = {
  element: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRouteElement = ({
  element,
  onlyUnAuth = false,
}: Props) => {
  const location = useLocation();
  const { isFetching, data } = useGetUserQuery();

  if (isFetching) return <Loader />;

  if (!onlyUnAuth && !data?.success) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && data?.success) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (
    !location.state?.requestCode &&
    location.pathname.includes('reset-password')
  ) {
    return <Navigate to='/forgot-password' state={{ from: location }} />;
  }

  return element;
};
