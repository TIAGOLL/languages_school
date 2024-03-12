import { Route, Routes } from 'react-router-dom';

// Rotas de Aluno
import SignIn from '../pages/SignIn';
import Classes from '../pages/student/Classes';
import MyClass from '../pages/student/MyClass';
import Tasks from '../pages/student/Tasks';
import Book from './../pages/student/Book/index';
import Private from './private';

// Rotas de Admin
import AdmDashboard from '../pages/admin/AdmDashboard';
import AdmStudents from '../pages/admin/AdmStudents';
import AdmProfessionals from '../pages/admin/AdmProfessionals';
import AdmClasses from './../pages/admin/AdmClasses/index';
import Admin from './admin';
import Courses from './../pages/student/Courses/index';

function RoutesApp() {
  return (
    <Routes>

      {/* Student */}
      <Route path='/' element={<SignIn />} />

      {/* Students */}
      <Route path='/book' element={<Private><Book /></Private>} />
      <Route path='/classes' element={<Private><Classes /></Private>} />
      <Route path='/tasks' element={<Private><Tasks /></Private>} />
      <Route path='/myclass' element={<Private><MyClass /></Private>} />

      {/* Admin */}
      <Route path='/admin/dashboard' element={<Admin><AdmDashboard /></Admin>} />
      <Route path='/admin/students' element={<Admin><AdmStudents /></Admin>} />
      <Route path='/admin/professionals' element={<Admin><AdmProfessionals /></Admin>} />
      <Route path='/admin/classes' element={<Admin><AdmClasses /></Admin>} />
      <Route path='/admin/courses' element={<Admin><Courses /></Admin>} />

    </Routes>
  )
}

export default RoutesApp;
