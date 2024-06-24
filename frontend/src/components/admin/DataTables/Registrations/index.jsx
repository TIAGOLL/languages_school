import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { LockKeyholeIcon, Trash2 } from 'lucide-react';
import { useDataTableRegistrations } from './useDataTableRegistrations';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import PaginationSection from '../../../ui/PaginationSection';
import { UpdateClassroomForm } from '../../Forms/UpdateClassroom';


export function DataTableRegistrations() {
  const { registrationsPagination, isLoading, registrations, deleteRegistration, handleLockRegistration, handleClassroom, dialogLockedOpen, setDialogLockedOpen, dialogDeleteOpen, setDialogDeleteOpen, classrooms, setCurrentClassroom, currentClassroom } = useDataTableRegistrations();

  const [descRecord, setDescRecord] = useState("")

  return (
    <>
      <div className='border rounded-lg rounded-b-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Livro</TableHead>
              <TableHead>Valor da mensalidade</TableHead>
              <TableHead>Data de início</TableHead>
              <TableHead>Vencimento da matricula</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isLoading && registrationsPagination?.map((regis) => (
                <TableRow key={regis.id}>
                  <TableCell className="font-medium">{regis.id}</TableCell>
                  <TableCell className="font-medium">{regis.students.name}</TableCell>
                  <TableCell className="font-medium">{regis.courses.name}</TableCell>
                  <TableCell className="font-medium">
                    {
                      regis?.students_has_classrooms?.classrooms ? <span className='bg-green-200 text-black rounded-md p-1 font-semibold'>{regis?.students_has_classrooms?.classrooms?.date} às {regis?.students_has_classrooms?.classrooms?.hour}</span>
                        :
                        <span className='bg-red-200 text-black rounded-md p-1 font-semibold'>Não possui turma!</span>
                    }
                  </TableCell>
                  <TableCell className="font-medium">
                    {regis.students_has_classrooms?.classrooms.books.name}
                    {!regis.students_has_classrooms?.classrooms.books.name && <p>S/L</p>}
                  </TableCell>
                  <TableCell className="font-medium">R$ {regis.monthly_fee_amount}</TableCell>
                  <TableCell className="font-medium">{new Date(regis.start_date).toLocaleDateString('pt-br')}</TableCell>
                  <TableCell className="font-medium">{new Date(regis.end_date).toLocaleDateString('pt-br')}</TableCell>
                  <TableCell className="font-medium">{regis.locked == 1 ? <span className='mx-1 bg-red-300 text-black p-0.5 rounded-md'>Trancada</span> : <span className='mx-1 p-0.5 rounded-md'>Ativa</span>}</TableCell>
                  <TableCell className="space-x-2">
                    <TooltipProvider>
                      {regis.locked == 0 && <UpdateClassroomForm data={{ regis, classrooms }} />}
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
                                  {/* Trancar/Destrancar matricula */}
                                  <Dialog open={dialogLockedOpen} onOpenChange={setDialogLockedOpen}>
                                    <DialogTrigger asChild>
                                      <button className='flex flex-row justify-between w-full p-2 text-sm rounded-md hover:bg-accent cursor-default'>
                                        {regis.locked == 0 ? "Trancar matricula" : "Destrancar matricula"}
                                        <LockKeyholeIcon className='w-4 h-4 text-muted-foreground' />
                                      </button>
                                    </DialogTrigger>
                                    <DialogContent >
                                      <DialogTitle className="!justify-center flex w-full">Aviso</DialogTitle>
                                      <DialogDescription className="flex text-black text-md p-3 mb-8 flex-col gap-6 dark:text-white">
                                        Você tem certeza que deseja {regis.locked == 0 ? "TRANCAR" : "DESTRANCAR"} a matricula do aluno: {regis.students.name}?
                                        <form>
                                          <Label>Description</Label>
                                          <Textarea onChange={({ target }) => setDescRecord(target.value)} value={descRecord} />
                                        </form>
                                      </DialogDescription>
                                      <DialogFooter className="w-full flex !justify-between !items-start">
                                        <Button variant="default" onClick={() => {
                                          setDialogLockedOpen(false)
                                        }}>
                                          Cancelar
                                        </Button>
                                        <Button variant="destructive" onClick={async () => {
                                          await handleLockRegistration(regis.id, regis.students_id, descRecord)
                                        }}>
                                          {regis.locked == 0 ? "Trancar matricula" : "Destrancar matricula"}
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                  {/* Excluir matricula */}
                                  <Dialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
                                    <DialogTrigger asChild>
                                      <button className='flex flex-row justify-between w-full p-2 text-sm rounded-md hover:bg-accent cursor-default'>
                                        Deletar matricula
                                        <Trash2 className='w-4 h-4 text-muted-foreground' />
                                      </button>
                                    </DialogTrigger>
                                    <DialogContent >
                                      <DialogTitle className="!justify-center flex w-full">Aviso</DialogTitle>
                                      <DialogDescription className="flex text-black text-md p-3 mb-8 dark:text-white">
                                        Você tem certeza que deseja DELETAR a matricula do aluno: {regis.students.name}?
                                      </DialogDescription>
                                      <DialogFooter className="w-full flex !justify-between !items-start">
                                        <Button variant="default" onClick={() => {
                                          setDialogDeleteOpen(false)
                                        }}>
                                          Cancelar
                                        </Button>
                                        <Button variant="destructive" onClick={async () => await deleteRegistration(regis.id)}>
                                          Deletar matricula
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
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
              isLoading &&
              (
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
              <TableCell className="text-right" colSpan={9}>Total de matrículas:</TableCell>
              <TableCell className="text-left">{registrations?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div >
      <div className="border p-2 border-t-0 rounded-b-lg">
        <PaginationSection
          data={registrations}
        />
      </div>
    </>
  );
}
