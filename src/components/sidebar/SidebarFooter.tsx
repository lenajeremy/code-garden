import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Language, languages } from "@/lib/constant";
import { useCallback, useContext } from "react";
import MainContext from "@/lib/main-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import EditorContext from "@/lib/editor-context";
import { useTheme } from "next-themes";

export const SidebarFooter = () => {
  const { language, setLanguage } = useContext(EditorContext);
  const { userDetails: user, updateUserDetails } = useContext(MainContext);
  const { theme, setTheme } = useTheme();

  const logout = function () {
    localStorage.removeItem("TOKEN")
    updateUserDetails(undefined)
  }

  return (
    <div className="border-t border-border">
      <div className="py-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 hover:bg-background/10"
            >
              <Settings className="w-4 h-4 mr-3" />
              Project Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Editor Settings
                </h3>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Input
                      id="fontSize"
                      type="number"
                      className="w-20"
                      defaultValue={14}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="vs-dark">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vs-dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  General Settings
                </h3>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch
                    id="darkMode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Language Settings
                </h3>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <Label htmlFor="defaultLang">Default Language</Label>
                  <Select
                    defaultValue={language.toLowerCase()}
                    onValueChange={(v) => {
                      const lang = languages.find(
                        (l) => l.toLowerCase() === v.toLowerCase()
                      );
                      if (lang) setLanguage(lang);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang.toLowerCase()}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Apply Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {user ? (
          <div className="py-3">
            <Button
              variant="ghost"
              className="w-full justify-start px-4"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
            <div className="flex items-center gap-3 px-4 mt-4">
              <Avatar className="w-7 h-7">
                <AvatarImage src={user.email} />
                <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start px-4 hover:bg-background/10 mt-2"
          >
            <Link to={"/auth/login"}>Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};