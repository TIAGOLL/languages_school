import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { CircleDollarSignIcon, LockKeyholeIcon, Trash2 } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import PaginationSection from './../../ui/PaginationSection';
import { useDataTableRegistrations } from './useDataTableRegistrations';
import { Select } from '@radix-ui/react-select';
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { DialogClose } from '../../ui/dialog';


function DataTableRegistrations() {
  const { registrationsPagination, isLoading, registrations, deleteRegistration, handleLockRegistration, handleClassroom, handleValuePaid, dialogLockedOpen, setDialogLockedOpen, dialogDeleteOpen, setDialogDeleteOpen, classrooms, setCurrentClassroom, currentClassroom } = useDataTableRegistrations();

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
                  <TableCell className="font-medium">R$ {regis.monthly_fee_amount}</TableCell>
                  <TableCell className="font-medium">{new Date(regis.start_date).toLocaleDateString('pt-br')}</TableCell>
                  <TableCell className="font-medium">{new Date(regis.end_date).toLocaleDateString('pt-br')}</TableCell>
                  <TableCell className="font-medium">{regis.locked == 1 ? <span className='mx-1 bg-red-300 text-black p-0.5 rounded-md'>Trancada</span> : <span className='mx-1 p-0.5 rounded-md'>Ativa</span>}</TableCell>
                  <TableCell className="space-x-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild >
                          <button variant="link" className="bg-green-300 p-1 rounded-md">
                            <Dialog>
                              <DialogTrigger asChild>
                                <SiGoogleclassroom className='w-4 h-4 dark:text-black' />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="!justify-center flex w-full">Mudar sala</DialogTitle>
                                </DialogHeader>
                                <DialogDescription className="flex text-white text-md p-3">
                                  Mudando a sala do estudante {regis.students.name} no curso de {regis.courses.name}?
                                </DialogDescription>
                                <Select className="mb-10" onValueChange={(value) => setCurrentClassroom(value)} value={currentClassroom}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {
                                        classrooms?.map((classroom) => {
                                          if (classroom.books.courses.id == regis.courses.id) return <SelectItem key={classroom.id} value={classroom.id.toString()}>{classroom?.date} às {classroom?.hour}</SelectItem>
                                        })
                                      }
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <DialogFooter className="w-full flex !justify-between !items-start mt-10">
                                  <DialogClose>
                                    <Button variant="ghost" onClick={() => {
                                      setCurrentClassroom("")
                                    }}>
                                      Cancelar
                                    </Button>
                                  </DialogClose>
                                  <DialogClose>
                                    <Button variant="default" onClick={async () => {
                                      await handleClassroom(currentClassroom, regis?.id)
                                      setCurrentClassroom("")
                                    }}>
                                      Mudar sala
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Alterar sala
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <button variant="link" className="bg-yellow-200 p-1 rounded-md" onClick={async () => await handleValuePaid(regis.id)}>
                            <CircleDollarSignIcon className='w-4 h-4 dark:text-black' />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Mudar valor da mensalidade
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
                                  {/* Trancar/Destrancar matricula */}
                                  <Dialog open={dialogLockedOpen} onOpenChange={setDialogLockedOpen}>
                                    <DialogTrigger asChild>
                                      <button className='flex flex-row justify-between w-full p-2 text-sm rounded-md hover:bg-accent cursor-default'>
                                        {regis.locked == 0 ? "Trancar matricula" : "Destrancar matricula"}
                                        <LockKeyholeIcon className='w-4 h-4 text-muted-foreground' />
                                      </button>
                                    </DialogTrigger>
                                    <DialogContent >
                                      <DialogHeader>
                                        <DialogTitle className="!justify-center flex w-full">Aviso</DialogTitle>
                                      </DialogHeader>
                                      <DialogDescription className="flex text-white text-md p-3 mb-8">
                                        Você tem certeza que deseja {regis.locked == 0 ? "TRANCAR" : "DESTRANCAR"} a matricula do aluno: {regis.students.name}?
                                      </DialogDescription>
                                      <DialogFooter className="w-full flex !justify-between !items-start">
                                        <Button variant="default" onClick={() => {
                                          setDialogLockedOpen(false)
                                        }}>
                                          Cancelar
                                        </Button>
                                        <Button variant="destructive" onClick={async () => await handleLockRegistration(regis.id)}>
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
                                      <DialogHeader>
                                        <DialogTitle className="!justify-center flex w-full">Aviso</DialogTitle>
                                      </DialogHeader>
                                      <DialogDescription className="flex text-white text-md p-3 mb-8">
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
              <TableCell className="text-right" colSpan={8}>Total de matrículas:</TableCell>
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

export default DataTableRegistrations;