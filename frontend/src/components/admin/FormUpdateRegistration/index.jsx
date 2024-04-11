// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useFormUpdateRegistration } from './useFormUpdateRegistration';
// import { Save } from 'lucide-react';

// function FormUpdateRegistration() {

//   const { handleSubmit, createRegistration, errors, register, setValue, infoForUpdate, setSearchParams, registrationId, watch, setOpenInputStudent, openInputStudent, currentBook, currentClassroom, currentCourse, currentStudent } = useFormUpdateRegistration()

//   if (!currentBook || !currentCourse || !currentStudent) return <div>Carregando...</div>

//   return (
//     <div className='mt-10 flex flex-col'>
//       <form onSubmit={handleSubmit(createRegistration)} className='grid grid-cols-12 gap-2'>
//         <div className='col-span-4 flex flex-col space-y-1'>
//           <Label>Estudante</Label>
//           <Select {...register('student')} disabled>
//             <SelectTrigger>
//               <SelectValue placeholder="Selecione" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value={infoForUpdate?.registration?.students?.id?.toString()}>{infoForUpdate?.registration?.students?.name}</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.student && <p className='text-sm text-red-500'>{errors.student.message}</p>}
//         </div>

//         <div className='col-span-4'>
//           <Label>Curso</Label>
//           <Select {...register('course')} onValueChange={(value) => {
//             setValue('course', value)
//             setValue('classroom', undefined)
//           }}>
//             <SelectTrigger>
//               <SelectValue placeholder="Selecione" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {
//                   infoForUpdate?.courses?.map((course) => (
//                     <SelectItem key={course.id} value={course.id.toString()}>{course.name}</SelectItem>
//                   ))
//                 }
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.course && <p className='text-sm text-red-500'>{errors.course.message}</p>}
//         </div>

//         <div className='col-span-4'>
//           <Label>Turma</Label>
//           <Select {...register('classroom')} onValueChange={(value) => setValue('classroom', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Selecione" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {
//                   infoForUpdate?.classrooms?.map((classrooms) => {
//                     if (classrooms?.books?.courses_id != currentCourse) return
//                     return <SelectItem key={classrooms.id} value={classrooms.id.toString()}>{classrooms.date + " à(s) " + classrooms.hour + " hora(s)"}</SelectItem>
//                   })
//                 }
//                 {
//                   // se não tiver nenhuma turma disponível para o livro selecionado mostra nenhuma turma disponivel
//                   infoForUpdate?.classrooms?.filter((classrooms) => classrooms?.books?.courses_id == currentCourse).length == 0 && <SelectItem disabled value={null}>Nenhuma turma disponível!</SelectItem>
//                 }
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.classroom && <p className='text-sm text-red-500'>{errors.classroom.message}</p>}
//         </div>

//         <div className='col-span-4'>
//           <Label htmlFor="discount">Desconto (R$)</Label>
//           <Input type="text" id="discount" {...register("discount")} />
//           {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
//         </div>

//         <div className='col-span-4'>
//           <Label>Valor da mensalidade</Label>
//           <Input type="text" {...register("monthlyFeeAmount")} readOnly />
//           {errors.monthlyFeeAmount && <p className='text-sm text-red-500'>{errors.monthlyFeeAmount.message}</p>}
//         </div>

//         <div className='col-span-4'>
//           <Label>Data de início</Label>
//           <Select {...register('startDate')} value={watch("startDate")}>
//             <SelectTrigger>
//               <SelectValue placeholder="Selecione" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value={watch("startDate")}>{watch("startDate")}</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.startDate && <p className='text-sm text-red-500'>{errors.startDate.message}</p>}
//         </div>

//         <Button type="submit" variant="default" className="mt-5">
//           <Save className='w-4 h-4 mr-2' />
//           Cadastrar
//         </Button>
//       </form >
//     </div >
//   );
// }

// export default FormUpdateRegistration;