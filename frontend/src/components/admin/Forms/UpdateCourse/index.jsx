
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialog } from '@/components/ui/alert-dialog';
import { Pencil, Save } from 'lucide-react';
import { useUpdateCourseForm } from './useUpdateCourseForm';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { useEffect } from 'react';


export function UpdateCourseForm({ data }) {

  const { handleSubmit, updateCourse, errors, register, setValue } = useUpdateCourseForm()

  useEffect(() => {
    setValue("id", data.id)
  }, [data, setValue])

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className='pt-3'>
            <AlertDialog>
              <AlertDialogTrigger className='bg-orange-300 p-1 m-0 rounded-md' >
                <Pencil className="w-4 h-4 dark:text-black" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Editar curso</AlertDialogTitle>
                <form onSubmit={handleSubmit(updateCourse)} className='flex flex-col gap-6'>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='col-span-2 gap-1 grid w-8/12'>
                      <Label htmlFor="name">Nome</Label>
                      <Input type="name" {...register("name", { onChange: (e) => setValue("name", e.target.value), value: data.name })} />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div className='col-span-2 gap-1 grid w-8/12'>
                      <Label htmlFor="price">Preço</Label>
                      <Input type="price" {...register("price", { onChange: (e) => setValue("price", e.target.value), value: data.price })} />
                      {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>
                    <AlertDialogFooter className="col-span-2">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
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