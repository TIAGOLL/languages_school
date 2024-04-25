import AdmSideBar from "../../../components/admin/AdmSideBar";
import { TabsContent } from '@/components/ui/tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import { User } from "lucide-react";
import { useCourses } from './useCourses';
import { PlusCircleIcon } from "lucide-react";
import DataTableCourses from "../../../components/admin/DataTableCourses";
import FormCreateCourse from './../../../components/admin/FormCreateCourse/index';
import { Replace } from "lucide-react";
import FormUpdateBooks from "../../../components/admin/FormUpdateBooks";

function AdmCourses() {

  const { handleTab, activeTab } = useCourses();

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[calc(100vw-135px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className="grid grid-cols-3 h-full">
              <TabsTrigger value="all" className="h-12" >
                <User className='w-[20px] h-[20px] mr-2' />
                Ver todos
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircleIcon className='w-[20px] h-[20px] mr-2' />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger value="updatebooks" className="h-12" disabled={activeTab != 'updatebooks'}>
                <Replace className='w-[20px] h-[20px] mr-2' />
                Atualizar livros
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-[calc(100vw-140px-150px)] mt-10">
              <DataTableCourses />
            </TabsContent>
            <TabsContent value="create" className="w-[calc(100vw-140px-150px)] mt-10">
              <FormCreateCourse />
            </TabsContent>
            <TabsContent value="updatebooks" className="w-[calc(100vw-140px-150px)] mt-10">
              <FormUpdateBooks />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmCourses;