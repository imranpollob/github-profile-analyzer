import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './layout/AppShell';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ComparePage from './pages/ComparePage';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
