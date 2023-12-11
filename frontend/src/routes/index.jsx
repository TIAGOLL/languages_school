import { Route, Routes } from 'react-router-dom';

// Autenticação
import Book from '../pages/Book';
import SignIn from '../pages/SignIn';
import AdmRoutes from './admRoutes';
import Professionals from '../pages/admin/professionals';
import CreateStudents from '../pages/Students/create';
import StudentsRoutes from './StudentsRoutes';
import ProfessionalsCreate from '../pages/admin/professionals/create';
import Students from './../pages/admin/Students/index';
import SignInAdm from '../pages/admin/SignInAdm';
import Dashboard from '../pages/admin/Dashboard';

function RoutesApp() {
  return (
    <Routes>
      {/* Autenticação */}
      <Route path="/" element={<SignIn />} />
      <Route path="/book" element={<StudentsRoutes><Book /></StudentsRoutes>} />


      {/* Admin */}
      <Route path="/admin" element={<SignInAdm />} />

      <Route path="/admin/professionals" element={<AdmRoutes><Professionals /></AdmRoutes>} />
      <Route path="/admin/professionals/create" element={<AdmRoutes><ProfessionalsCreate /></AdmRoutes>} />

      <Route path="/admin/students" element={<AdmRoutes><Students /></AdmRoutes>} />
      <Route path="/admin/students" element={<AdmRoutes><CreateStudents /></AdmRoutes>} />

      <Route path="/admin/dashboard" element={<AdmRoutes><Dashboard /></AdmRoutes>} />

      <Route path="/admin/profile" element={<AdmRoutes>< /></AdmRoutes>} />
    </Routes>
  );
}

export default RoutesApp;
