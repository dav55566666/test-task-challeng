import { Routes, Route } from 'react-router-dom';
import { ApplicationListPage, ApplicationStatusPage, CreateApplicationPage } from '../../pages';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationListPage />} />
      <Route path="/create" element={<CreateApplicationPage />} />
      <Route path="/status" element={<ApplicationStatusPage />} />
    </Routes>
  );
}
