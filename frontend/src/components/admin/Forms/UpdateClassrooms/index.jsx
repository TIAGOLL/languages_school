import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormUpdateClassrooms } from './useFormUpdateClassrooms';
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem } from '@/components/ui/select';
import { Save } from 'lucide-react';
import { DaysOfWeek } from '../../../../lib/utils';

export function UpdateClassrooms() {

  const { handleSubmit, updateClassroom, errors, register, setValue, books, courses, currentBook, currentDate, currentCourse } = useFormUpdateClassrooms()

  if (!books || !courses) return <p>Carregando...</p>

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(updateClassroom)} className='grid grid-cols-12 gap-2'>
        <div className='col-span-4'>
          <div className='col-span-4'>
            <Label>Curso</Label>
            <Select {...register('course')} onValueChange={(value) => setValue('course', value)} value={currentCourse?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    courses?.map((course) => {
                      return <SelectItem key={course.id} value={course.id.toString()}>{course.name}</SelectItem>
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.course && <p className='text-sm text-red-500'>{errors.course.message}</p>}
          </div>
        </div>
        <div className='col-span-4'>
          <Label>Livro</Label>
          <Select {...register('book')} onValueChange={(value) => setValue('book', value)} value={currentBook?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Book" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  books?.map((book) => {
                    if (currentCourse != book.courses_id) return
                    return <SelectItem key={book.id} value={book.id.toString()}>{book.name}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.book && <p className='text-sm text-red-500'>{errors.book.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Dia</Label>
          <Select {...register('date')} onValueChange={(value) => setValue('date', value)} value={currentDate}>
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
          <Save className='w-4 h-4 mr-2' />
          Salvar
        </Button>
      </form >
    </div >
  );
}
