import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormCreateRegistration } from './useFormCreateRegistration';
import { useState } from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { CheckIcon } from 'lucide-react';
import { cn } from './../../../lib/utils';
import { PlusCircle } from 'lucide-react';
import { useEffect } from 'react';

function FormCreateRegistration() {

  const { handleSubmit, createRegistration, errors, register, setValue, infoForCreate, setSearchParams, studentId, watch } = useFormCreateRegistration()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (studentId) setValue('student', studentId)

  }, [setValue, studentId])

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(createRegistration)} className='grid grid-cols-12 gap-2'>
        <div className='col-span-4 flex flex-col space-y-1'>
          <Label>Estudante</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {studentId
                  ? infoForCreate?.students.filter((student) => student.id == studentId)[0]?.name
                  : "Selecione"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command {...register("student")} >
                <CommandInput placeholder="Procurar estudante..." className="h-9" />
                <CommandEmpty>Sem estudantes...</CommandEmpty>
                <CommandGroup>
                  {infoForCreate?.students.map((student) => (
                    <CommandItem
                      key={student.user}
                      value={student.name}
                      onSelect={() => {
                        setSearchParams((params) => {
                          params.set("id", student.id)
                          return params
                        })
                        setValue("student", student.id)
                        setOpen(false)
                      }}
                    >
                      {student.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          studentId == student.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.student && <p className='text-sm text-red-500'>{errors.student.message}</p>}
        </div>

        <div className='col-span-4'>
          <Label>Curso</Label>
          <Select {...register('course')} onValueChange={(value) => setValue('course', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  infoForCreate?.courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>{course.name}</SelectItem>
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
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  infoForCreate?.books.map((book) => (
                    <SelectItem key={book.id} value={book.id.toString()}>{book.name}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.book && <p className='text-sm text-red-500'>{errors.book.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Turma</Label>
          <Select {...register('classroom')} onValueChange={(value) => setValue('classroom', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  infoForCreate?.classrooms.map((classrooms) => {
                    if (classrooms.books_id != watch('book')) return
                    return <SelectItem key={classrooms.id} value={classrooms.id.toString()}>{classrooms.date + " à(s) " + classrooms.hour + " hora(s)"}</SelectItem>
                  })
                }
                {
                  // se não tiver nenhuma turma disponível para o livro selecionado mostra nenhuma turma disponivel
                  infoForCreate?.classrooms.filter((classrooms) => classrooms.books_id == watch('book')).length == 0 && <SelectItem disabled value={null}>Nenhuma turma disponível!</SelectItem>
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.classroom && <p className='text-sm text-red-500'>{errors.classroom.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Tempo de matrícula</Label>
          <div className='grid grid-cols-4'>
            <Input type="number" min={1}  {...register("registrationTime")} className="rounded-r-none col-span-3" />
            <Input placeholder="Meses" readOnly className="rounded-l-none border-l-0 pointer-events-none" />
          </div>
          {errors.registrationTime && <p className='text-sm text-red-500'>{errors.registrationTime.message}</p>}
        </div>

        <div className='col-span-4'>
          <Label>Valor da mensalidade</Label>
          <Input type="text" {...register("monthlyFeeAmount")} />
          {errors.monthlyFeeAmount && <p className='text-sm text-red-500'>{errors.monthlyFeeAmount.message}</p>}
        </div>

        <Button type="submit" variant="default" className="mt-5">
          <PlusCircle className='w-4 h-4 mr-2' />
          Cadastrar
        </Button>
      </form >
    </div >
  );
}

export default FormCreateRegistration;