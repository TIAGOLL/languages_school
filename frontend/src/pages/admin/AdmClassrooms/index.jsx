import AdmSideBar from "../../../components/admin/AdmSideBar";
import { User } from "lucide-react";
import { PlusCircleIcon } from "lucide-react";
import { useClassrooms } from "./useClassrooms";
import { TabsContent } from '@/components/ui/tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import { Replace } from "lucide-react";
import { CreateClassrooms } from "../../../components/admin/Forms/CreateClassrooms";
import { UpdateClassrooms } from "../../../components/admin/Forms/UpdateClassrooms";
import { DataTableClassrooms } from "../../../components/admin/DataTables/Classrooms";

function AdmClassrooms() {

  const { handleTab, activeTab } = useClassrooms();

  return (
    <div className="h-full w-full mb-10 overflow-x-hidden">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[calc(100vw-140px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className="grid grid-cols-3 h-full">
              <TabsTrigger value="all" className="h-12" >
                <User className='w-[20px] h-[20px] mr-2' />
                Ver todos
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircleIcon className='w-[20px] h-[20px] mr-2' />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger value="update" className="h-12" disabled={activeTab != 'update'}>
                <Replace className='w-[20px] h-[20px] mr-2' />
                Atualizar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-[calc(100vw-140px-150px)] mt-10">
              <DataTableClassrooms />
            </TabsContent>
            <TabsContent value="create" className="w-[calc(100vw-140px-150px)] mt-10">
              <CreateClassrooms />
            </TabsContent>
            <TabsContent value="update" className="w-[calc(100vw-140px-150px)] mt-10">
              <UpdateClassrooms />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmClassrooms;