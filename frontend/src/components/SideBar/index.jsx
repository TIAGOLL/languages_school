import { BookMarked, Power } from 'lucide-react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/auth';
import { sideBar } from '../SideBarAdmin/styles.css';

function SideBar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { page } = useSelector((state) => state.page);

  function desconnectUser() {
    localStorage.removeItem('@ticketsPRO');
    navigate('/')
    toast.warn('Desconectado com sucesso!')
  }


  return (
    <aside className="h-screen w-20 flex flex-col text-zinc-300 group hover:transition-all hover:w-2/12">
      <div className="flex w-full flex-col h-full relative bg-slate-800 py-6">
        <nav className="space-y-8 text-lg">
          <div className="justify-center text-center flex flex-col items-center">
            <img
              src={user.avatarUrl}
              alt="Imagem de Perfil"
              className="border-4 rounded-full w-8 border-sky-900"
            />
            <span className="font-semibold pt-2 text-md">
              {user.name ? user.name : user.nome}
            </span>
          </div>
          <div className="flex flex-col space-y-2 items-center group-hover:items-stretch">
            {[['Book', '/book']].map(([title, url]) => (
              <>
                <a href={url} className={page == 'book' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}>
                  <BookMarked /> {title}
                </a>
                <a href={url} className={page == 'book' ? sideBar.activeLink.short : sideBar.inactiveLink.short}>
                  <BookMarked />
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

export default SideBar;
