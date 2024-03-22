import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormCreateCourse } from './useFormCreateCourse';
import { PlusCircle } from 'lucide-react';

function FormCreateCourse() {

  const { handleSubmit, createCourse, errors, register,  } = useFormCreateCourse()

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(createCourse)} className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 flex flex-col space-y-1'>
          <Label htmlFor="name">Nome</Label>
          <Input type="text" id="name" {...register('name')} />
          {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
        </div>
        <div className='col-span-3 flex flex-col space-y-1'>
          <Label htmlFor="name">Preço</Label>
          <Input type="text" id="name" {...register('price')} />
          {errors.price && <span className='text-sm text-red-500'>{errors.price.message}</span>}
        </div>

        <Button type="submit" variant="default" className="mt-5">
          <PlusCircle className='w-4 h-4 mr-2' />
          Cadastrar
        </Button>
      </form >
    </div >
  );
}

export default FormCreateCourse;