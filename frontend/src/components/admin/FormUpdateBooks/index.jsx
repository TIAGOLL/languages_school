import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, PlusSquare, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogDescription, AlertDialogTitle, AlertDialogHeader, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogContent } from '@/components/ui/alert-dialog';
import { useFormUpdateBooks } from './useFormUpdateBooks';
import { LiaPencilRulerSolid } from "react-icons/lia"
import { TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { Save } from 'lucide-react';

function FormUpdateBooks() {

  const { handleSubmit, updateCourse, errors, register, createBook, deleteBook, books, dialogDeleteOpen, handleSubmitCreateBook, setDialogDeleteOpen, errorsCreateBook, registerCreateBook, course, alertCreateBookOpen, setAlertCreateBookOpen } = useFormUpdateBooks()

  return (
    <div className='mt-10 flex flex-col'>
      <h1 className='text-xl mb-10 font-bold flex w-full justify-center items-center'>{course?.name}</h1>
      <form onSubmit={handleSubmit(updateCourse)} className='flex items-center space-y-6 flex-col justify-center gap-2'>
        {
          books?.map((book, index) => (
            <div key={index} className='grid grid-cols-12 gap-4 justify-center items-center w-[800px]'>
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
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button type="button" className="bg-red-400 text-black col-span-1 justify-center flex items-center p-2 rounded-md">
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Aviso</AlertDialogTitle>
                            <AlertDialogDescription>
                              Você tem certeza que deseja DELETAR o livro: {book?.name}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
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
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <AlertDialog className="grid-rows-10 grid-cols-10 justify-center">
                        <AlertDialogTrigger>
                          <button type="button" className="bg-orange-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md">
                            <LiaPencilRulerSolid className='w-4 h-4' />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[calc(100vw-1000px)] h-[calc(100vh-100px)] max-w-none justify-center md:w-[calc(100vw-800px)]">
                          <AlertDialogHeader className="items-center row-span-1">
                            <AlertDialogTitle>Lições</AlertDialogTitle>
                            <AlertDialogDescription>
                              curso: {course?.name} | Livro: {book?.name}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <form className='row-span-8 grid grid-cols-10 justify-center gap-4'>
                           {/*  */}
                          </form>
                          <AlertDialogFooter className="justify-center !flex-row !row-span-1">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={async () => { }}>
                              <Save className='w-4 h-4 mr-2' />
                              Salvar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      Editar lições
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))
        }
        {errors?.books && <span className='text-sm text-red-500'>{errors?.books?.root?.message}</span>}


        <AlertDialog open={alertCreateBookOpen} onOpenChange={setAlertCreateBookOpen}>
          <AlertDialogTrigger>
            <Button type="button" variant="ghost" className="gap-2">
              <PlusSquare />
              Adicionar livro
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <form onSubmit={handleSubmitCreateBook(createBook)}>
              <AlertDialogHeader>
                <AlertDialogTitle>Novo livro</AlertDialogTitle>
                <AlertDialogDescription>
                  Descreva o livro que deseja adicionar
                </AlertDialogDescription>
                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" {...registerCreateBook("name")} className="w-[20rem]" />
                {errorsCreateBook?.name && <span className='text-sm text-red-500'>{errorsCreateBook?.name?.message}</span>}
                <Label htmlFor="position">Posição</Label>
                <Input type="text" id="position" {...registerCreateBook("position")} className="w-[20rem]" />
                {errorsCreateBook?.position && <span className='text-sm text-red-500'>{errorsCreateBook?.position?.message}</span>}
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-8">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit">Cadastrar</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>


        <Button type="submit" variant="default" className="mt-5">
          <PlusCircle className='w-4 h-4 mr-2' />
          Cadastrar
        </Button>
      </form >
    </div >
  );
}

export default FormUpdateBooks;