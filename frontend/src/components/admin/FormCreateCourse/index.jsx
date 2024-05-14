import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormCreateCourse } from './useFormCreateCourse';
import { PlusCircle } from 'lucide-react';
import { PlusSquare } from 'lucide-react';
import { Trash2 } from 'lucide-react';

function FormCreateCourse() {

  const { handleSubmit, createCourse, errors, register, addNewBook, books, removeBook } = useFormCreateCourse()

  return (
    <div className='mt-10 flex flex-col mb-10'>
      <form onSubmit={handleSubmit(createCourse)} className='flex items-center space-y-6 flex-col justify-center gap-2'>
        <div className='justify-center items-center'>
          <p className='font-semibold'>Curso</p>
        </div>
        <div className='grid grid-cols-4 gap-4 justify-center items-center w-[800px]'>
          <div className='col-span-2 flex flex-col space-y-1'>
            <Label htmlFor="name">Nome</Label>
            <Input type="text" id="name" {...register('course.name')} />
            {errors?.course?.name && <span className='text-sm text-red-500'>{errors?.course?.name?.message}</span>}
          </div>
          <div className='col-span-2 flex flex-col space-y-1'>
            <Label htmlFor="price">Preço</Label>
            <Input type="text" id="price" {...register('course.price')} />
            {errors?.course?.price && <span className='text-sm text-red-500'>{errors?.course?.price.message}</span>}
          </div>
        </div>
        <div className='justify-center items-center'>
          <p className='font-semibold'>Livros</p>
        </div>

        {
          books.map((book, index) => (
            <div key={index} className='grid grid-cols-9 gap-4  w-[800px]'>
              <div className='col-span-4 flex flex-col space-y-1'>
                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" {...register(`books.${index}.name`)} />
                {errors?.books?.[index]?.name && <span className='text-sm text-red-500'>{errors?.books?.[index]?.name?.message}</span>}
              </div>
              <div className='col-span-4 flex flex-col space-y-1'>
                <Label htmlFor="position">Posição</Label>
                <Input type="text" id="position" {...register(`books.${index}.position`)} />
                {errors?.books?.[index]?.position && <span className='text-sm text-red-500'>{errors?.books?.[index]?.position?.message}</span>}
              </div>
              <div className='col-span-1 items-center flex'>
                <Button type="button" variant="destructive" onClick={removeBook} className="w-[55px] col-span-1">
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
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
      </form>
    </div>
  );
}

export default FormCreateCourse;