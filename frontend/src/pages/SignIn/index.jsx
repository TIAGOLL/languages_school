import { useEffect, useState, useContext } from 'react';
import { Oval } from 'svg-loaders-react';

import { AuthContext } from '../../contexts/auth';

function SignIn() {
  const { signInWithGoogle } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('/images/signinBg.jpg')] bg-cover bg-no-repeat">
      <section className="gap-8 flex flex-col items-center bg-zinc-100 w-4/12 rounded-xl py-16 space-y-8 shadow-lg shadow-zinc-800 border-3">
        <img width={300} src="/images/logo.png" alt="Logo Phenom Idiomas" />
        <div className="flex w-full flex-col px-14 justify-center items-center gap-8">
          <button
            className="flex w-auto flex-row p-1 gap-2 items-center justify-center bg-blue-500 rounded text-white"
            onClick={(e) => handleSubmit(e)}
          >
            <div className="w-25 bg-white rounded">
              <img
                width={40}
                src="/icons/googleIcon.png"
                alt="Fazer login com o Google"
              />
            </div>

            <div className="flex w-100 items-center font-semibold text-xl justify-center">
              <span>
                {loading ? (
                  <span className="flex flex-row items-center justify-center gap-4 pr-2">
                    <Oval /> Carregando...
                  </span>
                ) : 'Continuar com o Google'}
              </span>
            </div>
          </button>
        </div>
        <div>
            <a href="/admin">Logar com admin</a>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
