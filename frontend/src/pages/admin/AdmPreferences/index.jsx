import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellRing, LockKeyhole } from "lucide-react";
import AdmSideBar from "../../../components/admin/AdmSideBar";
import { usePreferences } from "./usePreferences";
import { Settings } from 'lucide-react';
import { UpdateRegistrationsTime } from '../../../components/admin/Forms/UpdateRegistrationsTime';

function Preferences() {

  const { handleTab, activeTab } = usePreferences();

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="general" className="w-[calc(100vw-135px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className=" grid-cols-3 h-full">
              <TabsTrigger value="general" className="h-12" >
                <Settings className='w-[20px] h-[20px] mr-2' />
                Geral
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
            <TabsContent value="general" className="w-[calc(100vw-300)] items-center flex justify-center 2xl:w-[calc(100vw-60rem)] xl:w-[calc(100vw-300)] mt-10 gap-6">
              <div className='border-2 rounded-md p-4 border-zinc-600 flex justify-start items-start w-full flex-wrap'>
                <UpdateRegistrationsTime />
              </div>
            </TabsContent>
            <TabsContent value="credentials" className="w-[calc(100vw-300)] mt-10">
              <div className=" justify-center items-center flex">
                <h1>Esse recurso ainda não esta disponivel!</h1>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="w-[calc(100vw-300)] mt-10">
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