import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormCreateRegistration } from './useFormCreateRegistration';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { CheckIcon } from 'lucide-react';
import { cn } from './../../../lib/utils';
import { PlusCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format, isSameMonth } from "date-fns";


function FormCreateRegistration() {

  const { handleSubmit, createRegistration, errors, register, setValue, infoForCreate, setSearchParams, studentId, currentCourse, setOpenInputStudent, openInputStudent, startDate } = useFormCreateRegistration()

  if (!infoForCreate) return <p>Carregando...</p>

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(createRegistration)} className='grid grid-cols-12 gap-2'>
        <div className='col-span-4 flex flex-col space-y-1'>
          <Label>Estudante</Label>
          <Popover open={openInputStudent} onOpenChange={setOpenInputStudent}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openInputStudent}
                className="justify-between"
              >
                {studentId
                  ? infoForCreate?.students.filter((student) => student.id == studentId)[0]?.name
                  : "Selecione"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]">
              <Command {...register("student")} >
                <CommandInput placeholder="Procurar estudante..." className="h-9" />
                <CommandEmpty>Sem estudantes...</CommandEmpty>
                <CommandGroup className="h-56 overflow-y-auto w-full">
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
                        setOpenInputStudent(false)
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          studentId == student.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex justify-between w-full flex-row">
                        <span>{student.name}</span>
                        <span>{student.id}</span>
                      </div>
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
          <Select {...register('course')} onValueChange={(value) => {
            setValue('course', value)
            setValue('classroom', undefined)
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  infoForCreate?.courses.map((course) => {
                    // filtra somente os cursos que o aluno ainda não faz
                    const aux = infoForCreate.students.filter((student) => student.id == studentId)[0]?.registrations.map((registration) => {
                      if (registration.courses_id == course.id) return false
                    })
                    if (aux?.find((item) => item == false) == false) return

                    return <SelectItem key={course.id} value={course.id.toString()}>{course.name}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.course && <p className='text-sm text-red-500'>{errors.course.message}</p>}
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
                    if (classrooms.books.courses_id != currentCourse) return
                    return <SelectItem key={classrooms.id} value={classrooms.id.toString()}>{classrooms.date + " à(s) " + classrooms.hour + " hora(s)"}</SelectItem>
                  })
                }
                {
                  // se não tiver nenhuma turma disponível para o livro selecionado mostra nenhuma turma disponivel
                  infoForCreate?.classrooms.filter((classrooms) => classrooms.books.courses_id == currentCourse).length == 0 && <SelectItem disabled value={null}>Nenhuma turma disponível!</SelectItem>
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.classroom && <p className='text-sm text-red-500'>{errors.classroom.message}</p>}
        </div>

        <div className='col-span-4'>
          <Label htmlFor="discount">Desconto (R$)</Label>
          <Input type="text" id="discount" {...register("discount")} />
          {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
        </div>

        <div className='col-span-4'>
          <Label>Valor da mensalidade</Label>
          <Input type="text" {...register("monthlyFeeAmount")} readOnly />
          {errors.monthlyFeeAmount && <p className='text-sm text-red-500'>{errors.monthlyFeeAmount.message}</p>}
        </div>

        <div className='col-span-4'>
          <Label>Data de início</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal w-full",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd/MM/yyyy") : <span>Data de ínicio</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                {...register('startDate')}
                lan="pt-BR"
                mode="single"
                selected={(new Date(startDate))}
                onSelect={(value) => setValue("startDate", value)}
                initialFocus
                month={startDate}
                onMonthChange={(month) => {
                  if (!isSameMonth(month, startDate)) {
                    setValue('startDate', month)
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && <p className='text-sm text-red-500'>{errors.startDate.message}</p>}
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