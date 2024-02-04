import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { useEffect } from 'react';
import api from '../../../services/api';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

function DataTableStudents() {

  const [searchParams, setSearchParams] = useSearchParams()

  async function loadData() {

  }

  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const book = searchParams.get('book')

  const { data: students, isLoading } = useQuery({
    queryKey: ['students', name, email, book],
    queryFn: () => api.students.GetActiveStudents(name, email, book),
  })

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Book</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            !isLoading && students?.map((student) => (
              <TableRow key={student.name}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.books.name}</TableCell>
                <TableCell>
                  <Button variant="link">
                    <Pencil className='w-4 h-4 mr-2' />
                    Editar
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
  );
}

export default DataTableStudents;