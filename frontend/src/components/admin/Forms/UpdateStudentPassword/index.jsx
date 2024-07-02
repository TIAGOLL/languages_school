import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { KeyRound, LoaderIcon, Save } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUpdateStudentPasswordForm } from "./useUpdateStudentPasswordForm";


export function UpdateStudentPasswordForm({ data }) {

  const { handleSubmit, updatePassword, register, setValue, errors, loading, dialogOpen, setDialogOpen } = useUpdateStudentPasswordForm()

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className='pt-3'>
            <AlertDialog open={dialogOpen}>
              <AlertDialogTrigger onClick={() => {
                setValue("email", data.email)
                setDialogOpen(true)
              }} className='bg-orange-300 p-1 m-0 rounded-md'>
                <KeyRound className="w-4 h-4 dark:text-black" />
              </AlertDialogTrigger>
              <AlertDialogContent >
                <form onSubmit={handleSubmit(updatePassword)} className='flex flex-col gap-6'>
                  <AlertDialogTitle>Editar senha</AlertDialogTitle>
                  <AlertDialogDescription>
                    Digite a nova senha para o usuário: <span className='font-bold'>{data?.name}</span>
                  </AlertDialogDescription>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='col-span-2 gap-1 grid w-8/12'>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" {...register("email")} disabled />
                    </div>
                    <div className='col-span-2 gap-1 grid w-8/12'>
                      <Label htmlFor="password">Senha</Label>
                      <Input type="password" {...register("password")} />
                      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <AlertDialogFooter className="col-span-2">
                      <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancelar</AlertDialogCancel>
                      <AlertDialogAction type="submit" >
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
  );
}