import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2 } from 'lucide-react';
import { useDataTableClassrooms } from './useDataTableClassrooms';
import PaginationSection from '../../../ui/PaginationSection';


export function DataTableClassrooms() {
  const { isLoading, classrooms, classroomPages, deleteClassroom } = useDataTableClassrooms();

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Livro</TableHead>
              <TableHead>Dia</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && classroomPages?.map((classroom) => (
                <TableRow key={classroom?.id}>
                  <TableCell>{classroom?.books?.courses?.name}</TableCell>
                  <TableCell>{classroom?.books?.name}</TableCell>
                  <TableCell>{classroom?.date}</TableCell>
                  <TableCell>{classroom?.hour}</TableCell>
                  <TableCell className="space-x-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="link" className="py-0 px-0 m-0">
                            <a href={`/admin/classrooms?tab=update&id=${classroom.id}`} className='flex flex-row bg-green-400 justify-center items-center p-1 rounded-md'>
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
                          <Button variant="link" className="p-0 m-0" onClick={() => deleteClassroom(classroom.id)}>
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
              isLoading &&
              (
                <TableRow>
                  <TableCell className="font-medium">
                    <Skeleton className="h-6 w-4/12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-4/12" />
                  </TableCell>
                  <TableCell>
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
              <TableCell className="text-right" colSpan={4}>Total de salas:</TableCell>
              <TableCell className="text-left">{classrooms?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div >
      <div className="border p-2 border-t-0 rounded-b-lg">
        <PaginationSection
          data={classrooms}
        />
      </div>
    </>
  );
}