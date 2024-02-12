import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Menu, Power } from "lucide-react";
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/auth';
import api from '../../../services/api';


function AdmSideBar() {

  function handleProfessionalPhoto(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const id = JSON.parse(localStorage.getItem("@ticketsPRO")).id;
      if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/webp') {
        api.professionals.uploadPhoto(id, image)
      } else {
        toast.error("Envie uma imagem do tipo PNG, JPEG ou WEBP", { icon: "📌" });
        return;
      }
    }
  }

  const { logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("@ticketsPRO"));

  return (
    <Sheet>
      <SheetTrigger asChild className="w-30 m-4 mt-5">
        <Button variant="outline" className="gap-2"><Menu width={20} />Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="flex flex-col w-full justify-center items-center !text-center">
          <Dialog>
            <DialogTrigger asChild>
              <button>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt="Avatar" />
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
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input accept="image/*" type="file" onChange={e => handleProfessionalPhoto(e)} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <SheetClose asChild >
            <a className='w-full flex' href="/admin/dashboard"><Button className="w-full" variant="outline">Dashboard</Button></a>
          </SheetClose>
          <SheetClose asChild >
            <a className='w-full flex' href="/admin/students"><Button className="w-full" variant="outline">Estudantes</Button></a>
          </SheetClose>
          <SheetClose asChild >
            <a className='w-full flex' href="/admin/classes"><Button className="w-full" variant="outline">Aulas</Button></a>
          </SheetClose>
          <SheetClose asChild >
            <a className='w-full flex' href="/admin/professionals"><Button className="w-full" variant="outline">Funcionários</Button></a>
          </SheetClose>
        </div>
        <SheetFooter className="absolute bottom-2">
          <SheetClose asChild >
            <Button variant="link" className="gap-2" onClick={() => logout()}><Power width={20} />Desconectar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default AdmSideBar;