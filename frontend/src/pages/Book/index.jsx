import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Oval } from 'svg-loaders-react';

import SideBar from '../../components/SideBar/index';
import { ChangePage } from '../../redux/features/activePage';
import forms from '../../styles/forms';
import axios from 'axios';
import Lesson1 from '../../components/Books/Book1/lessons/Lesson1/index.jsx';
import Lesson2 from './../../components/Books/Book1/lessons/Lesson2/index';
import Lesson3 from './../../components/Books/Book1/lessons/Lesson3/index';

function Book() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [lesson, setLesson] = useState();

  async function getData() {
    const { email } = await JSON.parse(localStorage.getItem('@ticketsPRO'));

    await axios.get(`http://localhost:3030/bookpage/${email}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    dispatch(ChangePage('book'));
    getData();
  }, []);

  if (loading)
    return (
      <div className="flex w-full h-full bg-zinc-400 items-start justify-start">
        <SideBar />
        <section className="w-full items-center justify-center flex flex-col">
          <div className="w-full h-full flex items-center justify-center p-24">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-500">
                <Oval />
              </h1>
            </div>
          </div>
        </section>
      </div>
    );

  if (lesson == null && loading == false) {
    return (
      <div className='flex bg-zinc-300 flex-row h-screen'>
        <SideBar />
        <div className='flex flex-col h-full w-screen items-center justify-start'>
          <div className='flex w-full h-full flex-col justify-start mt-40 items-center overflow-y-auto'>
            <h1 className='flex text-center pt-4 font-semibold text-2xl gap-2'>{data.name}, <span className='text-2xl font-normal'>escolha sua Lesson</span></h1>
            <div className='flex relative w-5/12 items-center justify-center flex-col'>
              <select id="lesson" onChange={e => setLesson(e.target.value)} value={lesson} className={forms.input}>
                <option htmlFor='lesson' disabled selected hidden value={null}>Escolha</option>
                {
                  data.books.lessons.map((item) => {
                    return (
                      <option key={item.id} htmlFor='lesson' value={item.id}>{item.title}</option>
                    )
                  })
                }
              </select>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex bg-zinc-300 flex-row h-screen'>
      <SideBar />
      <div className='flex flex-col w-screen items-center justify-start'>
        <div className='w-full h-20 border-l-2 justify-center items-center flex border-zinc-600 bg-slate-800 text-white'>
          <h1 className='w-5/12 justify-start flex items-center font-bold text-2xl'>{data.books.name}</h1>
          <button onClick={() => setLesson(null)} className='w-5/12 justify-end items-center flex font-normal text-md hover:animate-pulse'>Mudar a lesson</button>
        </div>
        <div className='flex w-full flex-col justify-start overflow-y-auto'>
          <div className='w-full flex items-center justify-center p-24 pt-10 pb-10'>
            {
              lesson == 1 &&
              <Lesson1 />
            }
            {
              lesson == 2 &&
              <Lesson2 />
            }
            {
              lesson == 3 &&
              <Lesson3 />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
