import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Pencil, Save } from 'lucide-react';
import { useFormUpdateBooksForm } from './useFormUpdateBooksForm';


export function UpdateBookForm({ data }) {

  const { setValue, handleSubmit, register, errors, updateBook, openDialog, setOpenDialog } = useFormUpdateBooksForm()

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <AlertDialog className="grid-rows-10 grid-cols-10 justify-center" open={openDialog}>
            <AlertDialogTrigger className="bg-green-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md" onClick={() => {
              setValue("id", data.id)
              setValue("position", data.position)
              setValue("name", data.name)
              setOpenDialog(true)
            }}>
              <Pencil className="w-4 h-4 dark:text-black" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <form onSubmit={handleSubmit(updateBook)} className='flex flex-col gap-6'>
                <AlertDialogTitle>Editar livro</AlertDialogTitle>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='col-span-2 gap-1 grid w-8/12'>
                    <Label htmlFor="name">Nome</Label>
                    <Input type="name" {...register("name")} />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                  </div>
                  <div className='col-span-2 gap-1 grid w-8/12'>
                    <Label htmlFor="position">Posição</Label>
                    <Input type="position" {...register("position", { valueAsNumber: true })} />
                    {errors.position && <span className="text-red-500 text-sm">{errors.position.message}</span>}
                  </div>
                  <AlertDialogFooter className="col-span-2">
                    <AlertDialogCancel onClick={() => setOpenDialog(false)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction type="submit">
                      <Save className='w-4 h-4 dark:text-black mr-2' />
                      Salvar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </TooltipTrigger>
        <TooltipContent>
          Editar livro
        </TooltipContent>
      </Tooltip >
    </TooltipProvider>
  )
}