import { Eye, PlusCircle, Replace, Search, X, Check } from 'lucide-react';
import AdmSideBar from '../../../components/admin/AdmSideBar/index';
import { Button } from '@/components/ui/button';
import DataTableStudents from '../../../components/admin/DataTableStudents';
import { TabsContent } from '@/components/ui/tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormCreateStudents from '../../../components/admin/FormCreateStudents';
import { useEffect, useState } from 'react';
import FormUpdateStudents from '../../../components/admin/FormUpdateStudents';

const StudentsFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  book: z.string().optional()
})


function AdmStudents() {

  const [searchParams, setSearchParams] = useSearchParams()

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
    setSearchParams(state => {
      state.delete('name')
      state.delete('email')
      state.delete('book')
      state.delete('per_page')
      state.delete('page')
      return state
    })
  }

  function handleFilterStudents({ name, email, book }) {
    setSearchParams(state => {
      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }
      return state
    })

    setSearchParams(state => {
      if (email) {
        state.set('email', email)
      } else {
        state.delete('email')
      }
      return state
    })

    setSearchParams(state => {
      if (book) {
        state.set('book', book)
      } else {
        state.delete('book')
      }
      return state
    })
  }

  function handleTab(e) {
    setSearchParams(state => {
      state.set('tab', e)
      return state
    })
    cleanParams()
  }

  useEffect(() => {
    if (!activeTab) {
      setSearchParams(state => {
        state.set('tab', 'all')
        return state
      })
    }
    if (activeTab == 'all') {
      setSearchParams(state => {
        state.set('tab', 'all')
        state.set('per_page', 10)
        state.set('page', 1)
        return state
      })
    }
  }, [activeTab, setSearchParams])

  return (
    <div className="h-full w-full">
      <div className='flex flex-row mt-1'>
        <AdmSideBar />
        <div className='flex w-full justify-center items-center'>
          <Tabs value={activeTab} onValueChange={handleTab} defaultValue="all" className="w-[80%] mt-5 justify-center items-center flex flex-col">
            <TabsList className="grid w-4/12 grid-cols-3 h-full">
              <TabsTrigger value="all" className="h-12">
                <Eye className='w-4 h-4 mr-2' />
                Ver todos
              </TabsTrigger>
              <TabsTrigger value="create" className="h-12">
                <PlusCircle className='w-4 h-4 mr-2' />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger value="update" disabled={activeTab != 'update'} className="h-12">
                <Replace className='w-4 h-4 mr-2' />
                Atualizar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="w-full mt-10">
              <form onSubmit={handleSubmit(handleFilterStudents)} className='flex items-center gap-2 w-8/12 mb-10'>
                <Input placeholder="Nome" {...register('name')} />
                <Input placeholder="email" {...register('email')} />
                <Input placeholder="book" {...register('book')} />

                <Button type="submit" variant="link">
                  <Search className='w-4 h-4 mr-2' />
                  Pesquisar
                </Button>

                <Button type="submit" variant="link" onClick={() => cleanParams()}>
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