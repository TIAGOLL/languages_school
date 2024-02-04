import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



function FormCreateStudents() {
  return (
    <form className='flex flex-col items-center gap-4 w-6/12'>
      <Input placeholder="Nome" />
      <Input placeholder="Email" />
      <Input placeholder="Livro" />
      <Button type="submit" variant="primary">Cadastrar</Button>
    </form>
  );
}

export default FormCreateStudents;