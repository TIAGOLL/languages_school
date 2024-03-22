import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Menu, Power, Circle } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import { Label } from '@/components/ui/label';
import { useAdmSideBar } from "./useAdmSideBar";
import { ThemeSwitcher } from "../../ui/ThemeSwitcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Settings } from "lucide-react";


function AdmSideBar() {

  const { logout } = useContext(AuthContext);
  const { diaglogOpen, changePassword, setDialogOpen, professionalPhotoUrl, user, handleProfessionalPhoto, saveProfessionalPhoto, sheetOpen, setSheetOpen } = useAdmSideBar();

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="w-30 m-4 mt-5">
        <Button variant="outline" className="gap-2">
          <Menu width={20} />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="flex flex-col w-full justify-center items-center !text-center">
          <div className="absolute left-6 top-10">
            <ThemeSwitcher />
          </div>
          <Dialog open={diaglogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button onClick={() => setDialogOpen(true)}>
                <Avatar>
                  <AvatarImage src={professionalPhotoUrl} alt="Avatar" />
                  <AvatarFallback><img src="/images/empty.png" /></AvatarFallback>
                </Avatar>
                <SheetTitle>{user.name}</SheetTitle>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>
                  Escolha sua foto para o quadro de funcionários
                </DialogDescription>
                <div className="flex w-full justify-center">
                  <Avatar className="w-48 h-48 grid-rows-2">
                    <AvatarImage src={professionalPhotoUrl} alt="Avatar" />
                    <AvatarFallback><img src="/images/empty.png" /></AvatarFallback>
                  </Avatar>
                </div>
              </DialogHeader>
              <div className="grid grid-cols-3 items-center gap-4 py-4">
                <Label htmlFor="photo">Escolha sua foto</Label>
                <Input accept="image/*" id="photo" type="file" className="col-span-2" onChange={e => handleProfessionalPhoto(e)} />
              </div>
              <DialogFooter className="!justify-between flex w-full">
                <Dialog >
                  <DialogTrigger asChild>
                    <Button variant="ghost">Trocar senha</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Trocar senha</DialogTitle>
                      <DialogDescription>
                        Mantenha se protegido, Troque sua senha regularmente
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 items-center gap-4 py-4">
                      <Label htmlFor="password">Nova senha</Label>
                      <Input id="password" type="password" className="col-span-2" />
                    </div>
                    <DialogFooter >
                      <Button onClick={() => changePassword()}>Salvar alterações</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => saveProfessionalPhoto()}>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {/* Dashboard */}
          <Accordion type="single" collapsible className="w-full border-2 border-[hsl(var(--input))] p-1 rounded-md">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="p-2">
                Dashboard
              </AccordionTrigger>
              <AccordionContent className="border-0 mt-2 space-y-1">
                <a href="/admin/dashboard?tab=home" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Home
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Alunos */}
          <Accordion type="single" collapsible className="w-full border-2 border-[hsl(var(--input))] p-1 rounded-md">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="p-2">
                Alunos
              </AccordionTrigger>
              <AccordionContent className="border-0 mt-2 space-y-1">
                <a href="/admin/students?tab=all" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Ver alunos
                </a>
                <a href="/admin/students?tab=create" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Cadastrar aluno
                </a>
                <a href="/admin/classes?tab=all" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Ver aulas
                </a>
                <a href="/admin/classes?tab=create" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Cadastrar aula
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Cursos */}
          <Accordion type="single" collapsible className="w-full border-2 border-[hsl(var(--input))] p-1 rounded-md">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="p-2">
                Cursos
              </AccordionTrigger>
              <AccordionContent className="border-0 mt-2 space-y-1">
                <a href="/admin/courses?tab=all" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Ver todos
                </a>
                <a href="/admin/courses?tab=create" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Cadastrar curso
                </a>
                <a href="/admin/courses?tab=matriculate" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Matricular aluno
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Turmas */}
          <Accordion type="single" collapsible className="w-full border-2 border-[hsl(var(--input))] p-1 rounded-md">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="p-2">
                Turmas
              </AccordionTrigger>
              <AccordionContent className="border-0 mt-2 space-y-1">
                <a href="/admin/classrooms?tab=all" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Ver todas
                </a>
                <a href="/admin/classrooms?tab=create" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Cadastrar turma
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Professionals */}
          <Accordion type="single" collapsible className="w-full border-2 border-[hsl(var(--input))] p-1 rounded-md">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="p-2">
                Funcionários
              </AccordionTrigger>
              <AccordionContent className="border-0 mt-2 space-y-1">
                <a href="/admin/professionals?tab=all" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Ver todos
                </a>
                <a href="/admin/professionals?tab=create" className="hover:underline flex flex-row gap-2 items-center ml-5">
                  <Circle className="w-2 h-2" />
                  Cadastrar funcinário
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <SheetFooter className="absolute bottom-2 w-10/12">
          <div className="w-full !justify-between flex">
            <SheetClose asChild >
              <Button variant="link" className="gap-2" onClick={() => logout()}><Power width={20} />Desconectar</Button>
            </SheetClose>
            <SheetClose asChild >
              <a href="/admin/preferences">
                <Button variant="ghost" className="gap-2" >
                  <Settings width={20} />
                </Button>
              </a>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet >
  );
}

export default AdmSideBar;