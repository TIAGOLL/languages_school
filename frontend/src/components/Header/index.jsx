import { useSelector } from 'react-redux';
import { header } from './styles.css'
import { useEffect, useState } from 'react';

function Header() {

  const { page } = useSelector(state => state.page)
  const [textButton, setTextButton] = useState('')

  useEffect(() => {
    switch (page) {
      case 'professionals':
        setTextButton('Cadastrar funcionário')
        break;
      case 'students':
        setTextButton('Cadastrar aluno')
        break;
      default:
        setTextButton(null)
    }
  }, [page])

  return (
    <section className={header.container}>
      <div className={header.content}>
        {textButton == 'Cadastrar funcionário' && <a href='/admin/professionals/create' className={header.button}>{textButton}</a>}
        {textButton == 'Cadastrar aluno' && <a href='/admin/students/create' className={header.button}>{textButton}</a>}
        <input placeholder='Search...' className={header.input} type="text" />
      </div>
    </section>
  );
}

export default Header;