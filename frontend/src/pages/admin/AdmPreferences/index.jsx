import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellRing, LockKeyhole, User } from "lucide-react";
import AdmSideBar from "../../../components/admin/AdmSideBar";
import { usePreferences } from "./usePreferences";

function Preferences() {

  const { handleTab, activeTab } = usePreferences();

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[calc(100vw-135px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className=" grid-cols-3 h-full">
              <TabsTrigger value="profile" className="h-12" >
                <User className='w-[20px] h-[20px] mr-2' />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="credentials" className="h-12">
                <LockKeyhole className='w-[20px] h-[20px] mr-2' />
                Credenciais
              </TabsTrigger>
              <TabsTrigger value="notifications" className="h-12">
                <BellRing className='w-[20px] h-[20px] mr-2' />
                Notificações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="w-[calc(100vw-140px-150px)] mt-10">
              <div className=" justify-center items-center flex">
                <h1>Esse recurso ainda não esta disponivel!</h1>
              </div>
            </TabsContent>
            <TabsContent value="credentials" className="w-[calc(100vw-140px-150px)] mt-10">
              <div className=" justify-center items-center flex">
                <h1>Esse recurso ainda não esta disponivel!</h1>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="w-[calc(100vw-140px-150px)] mt-10">
              <div className=" justify-center items-center flex">
                <h1>Esse recurso ainda não esta disponivel!</h1>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Preferences;