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
import FormCreateStudents from '../../../components/admin/FormCreateStudents';
import { useEffect } from 'react';
import FormUpdateStudents from '../../../components/admin/FormUpdateStudents';
import { StudentsFilterSchema } from './schemas';
import { useStudent } from './useStudent';


function AdmStudents() {

  const [searchParams, setSearchParams] = useSearchParams()
  const { handleFilterStudents, cleanFilter } = useStudent();

  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const book = searchParams.get('book')
  const activeTab = searchParams.get('tab')


  const { register, handleSubmit } = useForm({
    resolver: zodResolver(StudentsFilterSchema),
    values: {
      name: name ?? '',
      email: email ?? '',
      book: book ?? ''
    }
  })
  function cleanParams() {
    setSearchParams((state) => {
      state.delete("name");
      state.delete("email");
      state.delete("book");
      state.delete("per_page");
      state.delete("page");
      return state;
    });
  }
  function handleTab(e) {
    setSearchParams((state) => {
      state.set("tab", e);
      return state;
    });
    cleanParams();
  }

  useEffect(() => {
    if (!activeTab) {
      setSearchParams((state) => {
        state.set("tab", "all");
        return state;
      });
    }
  }, [activeTab, setSearchParams]);


  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[1200px] mt-5 justify-center items-center flex flex-col">
            <TabsList className="grid w-4/12 grid-cols-3 h-full">
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
                Atualizar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-full mt-10">
              <form onSubmit={handleSubmit(handleFilterStudents)} className='flex items-center gap-2 w-8/12 mb-10'>
                <Input placeholder="Nome" {...register('name')} />
                <Input placeholder="E-mail" {...register('email')} />
                <Input placeholder="Book" {...register('book')} />

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
            <TabsContent value="create">
              <FormCreateStudents />
            </TabsContent>
            <TabsContent value="update">
              <FormUpdateStudents />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmStudents;