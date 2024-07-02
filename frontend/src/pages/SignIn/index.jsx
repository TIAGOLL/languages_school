import { Card, CardContent, } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../components/ui/tabs"
import { ThemeSwitcher } from "../../components/ui/ThemeSwitcher"
import { AuthForm } from "../../components/admin/Forms/Auth"
import { Info } from "lucide-react"

function SignIn() {

  return (
    <div className="w-screen h-screen justify-center items-center flex bg-slate-100 dark:bg-slate-600">
      <div className="absolute left-10 bottom-10">
        <ThemeSwitcher />
      </div>
      <Tabs defaultValue="auth" className="w-[calc(100vw-135px)] sm:max-w-[425px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auth">Login</TabsTrigger>
          <TabsTrigger value="forgotPassword">Esqueci a senha</TabsTrigger>
        </TabsList>
        <TabsContent value="auth" data-test="tabAuth">
          <AuthForm />
        </TabsContent>
        <TabsContent value="forgotPassword" data-test="tabForgotPassoword">
          <Card className="h-[24rem] flex justify-center items-center">
            <CardContent className="space-y-2 justify-around h-full flex flex-col items-center">
              <span className="flex flex-row gap-2 items-center">
                <Info /> Este recurso ainda não está disponível.
              </span>
              <span className="text-center font-semibold">Caso precise mudar sua senha, entre em contato com a escola.</span>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div >
  )
}

export default SignIn;