import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useTree } from "@/contexts/tree-context"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

interface ChildField {
    id: string;
    name: string;
}

export const AddChildTab = () => {
    const { selectedPerson, addChild } = useTree();
    const { user } = useAuth();
    const [childFields, setChildFields] = useState<ChildField[]>([]);
    const [childLimit, setChildLimit] = useState<number>(0);

    useEffect(() => {
        if (user?.tariff) {
            setChildLimit(user.tariff.t_add_child);
        }
    }, [user]);

    const handleAddField = () => {
        if (childFields.length >= childLimit) {
            toast.error("Ұрпақ қосу лимитіне жеттіңіз");
            return;
        }
        setChildFields([...childFields, { id: Date.now().toString(), name: "" }]);
    };

    const handleRemoveField = (id: string) => {
        setChildFields(childFields.filter(field => field.id !== id));
    };

    const handleNameChange = (id: string, value: string) => {
        setChildFields(childFields.map(field => 
            field.id === id ? { ...field, name: value } : field
        ));
    };

    const handleAddChild = async () => {
        if (!selectedPerson) return;

        const validFields = childFields.filter(field => field.name.trim());
        if (validFields.length === 0) {
            toast.error("Ұрпақтың есімін енгізіңіз");
            return;
        }

        try {
            for (const field of validFields) {
                await addChild(selectedPerson.id.toString(), field.name.trim());
            }
            setChildFields([]);
        } catch (error) {
            toast.error("Ұрпақ қосу кезінде қателік орын алды");
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <Label>Ұрпақтың есімі</Label>
                {childFields.map((field) => (
                    <div key={field.id} className="flex gap-3">
                        <Input 
                            value={field.name}
                            onChange={(e) => handleNameChange(field.id, e.target.value)}
                            placeholder="Ұрпақтың есімін енгізіңіз"
                        />
                        <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleRemoveField(field.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        onClick={handleAddField}
                        disabled={childFields.length >= childLimit}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Жаңа өріс қосу
                    </Button>
                    <Button 
                        onClick={handleAddChild}
                        disabled={childFields.length === 0}
                    >
                        Ұрпақтарды қосу
                    </Button>
                </div>
            </div>
        </div>
    )
} 