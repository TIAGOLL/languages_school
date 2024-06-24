import { SiGoogleclassroom } from "react-icons/si";
import { Select } from '@radix-ui/react-select';
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdateClassroomForm } from "./useUpdateClassroomForm";
import { useEffect } from "react";

export function UpdateClassroomForm({ data }) {

  const { register, setValue, handleSubmit, updateClassroom, errors, watch } = useUpdateClassroomForm()

  useEffect(() => {
    setValue("registration", data.regis.id)
  }, [data.regis.id, setValue])

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild >
        <AlertDialog>
          <AlertDialogTrigger className="bg-green-300 p-1 rounded-md">
            <SiGoogleclassroom className='w-4 h-4 dark:text-black' />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle className="!justify-center flex w-full">Mudar sala</AlertDialogTitle>
            <AlertDialogDescription className="flex text-white text-md p-3">
              Mudando a sala do estudante {data.regis.students.name} no curso de {data.regis.courses.name}?
            </AlertDialogDescription>
            <form onSubmit={handleSubmit(updateClassroom)}>
              <Select className="mb-10" onValueChange={(value) => setValue('classroom', value)} value={watch("classroom")} {...register("classroom", { valueAsNumber: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {console.log(watch("classroom"))}
                  {console.log(watch("registration"))}
                  <SelectGroup className="h-[10rem]">
                    {
                      data.classrooms?.map((classroom) => {
                        if (classroom.books.courses.id == data.regis.courses.id) return (
                          <SelectItem key={classroom.id} value={classroom.id}>
                            {classroom?.date} às {classroom?.hour} || {classroom?.books.name}
                          </SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.classroom && <span className="text-red-500 text-sm">{errors.classroom.message}</span>}
              <AlertDialogFooter className="w-full flex !justify-between !items-start mt-10">
                <AlertDialogCancel>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction type="submit">
                  Mudar sala
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipTrigger>
      <TooltipContent>
        Alterar sala
      </TooltipContent>
    </Tooltip >
  )
}