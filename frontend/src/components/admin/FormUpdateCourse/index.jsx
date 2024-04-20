import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { useFormUpdateCourse } from './useFormUpdateCourse';
import { PlusSquare } from 'lucide-react';
import { Trash2 } from 'lucide-react';

function FormUpdateCourse() {

  const { handleSubmit, updateCourse, errors, register, addNewBook, removeBook, books } = useFormUpdateCourse()

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(updateCourse)} className='flex items-center space-y-6 flex-col justify-center gap-2'>
        {
          books?.map((book, index) => (
            <div key={index} className='grid grid-cols-11 gap-4 justify-center items-center w-[800px]'>
              <div className='col-span-5 flex flex-col space-y-1'>
                <Label htmlFor={`books.${index}.name`}>Nome</Label>
                <Input type="text" id={`books.${index}.name`} {...register(`books.${index}.name`)} value={book?.name} />
                {errors?.books?.[index]?.name && <span className='text-sm text-red-500'>{errors?.books?.[index]?.name?.message}</span>}
              </div>
              <div className='col-span-5 flex flex-col space-y-1'>
                <Label htmlFor={`books.${index}.position`}>Posição</Label>
                <Input type="text" id={`books.${index}.position`} {...register(`books.${index}.position`)} value={book?.position} />
                {errors?.books?.[index]?.position && <span className='text-sm text-red-500'>{errors?.books?.[index]?.position?.message}</span>}
              </div>
              <Button type="button" variant="destructive" onClick={removeBook} className="w-[55px] col-span-1">
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
          ))
        }
        {errors?.books && <span className='text-sm text-red-500'>{errors?.books?.root?.message}</span>}

        <Button type="button" variant="ghost" onClick={addNewBook} className="gap-2">
          <PlusSquare /> Adicionar livro
        </Button>


        <Button type="submit" variant="default" className="mt-5">
          <PlusCircle className='w-4 h-4 mr-2' />
          Cadastrar
        </Button>
      </form >
    </div >
  );
}

export default FormUpdateCourse;