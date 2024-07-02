import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, isSameMonth, setYear as setYearFns } from "date-fns";
import { CalendarIcon, PlusCircle } from 'lucide-react';
import mask from 'make-mask';
import { useEffect } from 'react';
import { DatesForCalendar, PasswordGenerator, UserGenerator, cn } from '../../../../lib/utils';
import { useCreateStudent } from './useCreateStudent';

export function CreateStudents() {

  const { watch, handleSubmit, errors, register, setValue, createStudent, dateOfBirth, firstName } = useCreateStudent()

  useEffect(() => {
    setValue("password", PasswordGenerator(dateOfBirth, firstName?.toLowerCase()))
    setValue("user", UserGenerator(dateOfBirth, firstName?.toLowerCase()))
    if (!dateOfBirth) {
      setValue('dateOfBirth', new Date())
    }
  }, [dateOfBirth, firstName, setValue])

  return (
    <div className='mt-10 flex flex-col w-[1000px]'>
      <form onSubmit={handleSubmit(createStudent)} className='grid grid-cols-8 gap-2'>
        <div className='col-span-8 justify-center items-center grid'>
          <p className='font-semibold'>Perfil</p>
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Primeiro nome</Label>
          <Input placeholder="Primeiro nome" {...register('firstName')} />
          {errors.firstName && <p className='text-sm text-red-500'>{errors.firstName.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Sobrenome</Label>
          <Input placeholder="Sobrenome" {...register('lastName')} />
          {errors.lastName && <p className='text-sm text-red-500'>{errors.lastName.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>CPF</Label>
          <Input placeholder="CPF" {...register('cpf')} value={mask(watch("cpf") || "", '000.000.000-00', { reverse: true })} />
          {errors.cpf && <p className='text-sm text-red-500'>{errors.cpf.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Telefone</Label>
          <Input placeholder="Telefone" {...register('phone')} maxLength={11} />
          {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Gênero</Label>
          <Select {...register('gender')} onValueChange={(value) => setValue('gender', value)} >
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
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Data de nascimento</Label>
          <Popover>
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
                {...register('dateOfBirth', { valueAsDate: true })}
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
                footer={
                  <Select onValueChange={(value) => { setValue('dateOfBirth', setYearFns(new Date(dateOfBirth), parseInt(value))) }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {
                        DatesForCalendar()?.map((date) => (
                          <SelectItem value={date} key={date}>{date}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                }
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && <p className='text-sm text-red-500'>{errors.dateOfBirth.message}</p>}
        </div>
        <div className='col-span-8 justify-center items-center grid mt-4 mb-2'>
          <p className='font-semibold'>Endereço</p>
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>CEP</Label>
          <Input placeholder="CEP" {...register('zipCode')} maxLength={8} />
          {errors.zipCode && <p className='text-sm text-red-500'>{errors.zipCode.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Rua</Label>
          <Input placeholder="Rua" {...register('street')} />
          {errors.street && <p className='text-sm text-red-500'>{errors.street.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Bairro</Label>
          <Input placeholder="Bairro" {...register('district')} />
          {errors.district && <p className='text-sm text-red-500'>{errors.district.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Número</Label>
          <Input placeholder="Número" {...register('number', { valueAsNumber: true })} />
          {errors.number && <p className='text-sm text-red-500'>{errors.number.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Complemento</Label>
          <Input placeholder="Complemento" {...register('complement')} />
          {errors.complement && <p className='text-sm text-red-500'>{errors.complement.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Estado</Label>
          <Input placeholder="Estado" {...register('state')} />
          {errors.state && <p className='text-sm text-red-500'>{errors.state.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Cidade</Label>
          <Input placeholder="Cidade" {...register('city')} />
          {errors.city && <p className='text-sm text-red-500'>{errors.city.message}</p>}
        </div>
        <div className='col-span-8 justify-center items-center grid mt-4'>
          <p className='font-semibold'>Credenciais</p>
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Email</Label>
          <div className='grid grid-cols-2'>
            <Input placeholder="Email" {...register('email')} className="rounded-r-none" />
            <Input placeholder="@school.com" disabled className="rounded-l-none" />
          </div>
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Usúario</Label>
          <Input placeholder="Usúario" type="text" value={UserGenerator(dateOfBirth, firstName?.toLowerCase())} {...register('user')} />
          {errors.user && <p className='text-sm text-red-500'>{errors.user.message}</p>}
        </div>
        <div className='col-span-4 gap-1 flex flex-col'>
          <Label>Senha</Label>
          <Input placeholder="Senha" type="text" value={PasswordGenerator(dateOfBirth, firstName?.toLowerCase())}  {...register('password')} />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </div>
        <div className='col-span-8 flex items-center justify-center'>
          <Button type="submit" variant="default" className="mt-5">
            <PlusCircle className='w-4 h-4 mr-2' />
            Cadastrar
          </Button>
        </div>
      </form >
    </div >
  );
}
