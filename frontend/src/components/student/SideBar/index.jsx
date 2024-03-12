import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Menu, Power } from "lucide-react"
import { AuthContext } from '../../../contexts/auth';
import { useContext } from 'react';
import { useSideBar } from './useSideBar';
import { ThemeSwitcher } from './../../ui/ThemeSwitcher';
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';



function SideBar() {

  const { logout } = useContext(AuthContext);
  const { diaglogOpen, setDialogOpen, studentPhotoUrl, user, handleStudentPhoto, saveStudentPhoto } = useSideBar();

  return (
    <Sheet>
      <SheetTrigger asChild className="w-30 m-4">
        <Button variant="outline" className="gap-2"><Menu width={20} />Menu</Button>
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
                  <AvatarImage src={studentPhotoUrl} alt="Avatar" />
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
                    <AvatarImage src={studentPhotoUrl} alt="Avatar" />
                    <AvatarFallback><img src="/images/empty.png" /></AvatarFallback>
                  </Avatar>
                </div>
              </DialogHeader>
              <div className="grid grid-cols-3 items-center gap-4 py-4">
                <Label htmlFor="photo">Escolha sua foto</Label>
                <Input accept="image/*" id="photo" type="file" className="col-span-2" onChange={e => handleStudentPhoto(e)} />
              </div>
              <DialogFooter>
                <Button onClick={() => saveStudentPhoto()}>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <SheetClose asChild >
            <a className='w-full flex' href="/book"><Button className="w-full" variant="outline">Book</Button></a>
          </SheetClose>
          <SheetClose asChild >
            <a className='w-full flex' href="/classes"><Button className="w-full" variant="outline">Aulas</Button></a>
          </SheetClose>
          <SheetClose asChild >
            <a className='w-full flex' href="/tasks"><Button className="w-full" variant="outline">Minhas atividades</Button></a>
          </SheetClose>
          <SheetClose asChild >
            <a className='w-full flex' href="/myclass"><Button className="w-full" variant="outline">Ver minha turma</Button></a>
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

export default SideBar;