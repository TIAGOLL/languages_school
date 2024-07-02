import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@ticketsPRO')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false);
      }


      setLoading(false);

    }

    loadUser();
  }, [])

  async function SignIn({ user, password }) {
    setLoadingAuth(true);
    const res = await api.auth.signIn(user, password)
      .catch((error) => {
        setLoadingAuth(false);
        toast.error(error.response.data.message)
      })
    if (res) {
      const userLoged = {
        name: res.first_name,
        email: res.email,
        avatarUrl: res.avatar_url,
        id: res.id,
        admin: res.admin ? true : false
      }
      setUser(userLoged);
      storageUser(userLoged);
      setLoadingAuth(false);
      if (!userLoged.admin || userLoged.admin == false) navigate("/book")
      if (userLoged.admin) navigate("/admin/dashboard")
      toast.success('Bem vindo de volta!')
    }


    setLoadingAuth(false);
  }

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function logout() {
    localStorage.removeItem('@ticketsPRO');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        SignIn,
        logout,
        loadingAuth,
        loading,
        storageUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
