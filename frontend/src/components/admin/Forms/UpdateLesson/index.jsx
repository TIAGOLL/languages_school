import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pencil, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUpdateLessonForm } from './useUpdateLessonForm';


export function UpdateLessonForm({ data }) {

  const { errors, setValue, updateLesson, register, handleSubmit,openDialog, setOpenDialog } = useUpdateLessonForm();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <AlertDialog open={openDialog}>
            <AlertDialogTrigger className="bg-green-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md" onClick={() => {
              setValue("id", data?.id)
              setValue("position", data?.position)
              setValue("name", data?.name)
              setValue("url", data?.url)
              setOpenDialog(true)
            }}>
              <Pencil className="w-4 h-4 dark:text-black" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Editar lição</AlertDialogTitle>
              <form onSubmit={handleSubmit(updateLesson)} className='gap-4 flex flex-col'>
                <div className='col-span-2 gap-1 grid w-8/12'>
                  <Label htmlFor="lessonName">Nome</Label>
                  <Input type="lessonName" {...register("name")} />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div className='col-span-2 gap-1 grid w-8/12'>
                  <Label htmlFor="lessonPosition">Posição</Label>
                  <Input type="lessonPosition" {...register("position")} />
                  {errors.position && <span className="text-red-500 text-sm">{errors.position.message}</span>}
                </div>
                <div className='col-span-2 gap-1 grid w-8/12'>
                  <Label htmlFor="lessonURL">URL (Canva)</Label>
                  <Input type="lessonURL" {...register("url")} />
                  {errors.url && <span className="text-red-500 text-sm">{errors.url.message}</span>}
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => {
                    setOpenDialog(false)
                  }}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction type="submit">
                    <Save className='w-4 h-4 mr-2' />
                    Salvar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </TooltipTrigger>
        <TooltipContent>
          Editar
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}