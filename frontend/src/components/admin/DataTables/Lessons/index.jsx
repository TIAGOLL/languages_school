import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { FaTasks } from 'react-icons/fa';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { useLessons } from './useLessons';
import { UpdateLessonForm } from '../../Forms/UpdateLesson';
import { CreateLessonForm } from '../../Forms/CreateLesson';


export function Lessons({ book }) {

  const { lessons, deleteLesson } = useLessons(book);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <AlertDialog className="grid-rows-10 grid-cols-10 justify-center">
            <AlertDialogTrigger className="bg-orange-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md" >
              <FaTasks className='w-4 h-4' />
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[calc(100vw-100px)] flex flex-col max-h-[calc(100vh-50px)] justify-center items-center">
              <AlertDialogTitle>Lições</AlertDialogTitle>
              <AlertDialogDescription>
                curso: {book.courses.name} | Livro: {book.name}
              </AlertDialogDescription>
              <ScrollArea className='h-[calc(100vh-400px)] flex justify-center items-center gap-2 mt-10'>
                {
                  lessons && lessons?.map((lesson, index) => (
                    <div className='w-full flex h-full justify-center items-center' key={lesson.id}>
                      <div key={index} className='grid grid-cols-12 w-8/12 space-x-2 mb-3 justify-center items-center'>
                        <div className='col-span-1 flex flex-col space-y-1'>
                          <Label htmlFor={`lessons.${index}.position`}>Posição</Label>
                          <Input type="text" id={`lessons.${index}.position`} value={lesson.position} readOnly />
                        </div>
                        <div className='col-span-3 flex flex-col space-y-1'>
                          <Label htmlFor={`lessons.${index}.name`}>Nome</Label>
                          <Input type="text" id={`lessons.${index}.name`} value={lesson.name} readOnly />
                        </div>
                        <div className='col-span-7 flex flex-col space-y-1'>
                          <Label htmlFor={`lessons.${index}.url`}>URL (Canva)</Label>
                          <Input type="text" id={`lessons.${index}.url`} value={lesson.url} readOnly />
                        </div>
                        <div className='col-span-1 flex flex-row justify-center items-end gap-2 pl-4 h-full'>
                          <UpdateLessonForm data={lesson} />
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger>
                                <AlertDialog>
                                  <AlertDialogTrigger className="bg-red-400 text-black col-span-1 justify-center flex items-center p-2 rounded-md">
                                    <Trash2 className='w-4 h-4' />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogTitle>Aviso</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Você tem certeza que deseja DELETAR a lição: {lesson?.name}?
                                    </AlertDialogDescription>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={async () => await deleteLesson(lesson.id)}>
                                        <Trash2 className='w-4 h-4 mr-2' />
                                        Deletar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TooltipTrigger>
                              <TooltipContent>
                                Excluir
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  ))
                }
                {
                  lessons?.length === 0 && <span className='text-md text-red-500 font-bold justify-center overflow-y-hidden w-full flex'>Nenhuma lição cadastrada</span>
                }
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <CreateLessonForm book={book.id} />
            </AlertDialogContent>
          </AlertDialog>
        </TooltipTrigger>
        <TooltipContent>
          Ver lições
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}