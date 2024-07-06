import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateProfessionalPhoto } from "./useUpdateProfessionalPhoto";
import { Button } from '@/components/ui/button';


export function UpdateProfessionalPhotoForm() {

  const { user, diaglogOpen, setDialogOpen, professionalPhotoUrl, handleProfessionalPhoto, updateProfessionalPhoto } = useUpdateProfessionalPhoto();

  return (
    <Dialog open={diaglogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="gap-2 flex flex-col" onClick={() => setDialogOpen(true)}>
        <Avatar>
          <AvatarImage src={professionalPhotoUrl} alt="Avatar" />
          <AvatarFallback><img src="/images/empty.png" /></AvatarFallback>
        </Avatar>
        <DialogTitle>{user.name}</DialogTitle>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
        <div className="grid grid-cols-3 items-center gap-4 py-4">
          <Label htmlFor="photo">Escolha sua foto</Label>
          <Input accept="image/*" id="photo" type="file" className="col-span-2" onChange={e => handleProfessionalPhoto(e)} />
        </div>
        <DialogFooter>
          <Button onClick={() => updateProfessionalPhoto()}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}