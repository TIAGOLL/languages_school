import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';
import { useFormUpdateBooks } from './useFormUpdateBooks';
import { UpdateBookForm } from '../../Forms/UpdateBook';
import { Lessons } from '../Lessons';
import { CreateBookForm } from '../../Forms/CreateBook';

export function Books() {

  const { errors, register, deleteBook, books, id } = useFormUpdateBooks()

  return (
    <div className='flex flex-col mb-10'>
      <h1 className='text-xl mb-10 font-bold flex w-full justify-center items-center'>Livros do {books?.courses?.name}</h1>
      <div className='flex items-center space-y-6 flex-col justify-center gap-2'>
        {
          books?.map((book, index) => (
            <div key={book.id} className='grid grid-cols-12 gap-4 justify-center items-center w-[800px]'>
              <div className='col-span-1 flex flex-col space-y-1'>
                <Label htmlFor={`books.${index}.id`}>ID</Label>
                <Input type="text" id={`books.${index}.id`} {...register(`books.${index}.id`)} value={book?.id} readOnly />
                {errors?.books?.[index]?.id && <span className='text-sm text-red-500'>{errors?.books?.[index]?.id?.message}</span>}
              </div>
              <div className='col-span-5 flex flex-col space-y-1'>
                <Label htmlFor={`books.${index}.name`}>Nome</Label>
                <Input type="text" id={`books.${index}.name`} {...register(`books.${index}.name`)} value={book?.name} />
                {errors?.books?.[index]?.name && <span className='text-sm text-red-500'>{errors?.books?.[index]?.name?.message}</span>}
              </div>
              <div className='col-span-5 flex flex-col space-y-1'>
                <Label htmlFor={`books.${index}.position`}>Posição</Label>
                <Input type="text" id={`books.${index}.position`} {...register(`books.${index}.position`)} value={book?.position} />
                {errors?.books?.[index]?.position && <span className='text-sm text-red-500'>{errors?.books?.[index]?.position?.message}</span>}
              </div>
              <div className='flex flex-row gap-2'>
                <UpdateBookForm data={book} />
                <Lessons book={book} />
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-red-400 text-black col-span-1 justify-center flex items-center p-2 rounded-md">
                          <Trash2 className='w-4 h-4' />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Aviso</AlertDialogTitle>
                          <AlertDialogDescription>
                            Você tem certeza que deseja DELETAR o livro: {book?.name}?
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={async () => await deleteBook(book.id)}>
                              <Trash2 className='w-4 h-4 mr-2' />
                              Deletar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      Excluir
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))
        }
        {errors?.books && <span className='text-sm text-red-500'>{errors?.books?.root?.message}</span>}

        <CreateBookForm course={id} />
      </div>
    </div >
  );
}
