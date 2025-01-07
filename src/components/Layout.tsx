import {SidebarProvider} from "@/components/ui/sidebar";
import {Sidebar} from "./Sidebar";
import {MenuBar} from "./MenuBar";

export const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <Sidebar/>
                <div className="flex-1 flex flex-col">
                    <MenuBar/>
                    <main className="flex-1 p-4 md:p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
};