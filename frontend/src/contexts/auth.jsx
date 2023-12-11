import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/BDConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@ticketsPRO');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (value) => {
        const data = {
          uid: value.user.uid,
          name: value.user.displayName.split(' ')[0],
          avatarUrl: value.user.photoURL,
          email: value.user.email,
          admin: false,
        };
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        navigate('/book');
        toast.success('Bem vindo de volta!');
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/too-many-requests') {
          toast.error('Muitas tentativas, tente novamente mais tarde!');
          return;
        }
        if (error.code === 'auth/popup-closed-by-user') {
          toast.error('Operação cancelada pelo usuário!');
        }
      })
  }

  async function loginWithAdmin(email, password) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        console.log(value)
        let uid = value.user.uid;

        const docRef = doc(db, "admins", uid);
        const docSnap = await getDoc(docRef)

        let data = {
          uid: uid,
          name: docSnap.data().nome.split(' ')[0],
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
          admin: true,
        }

        setUser(data);
        storageUser(data);
        setLoading(false);
        navigate('/admin/professionals');
        toast.success('Bem vindo de volta!')
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        if (error.code === 'auth/invalid-email') {
          toast.error('Email inválido!')
          return
        }
        if (error.code === 'auth/invalid-login-credentials') {
          toast.error('Email ou senha inválidos!')
          return
        }
        if (error.code === 'auth/too-many-requests') {
          toast.error('Muitas tentativas, tente novamente mais tarde!')
          return
        }
      })
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        console.log(value)
        await setDoc(doc(db, "admins", uid), {
          uid: uid,
          nome: name,
          avatarUrl: value.user.photoURL,
          email: value.user.email,
        })
          .then(() => {

            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: value.user.photoURL,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            navigate("/admin")
          })
          .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
          })


      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email já cadastrado!')
          return
        }
        if (error.code === 'auth/invalid-email') {
          toast.error('Email inválido!')
          return
        }
        if (error.code === 'auth/invalid-password') {
          toast.error('Senha inválida!')
          return
        }
        if (error.code === 'auth/weak-password') {
          toast.error('Sua senha deve possuir no mínimo 6 caracteres!')
          return
        }
        if (error.code === 'auth/too-many-requests') {
          toast.error('Muitas tentativas, tente novamente mais tarde!')
          return
        }
        if (error.code === 'permission-denied') {
          toast.error('Você não tem permissão para realizar esta operação!')
          return
        }
        setLoadingAuth(false);
      })

  }


  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        signedAdmin: user?.admin,
        user,
        signUp,
        signInWithGoogle,
        loadingAuth,
        loading,
        storageUser,
        setUser,
        loginWithAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
