import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircle, Save } from 'lucide-react';
import { useCreateLesson } from './useCreateLesson';


export function CreateLessonForm({ book }) {

  const { errors, setValue, createLesson, openDialog, setOpenDialog, register, handleSubmit } = useCreateLesson();

  return (
    <AlertDialogFooter className="justify-center !flex-col flex items-center gap-2">
      <div className='w-[10rem] flex flex-col justify-center items-center gap-2'>
        <AlertDialog open={openDialog}>
          <AlertDialogTrigger asChild variant="default" className="w-full mb-5 flex-row flex" >
            <Button variant="ghost" onClick={() => {
              setValue("name", "")
              setValue("position", 0)
              setValue("url", "")
              setValue("book", book)
              setOpenDialog(true)
              console.log(book)
            }}>
              <PlusCircle className='w-4 h-4 mr-2' />
              Adicionar lição
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Nova lição</AlertDialogTitle>
            <AlertDialogDescription>
              Descreva a lição que deseja adicionar
            </AlertDialogDescription>
            <form onSubmit={handleSubmit(createLesson)} className='gap-2 flex flex-col'>
              <div className='col-span-2 gap-1 grid w-8/12'>
                <Label htmlFor="lessonName">Nome</Label>
                <Input type="lessonName" {...register("name")} />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div className='col-span-2 gap-1 grid w-8/12'>
                <Label htmlFor="lessonPosition">Posição</Label>
                <Input type="lessonPosition" {...register("position", { valueAsNumber: true })} />
                {errors.position && <span className="text-red-500 text-sm">{errors.position.message}</span>}
              </div>
              <div className='col-span-2 gap-1 grid w-8/12'>
                <Label htmlFor="lessonURL">URL (Canva)</Label>
                <Input type="lessonURL" {...register("url")} />
                {errors.url && <span className="text-red-500 text-sm">{errors.url.message}</span>}
              </div>
              <AlertDialogFooter className="mt-8">
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction type="submit">
                  <Save className='w-4 h-4 mr-2' />
                  Salvar
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialogCancel variant="default" className="w-full border-2">Sair</AlertDialogCancel>
      </div>
    </AlertDialogFooter>
  )
}