import {SidebarProvider} from "@/components/ui/sidebar";
import {Sidebar} from "./Sidebar";
import {MenuBar} from "./MenuBar";

export const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <Sidebar/>
                <div className="md:p-2 md:pl-0 h-full flex-1">
                    <div className="flex-1 flex flex-col rounded-lg md:border md:border-sidebar-border h-full overflow-hidden">
                        <MenuBar/>
                        <main className="flex-1">{children}</main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};