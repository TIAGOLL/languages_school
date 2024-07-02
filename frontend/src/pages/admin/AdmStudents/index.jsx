import { Eye, PlusCircle, Replace, } from 'lucide-react';
import AdmSideBar from '../../../components/admin/AdmSideBar/index';
import { TabsContent, TabsTrigger, TabsList, Tabs } from '@/components/ui/tabs';
import { useStudent } from './useStudent';
import { CreateStudents } from '../../../components/admin/Forms/CreateStudents';
import { UpdateStudents } from '../../../components/admin/Forms/UpdateStudents';
import { DataTableStudents } from '../../../components/admin/DataTables/Students';
import { SearchOfStudents } from '../../../components/admin/Forms/SearchOfStudents';


function AdmStudents() {

  const { handleTab, activeTab } = useStudent();

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
              <SearchOfStudents />
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