import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useDataTableStudents } from './useDataTableStudents';
import PaginationSection from './../../ui/PaginationSection';
import { KeyRound } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { LoaderIcon } from 'lucide-react';

function DataTableStudents() {

  const { isLoading, currentPosts, students, diaglogOpen, setDialogOpen, register, handleSubmit, errors, UpdatePassword, setValueOnDialogOpen, loading } = useDataTableStudents();

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Ações</TableHead>
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
                    <Button variant="link" className="py-0 px-2 m-0">
                      <a href={`/admin/students?tab=update&email=${student.email}`} className='flex flex-row bg-green-700 justify-center items-center p-1 rounded-md'>
                        <Pencil className='w-4 h-4' />
                      </a>
                    </Button>
                    <Dialog open={diaglogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <button onClick={() => setValueOnDialogOpen(student)} className='bg-orange-400 p-1 rounded-md'>
                          <KeyRound className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent >
                        <form onSubmit={handleSubmit(UpdatePassword)} className='flex flex-col gap-6'>
                          <DialogHeader>
                            <DialogTitle>Editar senha</DialogTitle>
                            <DialogDescription>
                              Digite a nova senha para o usuário: <span className='font-bold'>{student.name}</span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid grid-cols-2 gap-3'>
                            <div className='col-span-2 gap-1 grid w-8/12'>
                              <Label htmlFor="email">Email</Label>
                              <Input type="email" {...register("email")} readOnly />
                            </div>
                            <div className='col-span-2 gap-1 grid w-8/12'>
                              <Label htmlFor="password">Senha</Label>
                              <Input type="password" {...register("password")} />
                              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            </div>
                            <DialogFooter className="w-full flex !justify-start !items-start">
                              <Button type="submit">
                                {loading ? <LoaderIcon className='animate-spin w-4 h-4 mr-2' /> : <Save className='w-4 h-4 mr-2' />}
                                Salvar
                              </Button>
                            </DialogFooter>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
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
      </div >
      <div className="border p-2 border-t-0 rounded-b-lg">
        <PaginationSection
          data={students}
        />
      </div>
    </>
  );
}

export default DataTableStudents;