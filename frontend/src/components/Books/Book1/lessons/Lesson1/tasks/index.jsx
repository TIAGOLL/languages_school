import { useState } from "react";
import forms from "../../../../../../styles/forms";
import { Oval } from 'svg-loaders-react';

function Tasks() {

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return (
        <section>
            <div className='w-full flex items-center justify-center p-2 gap-8'>
                <div className='flex flex-col text-lg font-semibold gap-2'>
                    <label className='pl-4'>Audio 1</label>
                    <audio controls>
                        <source src="/mpthreetest.mp3" type="audio/mp3" />
                    </audio>
                </div>
                <div className='flex flex-col text-lg font-semibold gap-2'>
                    <label className='pl-4'>Audio 2</label>
                    <audio controls>
                        <source src="/mpthreetest.mp3" type="audio/mp3" />
                    </audio>
                </div>
                <div className='flex flex-col text-lg font-semibold gap-2'>
                    <label className='pl-4'>Audio 3</label>
                    <audio controls>
                        <source src="/mpthreetest.mp3" type="audio/mp3" />
                    </audio>
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center p-2 gap-8 pt-10'>
                <h1 className='font-semibold'>Atividades</h1>
                <form onSubmit={handleSubmit} className='flex w-9/12 flex-wrap text-center justify-center items-center gap-8'>
                    <div className='flex flex-row w-5/12 justify-center items-center'>
                        <h5 className={forms.taskTraslateTitle}>Palavra 1</h5>
                        <div className='flex relative w-5/12 items-center justify-center flex-col'>
                            <input className={forms.taskTraslateInput} type="text" id="atividade1" name="atividade1" required />
                            <label className={forms.taskTraslateLabel}>Tradução</label>
                        </div>
                    </div>
                    <div className='flex flex-row w-5/12 text-center justify-center items-center'>
                        <h5 className={forms.taskTraslateTitle}>Palavra 2</h5>
                        <div className='flex relative w-5/12 items-center justify-center flex-col'>
                            <input className={forms.taskTraslateInput} type="text" id="atividade1" name="atividade1" required />
                            <label className={forms.taskTraslateLabel}>Tradução</label>
                        </div>
                    </div>
                    <div className='flex flex-row w-5/12 justify-center items-center'>
                        <h5 className={forms.taskTraslateTitle}>Palavra 3</h5>
                        <div className='flex relative w-5/12 items-center justify-center flex-col'>
                            <input className={forms.taskTraslateInput} type="text" id="atividade1" name="atividade1" required />
                            <label className={forms.taskTraslateLabel}>Tradução</label>
                        </div>
                    </div>
                    <div className='flex flex-row w-5/12 text-center justify-center items-center'>
                        <h5 className={forms.taskTraslateTitle}>Palavra 4</h5>
                        <div className='flex relative w-5/12 items-center justify-center flex-col'>
                            <input className={forms.taskTraslateInput} type="text" id="atividade1" name="atividade1" required />
                            <label className={forms.taskTraslateLabel}>Tradução</label>
                        </div>
                    </div>
                    <div className='flex flex-row w-5/12 justify-center items-center'>
                        <h5 className={forms.taskTraslateTitle}>Palavra 5</h5>
                        <div className='flex relative w-5/12 items-center justify-center flex-col'>
                            <input className={forms.taskTraslateInput} type="text" id="atividade1" name="atividade1" required />
                            <label className={forms.taskTraslateLabel}>Tradução</label>
                        </div>
                    </div>
                    <div className='flex flex-row w-5/12 text-center justify-center items-center'>
                        <h5 className={forms.taskTraslateTitle}>Palavra 6</h5>
                        <div className='flex relative w-5/12 items-center justify-center flex-col'>
                            <input className={forms.taskTraslateInput} type="text" id="atividade1" name="atividade1" required />
                            <label className={forms.taskTraslateLabel}>Tradução</label>
                        </div>
                    </div>
                    <div className='flex w-full pt-4 flex-col justify-center items-center'>
                        <button type="submit" className={forms.greenButton}>{loading ? <span className="flex flex-row gap-4 justify-center items-center"><Oval width={30} /> Carregando...</span> : 'Salvar'}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Tasks;