import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from './../../ui/PaginationSection';
import { useDataTableCourses } from './useDataTableCourses';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { AlertDialog, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogContent } from '@/components/ui/alert-dialog';



function DataTableCourses() {
  const { isLoading, courses, coursesPagination, deleteCourse, setDiaglogHandleCourseOpen, diaglogHandleCourseOpen, registerHandleCourse, handleSubmitHandleCourse, errorsHandleCourse, watchHandleCourse, setValueHandleCourse, handleCourse } = useDataTableCourses();

  return (
    <div className='mb-10'>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Alunos matriculados</TableHead>
              <TableHead>Books cadastrados</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && coursesPagination?.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    {
                      course?.registrations?.reduce((acc, item) => {
                        if (item.courses_id == course.id) {
                          acc += 1;
                        }
                        return acc;
                      }, 0)
                    }
                  </TableCell>
                  <TableCell>
                    {
                      course?.books?.length
                    }
                  </TableCell>
                  <TableCell className="space-x-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <span className='pt-3'>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className='bg-orange-300 p-1 m-0 rounded-md' onClick={() => {
                                  setValueHandleCourse("id", course.id)
                                  setValueHandleCourse("name", course.name)
                                  setValueHandleCourse("price", course.price)
                                }}>
                                  <Pencil className="w-4 h-4 dark:text-black" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <form onSubmit={handleSubmitHandleCourse(handleCourse)} className='flex flex-col gap-6'>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Editar curso</AlertDialogTitle>
                                  </AlertDialogHeader>
                                  <div className='grid grid-cols-2 gap-3'>
                                    <div className='col-span-2 gap-1 grid w-8/12'>
                                      <Label htmlFor="name">Nome</Label>
                                      <Input type="name" {...registerHandleCourse("name")} />
                                      {errorsHandleCourse.name && <span className="text-red-500 text-sm">{errorsHandleCourse.name.message}</span>}
                                    </div>
                                    <div className='col-span-2 gap-1 grid w-8/12'>
                                      <Label htmlFor="price">Preço</Label>
                                      <Input type="price" {...registerHandleCourse("price")} />
                                      {errorsHandleCourse.price && <span className="text-red-500 text-sm">{errorsHandleCourse.price.message}</span>}
                                    </div>
                                    <AlertDialogFooter className="col-span-2">
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction type="submit">
                                        <Save className='w-4 h-4 dark:text-black mr-2' />Salvar
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
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="link" className="py-0 px-0 m-0">
                            <a href={`/admin/courses?tab=updatebooks&id=${course.id}`} className='flex flex-row bg-green-400 justify-center items-center p-1 rounded-md'>
                              <NotebookPen className='w-4 h-4 dark:text-black' />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Editar livros
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <button variant="link" className="p-0 m-0">
                                <div className='flex flex-row bg-red-300 justify-center items-center p-1 rounded-md'>
                                  <Trash2 className='w-4 h-4 dark:text-black' />
                                </div>
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Aviso</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Você tem certeza que deseja DELETAR o curso: <strong>{course?.name}</strong>?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={async () => await deleteCourse(course.id)}>
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
                  </TableCell>
                </TableRow>
              ))
            }
            {
              isLoading && (
                <TableRow>
                  <TableCell className="font-medium">
                    <Skeleton className="h-6 w-4/12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-4/12" />
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-right" colSpan={5}>Total de cursos: {courses?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div >
      <div className="border p-2 border-t-0 rounded-b-lg">
        <PaginationSection
          data={courses}
        />
      </div>
    </div>
  );
}

export default DataTableCourses;