import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from './../../ui/PaginationSection';
import { useDataTableCourses } from './useDataTableCourses';


function DataTableCourses() {
  const { isLoading, courses } = useDataTableCourses();

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && courses?.map((course) => (
                <TableRow key={course.name}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.price}</TableCell>
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
              <TableCell className="text-right" colSpan={1}>Total de cursos:</TableCell>
              <TableCell className="text-left">{courses?.length}</TableCell>
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