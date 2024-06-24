import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NotebookPen, Trash2 } from 'lucide-react';
import { useDataTableCourses } from './useDataTableCourses';
import PaginationSection from '../../../ui/PaginationSection';
import { UpdateCourseForm } from '../../Forms/UpdateCourse';



export function DataTableCourses() {
  const { isLoading, courses, coursesPagination, deleteCourse, refetch } = useDataTableCourses();

  return (
    <div className='mb-10'>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Alunos matriculados</TableHead>
              <TableHead>Total de livros</TableHead>
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
                    <UpdateCourseForm data={course} refetch={refetch} />
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger className="py-0 px-0 m-0">
                          <a href={`/admin/courses?tab=updatebooks&id=${course.id}`} className='flex flex-row bg-green-400 justify-center items-center p-1 rounded-md'>
                            <NotebookPen className='w-4 h-4 dark:text-black' />
                          </a>
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
                            <AlertDialogTrigger className="m-0 flex flex-row bg-red-300 justify-center items-center p-1 rounded-md">
                              <Trash2 className='w-4 h-4 dark:text-black' />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>Aviso</AlertDialogTitle>
                              <AlertDialogDescription>
                                Você tem certeza que deseja DELETAR o curso: <strong>{course?.name}</strong>?
                              </AlertDialogDescription>
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
