import { Lock } from "lucide-react";
import { User } from "lucide-react";
import { useState } from "react";
import { Oval } from 'svg-loaders-react';
import forms from '../../../styles/forms';
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";

function SignInAdm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const { loginWithAdmin } = useContext(AuthContext);

    async function handleSubmit() {
        setLoading(true)
        loginWithAdmin(email, password)
        setLoading(false)
    }

    return (
        <div className='flex w-full h-full bg-zinc-300 items-start justify-start'>
            <div className="w-full h-screen items-center justify-center flex flex-col">
                <section className='flex flex-col h-max items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
                    <h1 className="font-semibold">Admin</h1>
                    <form className="w-full gap-8 flex-col flex">
                        <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
                            <div className='flex flex-row gap-4 justify-center items-center w-full'>
                                <User strokeWidth={2} width={30} height={30} />
                                <div className='flex relative w-full space-x-2 items-center justify-center'>
                                    <input required onChange={e => setEmail(e.target.value)} value={email} id='email' className={forms.input} type='text' />
                                    <label htmlFor='email' className={forms.label}>Usuário</label>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 justify-center items-center w-full'>
                                <Lock strokeWidth={2} width={30} height={30} />
                                <div className='flex relative w-full space-x-2 items-center justify-center'>
                                    <input required onChange={e => setPassword(e.target.value)} value={password} id='password' className={forms.input} type='password' />
                                    <label htmlFor='password' className={forms.label}>Senha</label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='flex w-full flex-col justify-center gap-2 items-center'>
                        <button onClick={() => handleSubmit()} className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700 text-white' >
                            {loading ? <p className='flex flex-row items-center gap-4'><Oval width={30} />Carregando...</p> : <p>Entrar</p>}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SignInAdm;