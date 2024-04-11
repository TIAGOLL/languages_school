import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from './../../ui/PaginationSection';
import { useDataTableCourses } from './useDataTableCourses';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';


function DataTableCourses() {
  const { isLoading, courses, coursesPagination, deleteCourse } = useDataTableCourses();

  return (
    <>
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
                <TableRow key={course.name}>
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
                          <Button variant="link" className="py-0 px-0 m-0">
                            <a href={`/admin/courses?tab=update&id=${course.id}`} className='flex flex-row bg-green-400 justify-center items-center p-1 rounded-md'>
                              <Pencil className='w-4 h-4 dark:text-black' />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Editar
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="link" className="p-0 m-0" onClick={() => deleteCourse(course.id)}>
                            <div className='flex flex-row bg-red-300 justify-center items-center p-1 rounded-md'>
                              <Trash2 className='w-4 h-4 dark:text-black' />
                            </div>
                          </Button>
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
      </div>
      <div className="border p-2 border-t-0 rounded-b-lg">
        <PaginationSection
          data={courses}
        />
      </div>
    </>
  );
}

export default DataTableCourses;