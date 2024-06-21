import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, PlusCircleIcon, Replace } from "lucide-react";
import AdmSideBar from "../../../components/admin/AdmSideBar";
import { useClasses } from './useClasses';

function AdmClasses() {

  const { handleTab, activeTab } = useClasses();

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[calc(100vw-135px)] mt-5 justify-center items-center flex flex-col">
            <TabsList className=" grid-cols-3 h-full">
              <TabsTrigger value="all" className="h-12" >
                <Eye className='w-[20px] h-[20px] mr-2' />
                Ver todas
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircleIcon className='w-[20px] h-[20px] mr-2' />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger value="update" className="h-12">
                <Replace className='w-[20px] h-[20px] mr-2' />
                Atualizar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-[calc(100vw-140px-150px)] mt-10">
              <div className=" justify-center items-center flex">
                <h1>Esse recurso ainda não esta disponivel!</h1>
              </div>
            </TabsContent>
            <TabsContent value="create" className="w-[calc(100vw-140px-150px)] mt-10">
              <div className=" justify-center items-center flex">
                <h1>Esse recurso ainda não esta disponivel!</h1>
              </div>
            </TabsContent>
            <TabsContent value="update" className="w-[calc(100vw-140px-150px)] mt-10">
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

export default AdmClasses;