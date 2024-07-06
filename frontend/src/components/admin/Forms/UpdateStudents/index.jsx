import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, isSameMonth, setYear as setYearFns } from "date-fns";
import { CalendarIcon, Save } from 'lucide-react';
import { DatesForCalendar, cn } from '../../../../lib/utils';
import { useUpdateStudentForm } from './useUpdateStudentForm';


export function UpdateStudents() {

  const { dateOfBirth, gender, handleSubmit, errors, register, setValue, updateStudent } = useUpdateStudentForm()

  return (
    <div className='mt-10 flex flex-col w-[1000px]'>
      <form onSubmit={handleSubmit(updateStudent)} className='grid grid-cols-8 gap-2'>
        <div className='col-span-8 justify-center items-center grid'>
          <p className='font-semibold'>Perfil</p>
        </div>
        <div className='col-span-4'>
          <Label>ID</Label>
          <Input data-test="id" placeholder="ID" {...register('id', { valueAsNumber: true })} disabled />
          {errors.id && <p className='text-sm text-red-500'>{errors.id.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Primeiro nome</Label>
          <Input data-test="firstName" placeholder="Primeiro nome" {...register('firstName')} />
          {errors.firstName && <p className='text-sm text-red-500'>{errors.firstName.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Sobrenome</Label>
          <Input data-test="lastName" placeholder="Sobrenome" {...register('lastName')} />
          {errors.lastName && <p className='text-sm text-red-500'>{errors.lastName.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>CPF</Label>
          <Input data-test="cpf" placeholder="CPF" {...register('cpf')} disabled />
          {errors.cpf && <p className='text-sm text-red-500'>{errors.cpf.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Telefone</Label>
          <Input data-test="phone" placeholder="Telefone" {...register('phone')} maxLength={11} />
          {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Gênero</Label>
          <Select {...register('gender')} onValueChange={(value) => setValue('gender', value)} value={gender}>
            <SelectTrigger data-test="gender">
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
          <Popover {...register('dateOfBirth', { valueAsDate: true })} onValueChange={(value) => setValue('dateOfBirth', value)}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal w-full",
                  !dateOfBirth && "text-muted-foreground"
                )}
                data-test="dateOfBirth"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, "dd/MM/yyyy") : <span>Data de nascimento</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(dateOfBirth)}
                onSelect={(value) => setValue("dateOfBirth", value)}
                initialFocus
                month={dateOfBirth}
                onMonthChange={(month) => {
                  if (!isSameMonth(month, dateOfBirth)) {
                    setValue('dateOfBirth', month)
                  }
                }}
                footer={
                  <Select
                    onValueChange={(value) => { setValue('dateOfBirth', setYearFns(new Date(dateOfBirth), parseInt(value))) }}>
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
        <div className='col-span-4'>
          <Label>CEP</Label>
          <Input data-test="zipCode" placeholder="CEP" {...register('zipCode')} />
          {errors.zipCode && <p className='text-sm text-red-500'>{errors.zipCode.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Rua</Label>
          <Input data-test="street" placeholder="Rua" {...register('street')} />
          {errors.street && <p className='text-sm text-red-500'>{errors.street.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Bairro</Label>
          <Input data-test="district" placeholder="Bairro" {...register('district')} />
          {errors.district && <p className='text-sm text-red-500'>{errors.district.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Número</Label>
          <Input data-test="number" placeholder="Número" {...register('number', { valueAsNumber: true })} />
          {errors.number && <p className='text-sm text-red-500'>{errors.number.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Complemento</Label>
          <Input data-test="complement" placeholder="Complemento" {...register('complement')} />
          {errors.complement && <p className='text-sm text-red-500'>{errors.complement.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Estado</Label>
          <Input data-test="state" placeholder="Estado" {...register('state')} />
          {errors.state && <p className='text-sm text-red-500'>{errors.state.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Cidade</Label>
          <Input data-test="city" placeholder="Cidade" {...register('city')} />
          {errors.city && <p className='text-sm text-red-500'>{errors.city.message}</p>}
        </div>
        <div className='col-span-8 justify-center items-center grid mt-4'>
          <p className='font-semibold'>Credenciais</p>
        </div>
        <div className='col-span-4'>
          <Label>Email</Label>
          <Input data-test="email" placeholder="Email" {...register('email')} disabled className="rounded-r-none" />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='col-span-4'>
          <Label>Usuário</Label>
          <Input data-test="user" placeholder="Usuário" {...register('user')} disabled />
          {errors.user && <p className='text-sm text-red-500'>{errors.user.message}</p>}
        </div>
        <div className='col-span-8 flex items-center justify-center'>
          <Button type="submit" variant="default" className="mt-5">
            <Save className='w-4 h-4 mr-2' />
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}


