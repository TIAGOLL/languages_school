import AdmSideBar from "../../../components/admin/AdmSideBar";
import { User } from "lucide-react";
import { PlusCircleIcon } from "lucide-react";
import { useClassrooms } from "./useClassrooms";
import DataTableClassrooms from "../../../components/admin/DataTableClassrooms";
import { TabsContent } from '@/components/ui/tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import FormCreateClassrooms from "../../../components/admin/FormCreateClassrooms";

function AdmClassrooms() {

  const { handleTab, activeTab } = useClassrooms();

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
            </TabsList>
            <TabsContent value="all" className="w-full mt-10">
              <DataTableClassrooms />
            </TabsContent>
            <TabsContent value="create" className="w-full mt-10">
              <FormCreateClassrooms />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmClassrooms;