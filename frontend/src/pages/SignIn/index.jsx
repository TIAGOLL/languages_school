import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { LogIn, LockIcon, LoaderIcon } from "lucide-react"
import { Mail } from "lucide-react"



function SignIn() {
  const { signInWithEmail, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function Login(e) {
    e.preventDefault();
    await signInWithEmail(email, password)
  }

  function ChangePassword(e) {
    e.preventDefault();

  }

  return (
    <div className="w-screen h-screen justify-center items-center flex bg-slate-100 dark:bg-slate-600 bg-cover bg-no-repeat" >
      <Tabs defaultValue="account" className="w-[500px] sm:max-w-[425px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Esqueci a senha</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <div className="items-center justify-center flex flex-col mt-4"><img src="/images/logo.png" alt="Logo da loja" className="w-40" /></div>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Faça login e entre na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email" className="flex-row flex">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Label>
                  <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name" className="flex-row flex">
                    <LockIcon className="w-4 h-4 mr-1" />
                    Senha
                  </Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="default" onClick={e => Login(e)}>
                Logar
                {loadingAuth ? <LoaderIcon className="w-4 h-4 ml-2 animate-spin" /> : <LogIn className="w-4 h-4 ml-2" />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Senha</CardTitle>
              <CardDescription>
                Mude sua senha, caso tenha esquecido.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Senha atual</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Nova senha</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={(e) => ChangePassword(e)}>Salvar senha</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div >
  )
}

export default SignIn;