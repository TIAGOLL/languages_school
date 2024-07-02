import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusSquare } from 'lucide-react';
import { useCreateBookForm } from './useCreateBookForm';


export function CreateBookForm({ course }) {

  const { errors, createBook, openDialog, setOpenDialog, register, handleSubmit, setValue } = useCreateBookForm();

  return (
    <AlertDialog open={openDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="gap-2 flex flex-row items-center justify-center" onClick={() => {
          setValue("course", parseInt(course))
          setValue("name", "")
          setValue("position", 0)
          setOpenDialog(true)
        }}>
          <PlusSquare />
          Adicionar livro
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(createBook)}>
          <AlertDialogHeader className="mb-5">
            <AlertDialogTitle>Novo livro</AlertDialogTitle>
            <AlertDialogDescription>
              Descreva o livro que deseja adicionar
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='gap-4 flex flex-col'>
            <div className='flex gap-1 flex-col'>
              <Label htmlFor="name">Nome</Label>
              <Input type="text" id="name" {...register("name")} className="w-[20rem]" />
              {errors?.name && <span className='text-sm text-red-500'>{errors?.name?.message}</span>}
            </div>
            <div className='flex gap-1 flex-col'>
              <Label htmlFor="position">Posição</Label>
              <Input type="text" id="position" {...register("position", { valueAsNumber: true })} className="w-[20rem]" />
              {errors?.position && <span className='text-sm text-red-500'>{errors?.position?.message}</span>}
            </div>
          </div>
          <AlertDialogFooter className="mt-8">
            <AlertDialogCancel onClick={() => {
              setOpenDialog(false)
            }}>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">Cadastrar</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}