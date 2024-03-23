import AdmSideBar from "../../../components/admin/AdmSideBar";
import { TabsContent } from '@/components/ui/tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import { User } from "lucide-react";
import { useCourses } from './useCourses';
import { PlusCircleIcon } from "lucide-react";
import DataTableCourses from "../../../components/admin/DataTableCourses";
import FormCreateRegistration from './../../../components/admin/FormCreateRegistration/index';
import FormCreateCourse from './../../../components/admin/FormCreateCourse/index';

function AdmCourses() {

  const { handleTab, activeTab } = useCourses();

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[1200px] mt-5 justify-center items-center flex flex-col">
            <TabsList className="grid w-4/12 grid-cols-3 h-full">
              <TabsTrigger value="all" className="h-12" >
                <User className='w-[20px] h-[20px] mr-2' />
                Ver todos
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircleIcon className='w-[20px] h-[20px] mr-2' />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger value="matriculate" className="h-12">
                <PlusCircleIcon className='w-[20px] h-[20px] mr-2' />
                Matricular
              </TabsTrigger>
            </TabsList>
<<<<<<< HEAD
            <TabsContent value="all" className="w-6/12 mt-10">
              <DataTableCourses />
            </TabsContent>
            <TabsContent value="create" className="w-full mt-10">
              <FormCreateCourse />
=======
            <TabsContent value="all" className="w-full mt-10">
              <DataTableCourses />
            </TabsContent>
            <TabsContent value="create" className="w-full mt-10">
             <FormCreateCourse />
>>>>>>> 39c8d20d1114fd156937fbe4dea89ce82c7b053b
            </TabsContent>
            <TabsContent value="matriculate" className="w-full mt-10">
              <FormCreateRegistration />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmCourses;