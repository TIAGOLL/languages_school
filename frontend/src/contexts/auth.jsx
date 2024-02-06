import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

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




  async function signInWithEmail(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        const id = value.user.uid;
        const user = await api.auth.GetInfoForAuth(id)
        let data = {
          name: user.first_name,
          email: value.user.email,
          avatarUrl: user.avatar_url,
          token: value.user.refreshToken,
          id: id
        }

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        if (!user.admin) navigate("/book")
        if (user.admin) navigate("/admin/dashboard")
        toast.success('Bem vindo de volta!')
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        if (error.code === 'auth/invalid-email') {
          toast.error('Email inválido!')
          return
        }
        if (error.code === 'permission-denied') {
          toast.error('Permissão negada!')
          return
        }
        if (error.code === 'auth/invalid-login-credentials') {
          toast.error('Email ou senha inválidos!')
          return
        }
        if (error.code === 'auth/invalid-credential') {
          toast.error('Email ou senha inválidos!')
          return
        }
        if (error.code === 'auth/too-many-requests') {
          toast.error('Muitas tentativas, tente novamente mais tarde!')
          return
        }
      })
  }

  // Cadastrar um novo user
  async function signUp(email, password, name) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null
        })
          .then(() => {

            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: null
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            navigate("/dashboard")

          })


      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      })

  }


  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem('@ticketsPRO');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signInWithEmail,
        signUp,
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
