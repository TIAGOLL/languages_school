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
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";


function AdmSideBar() {

  const { logout } = useContext(AuthContext);
  const { diaglogOpen, setDialogOpen, professionalPhotoUrl, user, handleProfessionalPhoto, saveProfessionalPhoto, sheetOpen, setSheetOpen, getLinks } = useAdmSideBar();

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
              <DialogFooter>
                <Button onClick={() => saveProfessionalPhoto()}>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full space-y-2 gap-4 mt-10">
          {getLinks().map((item, index) => {
            return (
              <AccordionItem value={`item-${index}`} className="border-2 border-[hsl(var(--input))] p-1 rounded-md" key={item.title}>
                <AccordionTrigger className="p-2">
                  {item.title}
                </AccordionTrigger >
                <AccordionContent className="border-0 m-0 py-0.5 space-y-1">
                  {item.links.map((link) => {
                    return <>
                      <NavLink to={link.to} className={({ isActive }) => isActive ? "hover:underline flex flex-row gap-2 items-center ml-5" : "hidden"} onClick={() => setSheetOpen(false)}>
                        <FaCircle className="w-2 h-2" />
                        {link.name}
                      </NavLink>
                      <NavLink to={link.to} className={({ isActive }) => isActive ? "hidden" : "hover:underline flex flex-row gap-2 items-center ml-5"} onClick={() => setSheetOpen(false)}>
                        <Circle className="w-2 h-2" />
                        {link.name}
                      </NavLink>
                    </>
                  })}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
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