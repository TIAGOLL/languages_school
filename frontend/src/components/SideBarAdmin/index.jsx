import { Power, Users } from 'lucide-react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/auth';
import { sideBar } from './styles.css';
import { BarChartBig } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

function SideBarAdmin() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { page } = useSelector((state) => state.page);

  const options = [
    ['Dashboard', '/admin/dashboard', <BarChartBig />, 'dashboard'],
    ['Funcionários', '/admin/professionals', <Users />, 'professionals'],
    ['Alunos', '/admin/students', <GraduationCap />, 'students'],
  ]

  function desconnectUser() {
    localStorage.removeItem('@ticketsPRO');
    navigate('/')
    toast.warn('Desconectado com sucesso!')
  }

  return (
    <aside className="h-screen w-20 flex flex-col text-zinc-300 group hover:transition-all hover:w-2/12">
      <div className="flex w-full flex-col h-full relative bg-slate-800 py-6">
        <nav className="space-y-8 text-lg">
          <a href='/admin/profile' className="justify-center text-center flex flex-col items-center">
            <img
              src={user.avatarUrl ? user.avatarUrl : '/public/images/empty.png'}
              alt="Imagem de Perfil"
              className="border-4 rounded-full w-8 border-sky-900"
            />
            <span className="font-semibold pt-2 text-md">
              {user.name ? user.name : user.nome}
            </span>
          </a>
          <div className="flex flex-col space-y-2 items-center group-hover:items-stretch">
            {
              options.map(([title, url, icon, pageName]) => (
                <>
                  <a href={url} key={title} className={page == pageName ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}>
                    {icon} {title}
                  </a>
                  <a href={url} key={title} className={page == pageName ? sideBar.activeLink.short : sideBar.inactiveLink.short}>
                    {icon}
                  </a>
                </>
              ))}

            {/* Disconect */}
            <div className="flex flex-col absolute bottom-2">
              <button onClick={(e) => desconnectUser(e)} className={sideBar.inactiveLink.complete}>
                <Power />Desconectar
              </button>
            </div>

            <div className="flex flex-col absolute bottom-2 justify-center items-center w-full">
              <button onClick={(e) => desconnectUser(e)} className={sideBar.inactiveLink.short}>
                <Power />
              </button>
            </div>
          </div>
        </nav>
      </div >
    </aside >
  );
}

export default SideBarAdmin;
