import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  async function handleTheme(e) {
    e.preventDefault()
    const togleTheme = theme == "light" ? "dark" : "light"
    setTheme(togleTheme)
  }

  return (
    <Button variant="outline" size="icon" onClick={(e) => handleTheme(e)} data-test="buttonHandleTheme">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button >
  )
}
