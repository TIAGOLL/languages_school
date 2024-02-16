import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Popover } from '@/components/ui/popover';
import { PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from './../../../lib/utils';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { format, isSameMonth, setYear as setYearFns } from "date-fns"
import { PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useStudent } from "../../../pages/admin/AdmStudents/useStudent";
import { Label } from '@/components/ui/label';


function FormUpdateStudents() {

  const { books, watch, handleSubmit, errors, register, setValue, updateStudent, datesForCalendar } = useStudent()

  const dateOfBirth = watch('dateOfBirth')
  const gender = watch('gender')
  const currentBook = watch('book')

  return (
    <div className='mt-10 flex flex-col'>
      <form onSubmit={handleSubmit(updateStudent)} className='grid grid-cols-8 gap-2'>
        <div className='col-span-8 justify-center items-center grid'>
          <p className='font-semibold'>Perfil</p>
        </div>
        <div className='col-span-4'>
          <Label>ID</Label>
          <Input placeholder="ID" {...register('id')} disabled />
          {errors.id && <p className='text-sm text-red-500'>{errors.id.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Primeiro nome</Label>
          <Input placeholder="Primeiro nome" {...register('firstName')} />
          {errors.firstName && <p className='text-sm text-red-500'>{errors.firstName.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Sobrenome</Label>
          <Input placeholder="Sobrenome" {...register('lastName')} />
          {errors.lastName && <p className='text-sm text-red-500'>{errors.lastName.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>CPF</Label>
          <Input placeholder="CPF" {...register('cpf')} maxLength={11} />
          {errors.cpf && <p className='text-sm text-red-500'>{errors.cpf.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Telefone</Label>
          <Input placeholder="Telefone" {...register('phone')} maxLength={11} />
          {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Gênero</Label>
          <Select {...register('gender')} onValueChange={(value) => setValue('gender', value)} value={gender}>
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
          <Label>Data de nascimento</Label>
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
              <Select
                onValueChange={(value) => {
                  setValue('dateOfBirth', setYearFns(new Date(dateOfBirth), parseInt(value)))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {
                    datesForCalendar()?.map((date) => (
                      <SelectItem value={date}>{date}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <Calendar
                mode="single"
                selected={(new Date(dateOfBirth))}
                onSelect={(value) => setValue("dateOfBirth", value)}
                initialFocus
                month={dateOfBirth}
                onMonthChange={(month) => {
                  if (!isSameMonth(month, dateOfBirth)) {
                    setValue('dateOfBirth', month)
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && <p className='text-sm text-red-500'>{errors.dateOfBirth.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Livro</Label>
          <Select {...register('book')} onValueChange={(value) => setValue('book', value)} value={currentBook}>
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
        <div className='col-span-8 justify-center items-center grid mt-4 mb-2'>
          <p className='font-semibold'>Endereço</p>
        </div>
        <div className='col-span-4'>
          <Label>CEP</Label>
          <Input placeholder="CEP" {...register('zipCode')} />
          {errors.zipCode && <p className='text-sm text-red-500'>{errors.zipCode.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Rua</Label>
          <Input placeholder="Rua" {...register('street')} />
          {errors.street && <p className='text-sm text-red-500'>{errors.street.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Bairro</Label>
          <Input placeholder="Bairro" {...register('district')} />
          {errors.district && <p className='text-sm text-red-500'>{errors.district.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Complemento</Label>
          <Input placeholder="Complemento" {...register('complement')} />
          {errors.complement && <p className='text-sm text-red-500'>{errors.complement.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Estado</Label>
          <Input placeholder="Estado" {...register('state')} />
          {errors.state && <p className='text-sm text-red-500'>{errors.state.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Cidade</Label>
          <Input placeholder="Cidade" {...register('city')} />
          {errors.city && <p className='text-sm text-red-500'>{errors.city.message}</p>}
        </div>
        <div className='col-span-8 justify-center items-center grid mt-4'>
          <p className='font-semibold'>Credenciais</p>
        </div>
        <div className='col-span-4'>
          <Label>Email</Label>
          <div className='grid grid-cols-2'>
            <Input placeholder="Email" {...register('email')} disabled className="rounded-r-none" />
            <Input placeholder="@school.com" disabled className="rounded-l-none" />
          </div>
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Senha</Label>
          <Input placeholder="Senha" type="password" {...register('password')} />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </div>

        <Button type="submit" variant="default">
          <PlusCircle className='w-4 h-4 mr-2' />
          Atualizar
        </Button>
      </form>
    </div>
  );
}

export default FormUpdateStudents;

