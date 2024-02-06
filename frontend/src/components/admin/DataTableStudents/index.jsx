import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import api from '../../../services/api';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import PaginationSection from '../../general/PaginationSection';
import { useEffect } from 'react';

function DataTableStudents() {

  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page')
  const per_page = searchParams.get('per_page')
  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const book = searchParams.get('book')

  const { data: students, isLoading } = useQuery({
    queryKey: ['students', name, email, book],
    queryFn: () => api.students.GetActiveStudents(name, email, book),
  })

  const lastPostIndex = page * per_page;
  const firstPostIndex = lastPostIndex - per_page;
  const currentPosts = students?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && currentPosts?.map((student) => (
                <TableRow key={student.email}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.books.name}</TableCell>
                  <TableCell>
                    <Button variant="link">
                      <a href={`/admin/students?tab=update&email=${student.email}`} className='flex flex-row'>
                        <Pencil className='w-4 h-4 mr-2' />
                        Editar
                      </a>
                    </Button>
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
              <TableCell className="text-left">{students?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="border p-2 border-t-0 rounded-b-lg">
        <PaginationSection
          data={students}
        />
      </div>
    </>
  );
}

export default DataTableStudents;