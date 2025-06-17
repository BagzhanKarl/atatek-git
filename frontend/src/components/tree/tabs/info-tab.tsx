import Image from "next/image"
import { Person } from "@/contexts/tree-context"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface InfoTabProps {
    person: Person;
}

export const InfoTab = ({ person }: InfoTabProps) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    return (
        <>
            <div className="flex gap-8 items-start bg-muted/5 rounded-lg">
                <div 
                    className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-primary/10 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setIsImageModalOpen(true)}
                >
                    <Image 
                        src={person.mini_icon || "favicon.svg"} 
                        className="w-full h-full object-cover" 
                        alt={person.name} 
                        width={180} 
                        height={180} 
                    />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <div className="text-sm text-muted-foreground min-w-[120px]">Есімі:</div>
                            <div className="text-sm font-semibold">{person.name}</div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <div className="text-sm text-muted-foreground min-w-[120px]">Туған жылы:</div>
                            <div className="text-sm font-semibold">{person.birth || "-"}</div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <div className="text-sm text-muted-foreground min-w-[120px]">Қайтыс болған жылы:</div>
                            <div className="text-sm font-semibold">{person.death || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Биография</h3>
                <div className="h-[300px] overflow-y-auto pr-4 text-sm text-muted-foreground leading-relaxed">
                    {person.bio}
                </div>
            </div>

            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent className="max-w-3xl p-0">
                    <VisuallyHidden>
                        <DialogTitle>Фото {person.name}</DialogTitle>
                    </VisuallyHidden>
                    <div className="relative w-full h-[500px]">
                        <Image 
                            src={person.mini_icon || "favicon.svg"} 
                            className="object-contain" 
                            alt={person.name} 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
} 