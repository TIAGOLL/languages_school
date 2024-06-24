import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { PlusCircleIcon, User } from "lucide-react";
import AdmSideBar from "../../../components/admin/AdmSideBar";
import { useRegistration } from './useRegistration';
import { CreateRegistration } from "../../../components/admin/Forms/CreateRegistration";
import { DataTableRegistrations } from "../../../components/admin/DataTables/Registrations";

function AdmRegistrations() {

  const { handleTab, activeTab } = useRegistration();

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[calc(100vw-135px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className=" grid-cols-2 h-full">
              <TabsTrigger value="all" className="h-12" >
                <User className='w-[20px] h-[20px] mr-2' />
                Ver todas
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircleIcon className='w-[20px] h-[20px] mr-2' />
                Cadastrar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-[calc(100vw-140px-150px)] mt-10">
              <DataTableRegistrations />
            </TabsContent>
            <TabsContent value="create" className="w-[calc(100vw-140px-150px)] mt-10">
              <CreateRegistration />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdmRegistrations;