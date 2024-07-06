
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialog } from '@/components/ui/alert-dialog';
import { Pencil, Save } from 'lucide-react';
import { useUpdateCourseForm } from './useUpdateCourseForm';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';

export function UpdateCourseForm({ data }) {

  const { handleSubmit, updateCourse, errors, register, setValue, dialogOpen, setDialogOpen } = useUpdateCourseForm()

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className='pt-3'>
            <AlertDialog open={dialogOpen}>
              <AlertDialogTrigger className='bg-orange-300 p-1 m-0 rounded-md' onClick={() => {
                setValue("id", data.id)
                setValue("name", data.name)
                setValue("price", data.price)
                setDialogOpen(true)
              }}>
                <Pencil className="w-4 h-4 dark:text-black" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Editar curso</AlertDialogTitle>
                <form onSubmit={handleSubmit(updateCourse)} className='flex flex-col gap-6'>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='col-span-2 gap-1 grid w-8/12'>
                      <Label htmlFor="name">Nome</Label>
                      <Input type="name" {...register("name")} />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div className='col-span-2 gap-1 grid w-8/12'>
                      <Label htmlFor="price">Preço</Label>
                      <Input type="price" {...register("price", { valueAsNumber: true })} />
                      {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>
                    <AlertDialogFooter className="col-span-2">
                      <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancelar</AlertDialogCancel>
                      <AlertDialogAction type="submit">
                        <Save className='w-4 h-4 dark:text-black mr-2' />
                        Salvar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </div>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          Editar curso
        </TooltipContent>
      </Tooltip >
    </TooltipProvider>
  )
}