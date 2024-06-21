import { Eye, PlusCircle, Replace, Search, X } from 'lucide-react';
import AdmSideBar from '../../../components/admin/AdmSideBar/index';
import { Button } from '@/components/ui/button';
import DataTableStudents from '../../../components/admin/DataTableStudents';
import { TabsContent } from '@/components/ui/tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { StudentsFilterSchema } from './schemas';
import { useStudent } from './useStudent';
import { Select } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { SelectGroup } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { cn } from '../../../lib/utils';
import { CreateStudents } from '../../../components/admin/Forms/CreateStudents';
import { UpdateStudents } from '../../../components/admin/Forms/UpdateStudents';


function AdmStudents() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams()
  const { handleFilterStudents, cleanFilter, handleTab, courses } = useStudent();

  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const course = searchParams.get('course') || null
  const activeTab = searchParams.get('tab')

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(StudentsFilterSchema),
    values: {
      name: name ?? '',
      email: email ?? '',
      course: course ?? ''
    }
  })

  return (
    <div className="h-full w-full overflow-x-hidden mb-10">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[calc(100vw-135px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className="grid w-[600px] grid-cols-3 h-full">
              <TabsTrigger value="all" className="h-12" >
                <Eye className='w-[20px] h-[20px] mr-2' />
                Ver todos
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircle className='w-[20px] h-[20px] mr-2' />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger value="update" disabled={activeTab != 'update'} className="h-12">
                <Replace className='w-[20px] h-[20px] mr-2' />
                Atualizar aluno
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-[calc(100vw-140px-150px)] mt-10">
              <form onSubmit={handleSubmit(handleFilterStudents)} className='flex items-center gap-2 w-8/12 mb-10'>
                <Input placeholder="Nome" {...register('name')} />
                <Input placeholder="E-mail" {...register('email')} />
                <Select {...register('course')} onValueChange={(value) => setValue('course', value)} value={watch("course")}>
                  <SelectTrigger className={cn(watch("course") ? "" : "text-muted-foreground")}>
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

                <Button type="submit" variant="link">
                  <Search className='w-4 h-4 mr-2' />
                  Pesquisar
                </Button>

                <Button type="submit" variant="link" onClick={() => cleanFilter()}>
                  <X className='w-4 h-4 mr-2' />
                  Limpar filtros
                </Button>
              </form>
              <DataTableStudents />
            </TabsContent>
            <TabsContent value="create" className="w-[calc(100vw-140px-150px)] justify-center flex">
              <CreateStudents />
            </TabsContent>
            <TabsContent value="update" className="w-[calc(100vw-140px-150px)] justify-center flex" >
              <UpdateStudents />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmStudents;