import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormCreateClassrooms } from './useFormCreateClassrooms';
import { PlusCircle } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem } from '@/components/ui/select';
import { DaysOfWeek } from '../../../lib/utils';

function FormCreateClassrooms() {

  const { handleSubmit, createClassroom, errors, register, setValue, books, courses } = useFormCreateClassrooms()

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(createClassroom)} className='grid grid-cols-12 gap-2'>
        <div className='col-span-4'>
          <Label>Curso</Label>
          <Select {...register('course')} onValueChange={(value) => setValue('course', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  courses?.map((courses) => (
                    <SelectItem key={courses.id} value={courses.id.toString()}>{courses.name}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.course && <p className='text-sm text-red-500'>{errors.course.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Livro</Label>
          <Select {...register('book')} onValueChange={(value) => setValue('book', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Book" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  books?.map((book) => (
                    <SelectItem key={book.id} value={book.id.toString()}>{book.name}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.book && <p className='text-sm text-red-500'>{errors.book.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Dia</Label>
          <Select {...register('date')} onValueChange={(value) => setValue('date', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Dia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  DaysOfWeek().map((date) => (
                    <SelectItem key={date} value={date}>{date}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Hora</Label>
          <Input type="time" {...register("hour")} className="justify-" />
          {errors.hour && <p className='text-sm text-red-500'>{errors.hour.message}</p>}
        </div>

        <Button type="submit" variant="default" className="mt-5">
          <PlusCircle className='w-4 h-4 mr-2' />
          Cadastrar
        </Button>
      </form >
    </div >
  );
}

export default FormCreateClassrooms;