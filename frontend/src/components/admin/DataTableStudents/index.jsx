import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useDataTableStudents } from './useDataTableStudents';
import PaginationSection from './../../ui/PaginationSection';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LoaderIcon, Power, Trash2, ScrollText, Save, KeyRound, Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

function DataTableStudents() {

  const { isLoading, currentPosts, students, diaglogOpen, setDialogOpen, register, handleSubmit, errors, UpdatePassword, setValueOnDialogOpen, loading, deleteStudent, desactiveStudent } = useDataTableStudents();
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
                  <TableCell>{student.registration?.books?.name}</TableCell>
                  <TableCell className="space-x-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="link" className="py-0 px-0 m-0">
                            <a href={`/admin/students?tab=update&email=${student.email}`} className='flex flex-row bg-green-400 justify-center items-center p-1 rounded-md'>
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
                          <span className='pt-3'>
                            <Dialog open={diaglogOpen} onOpenChange={setDialogOpen}>
                              <DialogTrigger asChild>
                                <button onClick={() => setValueOnDialogOpen(student)} className='bg-orange-300 p-1 m-0 rounded-md'>
                                  <KeyRound className="w-4 h-4 dark:text-black" />
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
                                        {loading ? <LoaderIcon className='animate-spin w-4 h-4 dark:text-black mr-2' /> : <Save className='w-4 h-4 dark:text-black mr-2' />}
                                        Salvar
                                      </Button>
                                    </DialogFooter>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          Mudar senha
                        </TooltipContent>
                      </Tooltip >
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="link" className="p-0 m-0" onClick={() => desactiveStudent(student.id)}>
                            <div className='flex flex-row bg-red-300 justify-center items-center p-1 rounded-md'>
                              <Power className='w-4 h-4 dark:text-black' />
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Desativar
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <span className='pt-3'>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="link" className="p-0 m-0">
                                  <div className='flex flex-row bg-zinc-200 justify-center items-center p-1 rounded-md'>
                                    <DotsHorizontalIcon className='w-4 h-4  text-black' />
                                  </div>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Mais ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup >
                                  <DropdownMenuItem onSelect={() => window.location.assign(`/admin/courses?tab=matriculate&id=${student.id}`)}>
                                    Matricular aluno
                                    <DropdownMenuShortcut><ScrollText className='w-4 h-4 dark:text-white' /></DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={async () => await deleteStudent(student.id, student.adresses_id)}>
                                    Excluir
                                    <DropdownMenuShortcut><Trash2 className='w-4 h-4 dark:text-white' /></DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          Mais ações
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