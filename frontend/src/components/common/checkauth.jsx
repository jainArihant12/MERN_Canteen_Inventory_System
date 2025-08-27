import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user,isLoading , children }) => {
  const location = useLocation();
  const path = location.pathname;
  if(isLoading) <div>Loading...</div>

  // 1. Not authenticated and trying to access protected routes
  if (!isAuthenticated && !path.includes('/login') && !path.includes('/register')) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2. Authenticated but wrong role accessing admin route
  if (isAuthenticated && user?.role !== 'admin' && path.startsWith('/admin')) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 3. Authenticated admin accessing shop route
  if (isAuthenticated && user?.role === 'admin' && path.startsWith('/shop')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 4. Authenticated user on login/register pages
  if (isAuthenticated && (path.includes('/login') || path.includes('/register'))) {
    return user?.role === 'admin'
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }
  
  // 5. All conditions passed
  return <>{children}</>;
};

export default CheckAuth;
