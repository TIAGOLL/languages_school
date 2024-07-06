import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LockKeyholeIcon } from 'lucide-react';
import { useUpdateLockRegistrationForm } from './useUpdateLockRegistrationForm';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

export function UpdateLockRegistrationForm({ data }) {

  const { updateLockRegistration, register, handleSubmit, errors, setValue } = useUpdateLockRegistrationForm()
  return (
    <AlertDialog>
      <AlertDialogTrigger className='flex flex-row justify-between w-full p-2 text-sm rounded-md hover:bg-accent cursor-default' onClick={() => {
        setValue("student", data.students_id)
        setValue("registration", data.id)
      }}>
        {data.locked == 0 ? "Trancar matricula" : "Destrancar matricula"}
        <LockKeyholeIcon className='w-4 h-4 text-muted-foreground' />
      </AlertDialogTrigger>
      <AlertDialogContent >
        <AlertDialogTitle className="!justify-center flex w-full">Aviso</AlertDialogTitle>
        <AlertDialogDescription className="text-black text-sm dark:text-white">
          Você tem certeza que deseja {data.locked == 0 ? "TRANCAR" : "DESTRANCAR"} a matricula do aluno: {data.students.name}?
        </AlertDialogDescription>
        <form onSubmit={handleSubmit(updateLockRegistration)} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <Label>Description</Label>
            <Textarea {...register("description")} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>
          <AlertDialogFooter className="w-full flex !justify-between !items-start">
            <AlertDialogCancel variant="default">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction type="submit">
              {data.locked == 0 ? "Trancar matricula" : "Destrancar matricula"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog >
  )
}