import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LoaderIcon, LogIn, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/auth';
import { useAuthForm } from './useAuthForm';

export function AuthForm() {

  const { SignIn, loadingAuth } = useContext(AuthContext);
  const { errors, handleSubmit, register } = useAuthForm();

  return (
    <Card>
      <div className="items-center justify-center flex flex-col mt-4">
        <div className="dark:hidden">
          <img src="/images/logo.png" alt="Logo da loja" className="w-40" />
        </div>
        <div className="hidden dark:flex">
          <img src="/images/logoWhite.png" alt="Logo da loja" className="w-40" />
        </div>
      </div>
      <form onSubmit={handleSubmit(SignIn)}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Faça login e entre na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-2 flex flex-col space-y-2">
          <div className="space-y-1">
            <Label htmlFor="user" className="flex-row flex">
              <User className="w-4 h-4 mr-1" />
              Usúario
            </Label>
            <Input type="text" {...register("user")} autoFocus data-test="loginUserInput" />
            {errors.user && <p className="text-red-500 text-xs" data-test="userErrorInput">{errors.user.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="name" className="flex-row flex">
              <LockIcon className="w-4 h-4 mr-1" />
              Senha
            </Label>
            <Input type="password" {...register("password")} data-test="loginPasswordInput" />
            {errors.password && <p className="text-red-500 text-xs" data-test="passwordErrorInput">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="default" type="submit" disabled={loadingAuth} data-test="loginSubmitButton">
            Logar
            {loadingAuth ? <LoaderIcon className="w-4 h-4 ml-2 animate-spin" /> : <LogIn className="w-4 h-4 ml-2" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}