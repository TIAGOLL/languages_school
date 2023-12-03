import { Routes, Route } from 'react-router-dom'

//Autenticação
import SignIn from '../pages/Autenticação/SignIn/index';
import Register from '../pages/Autenticação/Register';
import Private from './private';




function RoutesApp() {
  return (
    <Routes>
      {/* Autenticação */}
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<Register />} />


    </Routes>
  )
}

export default RoutesApp;
