import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTree } from "@/contexts/tree-context"
import { InfoTab } from "./tabs/info-tab"
import { AddChildTab } from "./tabs/add-child-tab"
import { EditTab } from "./tabs/edit-tab"
import { Loader2 } from "lucide-react"

const DrawerTree = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    const { selectedPerson, isLoading } = useTree();

    if (!selectedPerson) return null;

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="h-full">
                <DrawerHeader className="border-b pb-4">
                    <DrawerTitle>
                        <div className="text-2xl font-bold text-primary">{selectedPerson.name}</div>
                    </DrawerTitle>
                </DrawerHeader>
                <div className="w-[95vw] mx-auto py-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Tabs defaultValue="info" className="w-full">
                            <TabsList className="w-full grid grid-cols-3 mb-6">
                                <TabsTrigger value="info" className="text-sm">Ақпарат</TabsTrigger>
                                <TabsTrigger value="add-child" className="text-sm">Ұрпақ қосу</TabsTrigger>
                                <TabsTrigger value="edit-data" className="text-sm">Өзгерту</TabsTrigger>
                            </TabsList>
                            <TabsContent value="info">
                                <InfoTab person={selectedPerson} />
                            </TabsContent>
                            <TabsContent value="add-child">
                                <AddChildTab />
                            </TabsContent>
                            <TabsContent value="edit-data">
                                <EditTab />
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerTree;