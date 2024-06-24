import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useDataTableStudents } from './useDataTableStudents';
import PaginationSection from './../../ui/PaginationSection';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LoaderIcon, Power, Trash2, ScrollText, Save, KeyRound, Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import mask from 'make-mask';
import { cn } from '../../../lib/utils';
import { BookCheck, LockKeyhole } from 'lucide-react';
import { Text } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

function DataTableStudents() {

  const { isLoading, studentsPages, students, diaglogOpen, setDialogOpen, register, handleSubmit, errors, UpdatePassword, setValueOnDialogOpen, loading, deleteStudent, desactiveStudent, recordsDiaglogOpen, setRecordsDialogOpen, searchParams, setSearchParams, setValue } = useDataTableStudents();

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Curso(s)</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Mensalidade (total)</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && studentsPages?.map((student) => (
                <TableRow key={student?.email}>
                  <TableCell>{student?.id}</TableCell>
                  <TableCell className="font-medium">{student?.name}</TableCell>
                  <TableCell>{student?.email}</TableCell>
                  <TableCell className="flex flex-row gap-1">
                    {
                      student?.registrations?.map((registration) => registration).length == 0 ? 'S/C' : student?.registrations?.map((registration) => {
                        return (
                          <a href={`/admin/registrations?id=${registration.id}`} key={registration?.id} className={cn('hover:!bg-zinc-600 flex gap-1 flex-row items-center justify-center bg-zinc-100 dark:bg-zinc-700 p-1 rounded-md', registration?.locked == 1 ? "text-red-400" : "text-green-400")}>
                            {registration?.locked == 1 ? <LockKeyhole className='w-4 h-4' /> : <BookCheck className='w-4 h-4' />}
                            <span >{registration?.courses.name}</span>
                          </a>
                        )
                      })
                    }
                  </TableCell>
                  <TableCell>{mask(student?.cpf, '000.000.000-00', { reverse: true })}</TableCell>
                  <TableCell>
                    R$ {
                      student?.registrations?.reduce((acc, item) => {
                        if (!item.completed && !item.locked) {
                          acc += item?.monthly_fee_amount;
                        }
                        return acc;
                      }, 0)
                    }
                  </TableCell>
                  <TableCell className="space-x-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="link" className="py-0 px-0 m-0">
                            <a href={`/admin/students?tab=update&email=${student?.email}`} className='flex flex-row bg-green-400 justify-center items-center p-1 rounded-md'>
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
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button onClick={() => setValue("email", student.email)} className='bg-orange-300 p-1 m-0 rounded-md'>
                                  <KeyRound className="w-4 h-4 dark:text-black" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent >
                                <form onSubmit={handleSubmit(UpdatePassword)} className='flex flex-col gap-6'>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Editar senha</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Digite a nova senha para o usuário: <span className='font-bold'>{student?.name}</span>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
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
                                    <AlertDialogFooter className="col-span-2">
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction type="submit">
                                        {loading ? <LoaderIcon className='animate-spin w-4 h-4 dark:text-black mr-2' /> : <Save className='w-4 h-4 dark:text-black mr-2' />}
                                        Salvar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </div>
                                </form>
                              </AlertDialogContent>
                            </AlertDialog>
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
                          <span className='pt-3'>
                            <Dialog >
                              <DialogTrigger asChild >
                                <button className='bg-slate-400 p-1 m-0 rounded-md'>
                                  <Text className="w-4 h-4 dark:text-black" />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[calc(100vw-300px)] flex flex-col h-[calc(100vh-150px)]">
                                <DialogTitle>Registros do aluno</DialogTitle>
                                <DialogHeader className="mb-10">
                                  <DialogDescription>
                                    Aqui você tem um histórico de registros do aluno: <span className='font-bold'>{student?.name}</span>
                                  </DialogDescription>
                                </DialogHeader>
                                {student?.records_of_students?.length == 0 && <div className='h-auto'>
                                  <Label>Nenhum registro encontrado</Label>
                                </div>
                                }
                                {student?.records_of_students?.map((record) => {
                                  return (
                                    <div className='grid grid-cols-8 gap-3'>
                                      <div className='col-span-2 gap-1 grid h-auto'>
                                        <Label htmlFor="title">Título</Label>
                                        <Textarea type="title" readOnly value={record.title} />
                                      </div>
                                      <div className='col-span-2 gap-1 grid'>
                                        <Label htmlFor="date">Data</Label>
                                        <Textarea type="date" readOnly value={format(record.date, "dd/MM/yyyy - hh:mm")} />
                                      </div>
                                      <div className='col-span-4 gap-1 grid'>
                                        <Label htmlFor="description">Descrição</Label>
                                        <Textarea type="description" readOnly value={record.description} />
                                      </div>
                                    </div>
                                  )
                                })}
                              </DialogContent>
                            </Dialog>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          Ver registros
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
                                  <DropdownMenuItem onSelect={() => window.location.assign(`/admin/registrations?tab=create&id=${student?.id}`)}>
                                    Matricular aluno
                                    <DropdownMenuShortcut><ScrollText className='w-4 h-4 dark:text-white' /></DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={async () => await desactiveStudent(student?.id)}>
                                    Desativar aluno
                                    <DropdownMenuShortcut><Power className='w-4 h-4 dark:text-white' /></DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={async () => await deleteStudent(student?.id, student?.adresses_id)}>
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
              <TableCell className="text-right" colSpan={6}>Total de alunos:</TableCell>
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