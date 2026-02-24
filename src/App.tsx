import { lazy, Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/login/protectedRoute';
import Register from './components/login/Register';

const Login = lazy(() => import('./components/login/login'));
const MainFile = lazy(() => import('./page-layout/main-file'));
const FormFields = lazy(() => import('./components/form-fields/form-fields'));
const ListRendering = lazy(() => import('./components/large-list-render/large_list_rendering'));
const RTKQuery = lazy(() => import('./components/feature-using-rtkQuery/ui/rtk-query'));
const NodeExprApiInte = lazy(() => import('./components/node-express-api-integration/ui/allUserDetails'));
const SupportChat = lazy(() => import('./components/chat-bot/SupportChat'))

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <Suspense fallback={<>Loading...</>}>
        <Routes>
          {/* <Route path="/" element={<MainFile />}> */}
          {/* <Route path='/' element={<Login />} > */}
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected App Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainFile />
              </ProtectedRoute>
            }
          >
            <Route path="form-fields" element={<FormFields />} />
            <Route path="list-rendering" element={<ListRendering />} />
            <Route path="rtk-query" element={<RTKQuery />} />
            <Route path="node-Expr-data" element={<NodeExprApiInte />} />
            <Route path="chat-bot" element={<SupportChat />} />
          </Route>
        </Routes>
      </Suspense >

    </>
  );
}

export default App;
