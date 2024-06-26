import { Input } from '@/components/ui/input';
import { useUpdateTimeRegistrations } from './useUpdateTimeRegistrations';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';


export function UpdateTimeRegistrations() {

  const { register, handleSubmit, errors, UpdateTimeRegistrations } = useUpdateTimeRegistrations();

  return (
    <form onSubmit={handleSubmit(UpdateTimeRegistrations)} className='flex-col w-full'>
      <h1 className='text-lg font-semibold text-foreground'>Tempo de matrícula</h1>
      <p className='text-sm text-muted-foreground mb-4'>Aqui você pode mudar o tempo em que as matrículas precisarão ser renovadas</p>
      <div className='flex-wrap w-full flex gap-2'>
        <Input type="text" {...register("time", { valueAsNumber: true })} className="max-w-48" />
      </div>
      {errors.time && <p className='text-sm text-red-500'>{errors.time.message}</p>}
      <Separator className="my-4 w-full" />
      <div className='flex flex-col-reverse justify-between sm:flex-row sm:space-x-2'>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="flex flex-row justify-center items-center">
              <Button variant="link" className="px-2">
                <Info />
              </Button>
              <p className='text-muted-foreground'>Info</p>
            </TooltipTrigger>
            <TooltipContent className="max-w-72">
              <p className='text-sm text-muted-foreground mb-4'>Essa configuração está diretamente ligada a criação de matrículas, após você matrícular um aluno, o sistema procura essa configuração para criar as parcelas e para identificar a data de vencimento da matrícula</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
