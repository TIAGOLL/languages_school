import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from './../../ui/PaginationSection';
import { useDataTableClassrooms } from './useDataTableClassrooms';


function DataTableClassrooms() {
  const { isLoading, classrooms } = useDataTableClassrooms();

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dia</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Livro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && classrooms?.map((classrooms) => (
                <TableRow key={classrooms?.id}>
                  <TableCell className="font-medium">{classrooms?.date}</TableCell>
                  <TableCell>{classrooms?.hour}</TableCell>
                  <TableCell className="space-x-2">{classrooms?.courses.name}</TableCell>
                  <TableCell className="space-x-2">{classrooms?.books.name}</TableCell>
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
                  <TableCell>
                    <Skeleton className="h-6 w-4/12" />
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-right" colSpan={3}>Total de alunos:</TableCell>
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

export default DataTableClassrooms;