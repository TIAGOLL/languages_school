import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from "lucide-react";
import { useSearchOfStudentsForm } from './useSearchOfStudentsForm';
import { cn } from '../../../../lib/utils';

export function SearchOfStudents() {

  const { register, handleSubmit, watch, setValue, handleFilterStudents, courses, cleanFilter } = useSearchOfStudentsForm();

  return (
    <form onSubmit={handleSubmit(handleFilterStudents)} className='flex items-center gap-2 w-8/12 mb-10'>
      <Input placeholder="Nome" {...register('name')} data-test="nameSearchInput" />
      <Input placeholder="E-mail" {...register('email')} data-test="emailSearchInput" />
      <Select onValueChange={(value) => setValue('course', value)} value={watch("course")}>
        <SelectTrigger className={cn(watch("course") ? "" : "text-muted-foreground")} data-test="courseSearchInput"  {...register('course')}>
          <SelectValue placeholder="Curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              courses?.map((courses) => (
                <SelectItem key={courses.id} value={courses.name}>{courses.name}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="submit" variant="link" data-test="searchButton" >
        <Search className='w-4 h-4 mr-2' />
        Pesquisar
      </Button>

      <Button variant="link" type="button" onClick={() => cleanFilter()} data-test="clearFilterButton">
        <X className='w-4 h-4 mr-2' />
        Limpar filtros
      </Button>
    </form>
  )
}