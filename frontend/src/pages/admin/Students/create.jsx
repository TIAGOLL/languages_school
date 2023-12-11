import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowBigLeft } from "lucide-react";
import forms from "../../../styles/forms";
import { Oval } from 'svg-loaders-react';
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/auth";
import admCreate from "../../../services/admCreate";
import MultiMask from 'react-multimask';

const ProfessionalsCreate = () => {

    const navigate = useNavigate()
    const { signUp } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)


    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [state, setState] = useState('')
    const [data, setData] = useState([])
    const [city, setCity] = useState('')
    const [occupation, setOccupation] = useState('')



    async function createStudent(e) {
        e.preventDefault()
    }

    async function loadData() {
        await studentCreate.loadData()
            .then(res => {
                setData(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        loadData();
    }, [])

    if (loading) return (
        <div className="flex h-screen w-screen bg-zinc-500 items-center justify-center">
            <span className="animate-spin"><Oval width={100} height={100} /></span>
        </div>
    )

    return (
        <div className="flex h-screen max-h-max justify-center items-center bg-zinc-500">
            <div className='flex flex-wrap items-center bg-zinc-200 justify-center rounded-xl m-14 py-6 space-y-8 shadow-lg shadow-zinc-800 border-3 lg:w-6/12'>
                <a href='/admin/professionals' className='w-full m-0 p-0 pl-14 justify-start items-center'>
                    <ArrowBigLeft width={35} height={35} />
                </a>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='mb-10 p-0 font-semibold'>Cadastro de funcionários</h1>
                </div>
                <form className='w-full gap-8 flex-col flex'>
                    <div className='flex justify-start items-center font-bold text-xl ml-14 mb-6'>
                        <div className='flex w-ful flex-wrap px-14 justify-center items-center gap-8'>
                            <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                <input required onChange={(e) => setName(e.target.value)} value={name} type="text" id='name' className={forms.input} />
                                <label htmlFor="name" className={forms.label}>Nome</label>
                            </div>
                            <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                <MultiMask masks={['###.###.###-##']} required onChange={(e) => setCpf(e.target.value)} value={cpf} type="text" id='cpf' className={forms.input} />
                                <label htmlFor="cpf" className={forms.label}>CPF</label>
                            </div>
                            <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                <MultiMask masks={['(##) ####-#####']} required onChange={(e) => setPhone(e.target.value)} value={phone} type="text" id='phone' className={forms.input} />
                                <label htmlFor="phone" className={forms.label}>Celular</label>
                            </div>
                            <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                <input required onChange={(e) => setEmail(e.target.value)} value={email} type="email" id='email' className={forms.input} />
                                <label htmlFor="email" className={forms.label}>Email</label>
                            </div>
                            <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                <select id="occupation" onChange={e => setOccupation(e.target.value)} value={occupation} className={forms.input}>
                                    <option htmlFor='occupation' value={null}></option>
                                    {
                                        data.occupations.map((item) => {
                                            return (
                                                <option key={item.id} htmlFor='occupation' value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="occupation" className={forms.label}>Função</label>
                            </div>
                            <div className='flex relative w-5/12 space-x-2 items-center justify-center'>
                                <select id="gender" onChange={e => setGender(e.target.value)} value={gender} className={forms.input}>
                                    <option htmlFor='gender' value={null}></option>
                                    <option htmlFor='gender' value={'M'}>Masculino</option>
                                    <option htmlFor='gender' value={'F'}>Feminino</option>
                                </select>
                                <label htmlFor='gender' className={forms.label}>Genêro</label>
                            </div>
                            <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                <input required onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} type="text" id='dateofbirth' className={forms.input} />
                                <label htmlFor="dateofbirth" className={forms.label}>Data de nascimento</label>
                            </div>
                            <div className='flex w-full items-center gap-8 justify-center flex-row'>
                                <div className='flex relative w-5/12 space-x-2 items-center justify-center'>
                                    <select id="state" onChange={e => setState(e.target.value)} className={forms.input}>
                                        <option htmlFor='state' value={null}></option>
                                        {
                                            data.states.map((item) => {
                                                return (
                                                    <option key={item.est_cod} htmlFor='state' value={item.est_cod}>{item.est_nome}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='state' className={forms.label}>Estado</label>
                                </div>
                                <div className='flex relative w-5/12 space-x-2 items-center justify-center'>
                                    <select id="city" onChange={e => setCity(e.target.value)} disabled={state == ''} value={city} className={forms.input}>
                                        <option htmlFor='city' value={null}></option>
                                        {
                                            data.states.map((item) => {
                                                if (item.est_cod == state) return (
                                                    item.cities.map((city) => {
                                                        return (
                                                            <option key={city.cid_cod} htmlFor='city' value={city.cid_cod}>{city.cid_nome}</option>
                                                        )
                                                    })
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='city' className={forms.label}>Cidade</label>
                                </div>
                            </div>
                            <div className='flex w-full items-center gap-8 justify-center flex-row'>
                                <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                    <input required onChange={(e) => setPassword(e.target.value)} value={password} type="password" id='password' className={forms.input} />
                                    <label htmlFor="password" className={forms.label}>Senha</label>
                                </div>
                                <div className='flex relative w-5/12 items-center justify-center flex-col'>
                                    <input required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="confirmPassword" id='confirmPassword' className={forms.input} />
                                    <label htmlFor="confirmPassword" className={forms.label}>Confirme sua senha</label>
                                </div>
                            </div>
                            <div className='flex w-full pt-4 flex-col justify-center items-center'>
                                <button onClick={(e) => addProfessional(e)} className={forms.greenButton}>{loading ? <span className="flex flex-row gap-4 justify-center items-center"><Oval width={30} /> Carregando...</span> : 'Cadastrar'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )

}

export default ProfessionalsCreate;