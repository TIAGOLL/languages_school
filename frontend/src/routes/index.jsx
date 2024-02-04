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

function RoutesApp() {
  return (
    <Routes>

      {/* SignIn */}
      <Route path='/' element={<SignIn />} />

      {/* Book */}
      <Route path='/book' element={<Private><Book /></Private>} />

      {/* Classes */}
      <Route path='/classes' element={<Private><Classes /></Private>} />

      {/* Tasks */}
      <Route path='/tasks' element={<Private><Tasks /></Private>} />

      {/* MyClass */}
      <Route path='/myclass' element={<Private><MyClass /></Private>} />

      {/* Admin */}
      <Route path='/admin/dashboard' element={<Private><AdmDashboard /></Private>} />
      <Route path='/admin/students' element={<Private><AdmStudents /></Private>} />
      <Route path='/admin/professionals' element={<Private><AdmProfessionals /></Private>} />
      <Route path='/admin/classes' element={<Private><AdmClasses /></Private>} />

    </Routes>
  )
}

export default RoutesApp;
