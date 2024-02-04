import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Menu, Power } from "lucide-react"
import { AuthContext } from '../../../contexts/auth';
import { useContext } from 'react';



function AdmSideBar() {

  const { logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("@ticketsPRO"));

  return (
    <Sheet>
      <SheetTrigger asChild className="w-30 m-4 mt-5">
        <Button variant="outline" className="gap-2"><Menu width={20} />Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="flex flex-col w-full justify-center items-center !text-center">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt="Avatar" />
            <AvatarFallback><img src="/images/empty.png" /></AvatarFallback>
          </Avatar>
          <SheetTitle>{user.name}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
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