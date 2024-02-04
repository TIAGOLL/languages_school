import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BadgePlus, PlusCircle } from 'lucide-react';


const studentSchema = z.object({
  email: z.string().email('Digite um email válido').min(3, 'O email deve ter no mínimo 3 caracteres').trim(),
  firstName: z.string().trim().min(1, 'O primeiro nome deve ter no mínimo 1 caracteres'),
  lastName: z.string().trim().min(1, 'O sobrenome deve ter no mínimo 1 caracteres'),
  cpf: z.string().max(11, 'O CPF deve ter 11 digitos').min(11, 'O CPF deve ter 11 digitos').trim(),
  phone: z.string().max(11, 'O telefone deve ter 11 digitos').min(11, 'O telefone deve ter 11 digitos').trim(),
  dateOfBirth: z.date(),
})


function FormCreateStudents() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(studentSchema),
    mode: 'all',
    criteriaMode: 'all'
  })

  function createStudent(data) {
    console.log(data)
    console.log(errors)
  }

  return (
    <form onSubmit={handleSubmit(createStudent)} className='flex flex-col items-center justify-center gap-4 w-10/12'>
      <div className='flex flex-wrap gap-2 w-full'>
        <Input placeholder="Email" {...register('email')} />
        {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        <Input placeholder="Primeiro nome" {...register('firstName')} />
        {errors.firstName && <p className='text-sm text-red-500'>{errors.firstName.message}</p>}
        <Input placeholder="Sobrenome" {...register('lastName')} />
        {errors.lastName && <p className='text-sm text-red-500'>{errors.lastName.message}</p>}
        <Input placeholder="CPF" {...register('cpf')} maxLength={11} />
        {errors.cpf && <p className='text-sm text-red-500'>{errors.cpf.message}</p>}
        <Input placeholder="Telefone" {...register('phone')} maxLength={11} />
        {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
        <Input placeholder="Genero" {...register('gender')} />
        <Input placeholder="Data de nascimento" {...register('dateOfBirth')} />
        <Input placeholder="Book" {...register('book')} />
      </div>
      <Button type="submit" variant="default"><PlusCircle className='w-4 h-4 mr-2' />Cadastrar</Button>
    </form>
  );
}

export default FormCreateStudents;