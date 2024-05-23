import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlusCircle, PlusSquare, Save, Trash2 } from 'lucide-react';
import { FaTasks } from "react-icons/fa";
import { useFormUpdateBooks } from './useFormUpdateBooks';
import { Pencil } from 'lucide-react';

function FormUpdateBooks() {

  const { handleSubmit, updateCourse, errors, register, createBook, deleteBook, books, handleSubmitCreateBook, errorsCreateBook, registerCreateBook, course, alertCreateBookOpen, setAlertCreateBookOpen, errorsCreateLesson, watchCreateLesson, registerCreateLesson, setValueCreateLesson, handleSubmitCreateLesson, lessonByBook, setSearchParams, deleteLesson, registerUpdateBook, errorsUpdateBook, setValueUpdateBook, handleSubmitUpdateBook, updateBook, updateLesson, registerUpdateLesson, handleSubmitUpdateLesson, errorsUpdateLesson, watchUpdateLesson, setValueUpdateLesson, createLesson } = useFormUpdateBooks()

  return (
    <div className='flex flex-col mb-10'>
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
                    <TooltipTrigger asChild>
                      <AlertDialog className="grid-rows-10 grid-cols-10 justify-center">
                        <AlertDialogTrigger>
                          <button type="button" onClick={() => {
                            setValueUpdateBook("id", book?.id)
                            setValueUpdateBook("position", book?.position)
                            setValueUpdateBook("name", book?.name)
                          }} className="bg-green-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md">
                            <Pencil className="w-4 h-4 dark:text-black" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <form onSubmit={handleSubmitUpdateBook(updateBook)} className='flex flex-col gap-6'>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Editar livro</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className='grid grid-cols-2 gap-3'>
                              <div className='col-span-2 gap-1 grid w-8/12'>
                                <Label htmlFor="name">Nome</Label>
                                <Input type="name" {...registerUpdateBook("name")} />
                                {errorsUpdateBook.name && <span className="text-red-500 text-sm">{errorsUpdateBook.name.message}</span>}
                              </div>
                              <div className='col-span-2 gap-1 grid w-8/12'>
                                <Label htmlFor="position">Posição</Label>
                                <Input type="position" {...registerUpdateBook("position")} />
                                {errorsUpdateBook.position && <span className="text-red-500 text-sm">{errorsUpdateBook.position.message}</span>}
                              </div>
                              <AlertDialogFooter className="col-span-2">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction type="submit">
                                  <Save className='w-4 h-4 dark:text-black mr-2' />Salvar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </div>
                          </form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      Editar livro
                    </TooltipContent>
                  </Tooltip >
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <AlertDialog className="grid-rows-10 grid-cols-10 justify-center">
                        <AlertDialogTrigger>
                          <button type="button" onClick={() => setSearchParams((state) => { state.set("book", book.id); return state; })} className="bg-orange-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md">
                            <FaTasks className='w-4 h-4' />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-[calc(100vw-100px)] flex flex-col h-[calc(100vh-50px)] justify-between">
                          <AlertDialogHeader className="items-center row-span-1">
                            <AlertDialogTitle>Lições</AlertDialogTitle>
                            <AlertDialogDescription>
                              curso: {course?.name} | Livro: {book?.name}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <form className='overflow-y-auto gap-2 flex flex-col justify-center w-full items-center'>
                            {
                              lessonByBook && lessonByBook?.map((lesson, index) => (
                                <div key={index} className='grid grid-cols-12 gap-4 w-8/12 justify-center'>
                                  <div className='col-span-1 flex flex-col space-y-1'>
                                    <Label htmlFor={`lessons.${index}.position`}>Posição</Label>
                                    <Input type="text" id={`lessons.${index}.position`} {...registerCreateLesson(`lessons.${index}.position`)} value={lesson.position} readOnly />
                                    {errors?.lessons?.[index]?.position && <span className='text-sm text-red-500'>{errors?.lessons?.[index]?.position?.message}</span>}
                                  </div>
                                  <div className='col-span-3 flex flex-col space-y-1'>
                                    <Label htmlFor={`lessons.${index}.name`}>Nome</Label>
                                    <Input type="text" id={`lessons.${index}.name`} {...registerCreateLesson(`lessons.${index}.name`)} value={lesson.name} readOnly />
                                    {errors?.lessons?.[index]?.name && <span className='text-sm text-red-500'>{errors?.lessons?.[index]?.name?.message}</span>}
                                  </div>
                                  <div className='col-span-7 flex flex-col space-y-1'>
                                    <Label htmlFor={`lessons.${index}.code`}>Código (Canva)</Label>
                                    <Input type="text" id={`lessons.${index}.code`} {...registerCreateLesson(`lessons.${index}.code`)} value={lesson.code} readOnly />
                                    {errors?.lessons?.[index]?.code && <span className='text-sm text-red-500'>{errors?.lessons?.[index]?.code?.message}</span>}
                                  </div>
                                  <div className='col-span-1 flex flex-row justify-start items-end gap-2'>
                                    <TooltipProvider>
                                      <Tooltip delayDuration={0}>
                                        <TooltipTrigger>
                                          <AlertDialog>
                                            <AlertDialogTrigger>
                                              <button onClick={() => {
                                                setValueUpdateLesson("id", lesson?.id)
                                                setValueUpdateLesson("position", lesson?.position)
                                                setValueUpdateLesson("name", lesson?.name)
                                                setValueUpdateLesson("code", lesson?.code)
                                              }} type="button" className="bg-green-300 col-span-1 text-black justify-center flex items-center p-2 rounded-md">
                                                <Pencil className="w-4 h-4 dark:text-black" />
                                              </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Editar</AlertDialogTitle>
                                              </AlertDialogHeader>
                                              <form onSubmit={handleSubmitUpdateLesson(updateLesson)} className='gap-2 flex flex-col'>
                                                <div className='col-span-2 gap-1 grid w-8/12'>
                                                  <Label htmlFor="lessonName">Nome</Label>
                                                  <Input type="lessonName" {...registerUpdateLesson("name")} />
                                                  {errorsUpdateLesson.name && <span className="text-red-500 text-sm">{errorsUpdateLesson.name.message}</span>}
                                                </div>
                                                <div className='col-span-2 gap-1 grid w-8/12'>
                                                  <Label htmlFor="lessonPosition">Posição</Label>
                                                  <Input type="lessonPosition" {...registerUpdateLesson("position")} />
                                                  {errorsUpdateLesson.position && <span className="text-red-500 text-sm">{errorsUpdateLesson.position.message}</span>}
                                                </div>
                                                <div className='col-span-2 gap-1 grid w-8/12'>
                                                  <Label htmlFor="lessonCode">Código (Canva)</Label>
                                                  <Input type="lessonCode" {...registerUpdateLesson("code")} />
                                                  {errorsUpdateLesson.code && <span className="text-red-500 text-sm">{errorsUpdateLesson.code.message}</span>}
                                                </div>
                                                <AlertDialogFooter>
                                                  <AlertDialogCancel onClick={() => {
                                                    setValueUpdateLesson("name", "")
                                                    setValueUpdateLesson("position", "")
                                                    setValueUpdateLesson("code", "")
                                                  }}>Cancelar</AlertDialogCancel>
                                                  <AlertDialogAction type="submit">
                                                    <Save className='w-4 h-4 mr-2' />
                                                    Salvar
                                                  </AlertDialogAction>
                                                </AlertDialogFooter>
                                              </form>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Editar
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
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
                                                  Você tem certeza que deseja DELETAR a lição: {lesson?.name}?
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={async () => await deleteLesson(lesson.id)}>
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
                            {
                              lessonByBook?.length === 0 && <span className='text-md text-red-500 font-bold justify-center overflow-y-hidden w-full flex'>Nenhuma lição cadastrada</span>
                            }
                          </form>
                          <AlertDialogFooter className="justify-center !flex-col flex items-center gap-2">
                            <div className='w-[10rem] flex flex-col justify-center items-center gap-2'>
                              <AlertDialog open={alertCreateBookOpen} onOpenChange={setAlertCreateBookOpen}>
                                <AlertDialogTrigger>
                                  <Button type="button" variant="ghost" className="w-full mb-5" onClick={() => {
                                    setValueCreateLesson("name", "")
                                    setValueCreateLesson("position", "")
                                    setValueCreateLesson("code", "")
                                    setValueCreateLesson("book", book.id)
                                  }}>
                                    {console.log(errorsCreateLesson)}
                                    <PlusCircle className='w-4 h-4 mr-2' />
                                    Adicionar lição
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <form onSubmit={handleSubmitCreateLesson(createLesson)}>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Nova lição</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Descreva a lição que deseja adicionar
                                      </AlertDialogDescription>
                                      <div className='col-span-2 gap-1 grid w-8/12'>
                                        <Label htmlFor="lessonName">Nome</Label>
                                        <Input type="lessonName" {...registerCreateLesson("name")} />
                                        {errorsCreateLesson.name && <span className="text-red-500 text-sm">{errorsCreateLesson.name.message}</span>}
                                      </div>
                                      <div className='col-span-2 gap-1 grid w-8/12'>
                                        <Label htmlFor="lessonPosition">Posição</Label>
                                        <Input type="lessonPosition" {...registerCreateLesson("position")} />
                                        {errorsCreateLesson.position && <span className="text-red-500 text-sm">{errorsCreateLesson.position.message}</span>}
                                      </div>
                                      <div className='col-span-2 gap-1 grid w-8/12'>
                                        <Label htmlFor="lessonCode">Código (Canva)</Label>
                                        <Input type="lessonCode" {...registerCreateLesson("code")} />
                                        {errorsCreateLesson.code && <span className="text-red-500 text-sm">{errorsCreateLesson.code.message}</span>}
                                      </div>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mt-8">
                                      <AlertDialogCancel onClick={() => {
                                        setValueCreateLesson("name", "")
                                        setValueCreateLesson("position", "")
                                        setValueCreateLesson("code", "")
                                        setValueCreateLesson("book", "")
                                      }}>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction type="submit">
                                        <Save className='w-4 h-4 mr-2' />
                                        Salvar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </form>
                                </AlertDialogContent>
                              </AlertDialog>
                              <AlertDialogCancel variant="default" className="w-full border-2">Sair</AlertDialogCancel>
                            </div>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      Ver lições
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
      </form >
    </div >
  );
}

export default FormUpdateBooks;