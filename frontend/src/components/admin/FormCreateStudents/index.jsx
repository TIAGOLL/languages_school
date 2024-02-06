import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { cn } from './../../../lib/utils';
import { useCreateStudent } from '../../../pages/admin/AdmStudents/useCreateStudent';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { useState } from 'react';

function FormCreateStudents() {

  const { register, handleSubmit, errors, watch, setValue, createStudent, books, isLoading } = useCreateStudent();

  const [open, setOpen] = useState(false);
  const [filterBook, setFilterBook] = useState('')

  const dateOfBirth = watch('dateOfBirth')

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(createStudent)} className='grid grid-cols-8 gap-2'>
        <div className='col-span-8 justify-center items-center grid'>
          <p className='font-semibold'>Perfil</p>
        </div>
        <div className='col-span-4'>
          <Input placeholder="Primeiro nome" {...register('firstName')} />
          {errors.firstName && <p className='text-sm text-red-500'>{errors.firstName.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Sobrenome" {...register('lastName')} />
          {errors.lastName && <p className='text-sm text-red-500'>{errors.lastName.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="CPF" {...register('cpf')} maxLength={11} />
          {errors.cpf && <p className='text-sm text-red-500'>{errors.cpf.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Telefone" {...register('phone')} maxLength={11} />
          {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        </div>
        <div className='col-span-4'>
          <Select {...register('gender')} onValueChange={(value) => setValue('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Feminino</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.gender && <p className='text-sm text-red-500'>{errors.gender.message}</p>}
        </div>
        <div className='col-span-4'>
          <Popover {...register('dateOfBirth')} onValueChange={(value) => setValue('dateOfBirth', value)}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal w-full",
                  !dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, "dd/MM/yyyy") : <span>Data de nascimento</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={(value) => setValue("dateOfBirth", value)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && <p className='text-sm text-red-500'>{errors.dateOfBirth.message}</p>}
        </div>
        <div className='col-span-4'>
          <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between w-full font-normal"
              >
                {filterBook
                  ? books?.find((book) => book.name.toLowerCase() == filterBook.toLowerCase())?.name
                  : "Selecione o livro"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>Nenhum livro encontrado</CommandEmpty>
                <CommandGroup {...register('book')}>
                  {books?.map((book) => (
                    <CommandItem
                      key={book.id}
                      value={book.id}
                      onSelect={(currentValue) => {
                        setValue('book', book.id.toString())
                        setFilterBook(currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filterBook.toLowerCase() == book.name.toLowerCase() ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {book.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='col-span-8 justify-center items-center grid mt-4'>
          <p className='font-semibold'>Endereço</p>
        </div>
        <div className='col-span-4'>
          <Input placeholder="CEP" {...register('zipCode')} />
          {errors.zipCode && <p className='text-sm text-red-500'>{errors.zipCode.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Rua" {...register('street')} />
          {errors.street && <p className='text-sm text-red-500'>{errors.street.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Bairro" {...register('district')} />
          {errors.district && <p className='text-sm text-red-500'>{errors.district.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Complemento" {...register('complement')} />
          {errors.complement && <p className='text-sm text-red-500'>{errors.complement.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Estado" {...register('state')} />
          {errors.state && <p className='text-sm text-red-500'>{errors.state.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Cidade" {...register('city')} />
          {errors.city && <p className='text-sm text-red-500'>{errors.city.message}</p>}
        </div>
        <div className='col-span-8 justify-center items-center grid mt-4'>
          <p className='font-semibold'>Credenciais</p>
        </div>
        <div className='col-span-4'>
          <Input placeholder="Email" {...register('email')} />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='col-span-4'>
          <Input placeholder="Senha" type="password" {...register('password')} />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </div>

        <Button type="submit" variant="default">
          <PlusCircle className='w-4 h-4 mr-2' />
          Cadastrar
        </Button>
      </form>
    </div>
  );
}

export default FormCreateStudents;