import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTree } from "@/contexts/tree-context"

export const EditTab = () => {
    const { selectedPerson, updatePerson } = useTree();
    const [editData, setEditData] = useState({
        name: "",
        birthYear: "",
        deathYear: "",
        biography: ""
    });

    useEffect(() => {
        if (selectedPerson) {
            setEditData({
                name: selectedPerson.name,
                birthYear: selectedPerson.birth?.toString() || "",
                deathYear: selectedPerson.death?.toString() || "",
                biography: selectedPerson.bio || ""
            });
        }
    }, [selectedPerson]);

    const handleUpdatePerson = async () => {
        if (selectedPerson) {
            await updatePerson(selectedPerson.id.toString(), {
                name: editData.name,
                birth: parseInt(editData.birthYear),
                death: editData.deathYear ? parseInt(editData.deathYear) : null,
                bio: editData.biography
            });
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <Label>Есімі</Label>
                <Input 
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Туған жылы</Label>
                <Input 
                    value={editData.birthYear}
                    onChange={(e) => setEditData(prev => ({ ...prev, birthYear: e.target.value }))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Қайтыс болған жылы</Label>
                <Input 
                    value={editData.deathYear}
                    onChange={(e) => setEditData(prev => ({ ...prev, deathYear: e.target.value }))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Өмірбаян</Label>
                <Textarea 
                    value={editData.biography}
                    onChange={(e) => setEditData(prev => ({ ...prev, biography: e.target.value }))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Button onClick={handleUpdatePerson}>Сақтау</Button>
            </div>
        </div>
    )
} 