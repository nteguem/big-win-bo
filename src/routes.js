import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import LoginPage from './pages/Login';

const DefaultPage = ({ label }) => <h1>Page du menu : {label}</h1>;

const useAuth = () => {
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const isAuthenticated = currentUser || (() => {
    try {
      return !!JSON.parse(localStorage.getItem('user'))?.token;
    } catch {
      return false;
    }
  })();
  
  return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RedirectBasedOnAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/predictions" /> : children;
};

const generateRoutes = (menuItems) => {
  const processActions = (path, actions) => {
    if (!actions) return [];
    
    return Object.entries(actions).map(([action, actionConfig]) => {
      const actionPath = actionConfig.requiresId
        ? `${path}/${action}/:id`
        : `${path}/${action}`;
        
      return (
        <Route
          key={actionPath}
          path={actionPath}
          element={<ProtectedRoute>{actionConfig.component}</ProtectedRoute>}
        />
      );
    });
  };

  const processMenuItem = (item, isSubItem = false) => {
    const routes = [
      <Route
        key={item.path}
        path={item.path}
        element={<ProtectedRoute>{item.component || <DefaultPage label={item.label} />}</ProtectedRoute>}
      />,
      ...processActions(item.path, item.actions)
    ];

    if (!isSubItem && item.subMenu?.length) {
      item.subMenu.forEach(subItem => {
        routes.push(...processMenuItem(subItem, true));
      });
    }

    return routes;
  };

  return menuItems.flatMap(item => processMenuItem(item));
};

const AppRoutes = ({ menuItems }) => (
  <Routes>
    <Route
      path="/login"
      element={
        <RedirectBasedOnAuth>
          <LoginPage />
        </RedirectBasedOnAuth>
      }
    />

    <Route
      element={
        <ProtectedRoute>
          <Layout menuItems={menuItems}>
            <Outlet />
          </Layout>
        </ProtectedRoute>
      }
    >
      {generateRoutes(menuItems)}
    </Route>

    <Route path="*" element={<Navigate to={menuItems[0]?.path || '/'} />} />
  </Routes>
);

export default AppRoutes;