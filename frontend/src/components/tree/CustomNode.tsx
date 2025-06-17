import React from "react";
import { Info } from "lucide-react";
import { CustomNodeProps } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useTree } from "@/contexts/tree-context";

const CustomNode: React.FC<CustomNodeProps> = ({ nodeDatum, onClick }) => {
  const birth = nodeDatum.birth;
  const death = nodeDatum.death;
  const hasDates = birth || death;
  const dateString = hasDates ? `${birth || "?"} – ${death || "?"}` : "";
  const { user } = useAuth();
  const { setOpen, setSelectedPersonId } = useTree();

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPersonId(nodeDatum.id.toString());
    setOpen(true);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user?.role?.id && user.role.id <= 1) {
      toast.error("Құқықтарыңыз жетіспейді" + user.role.id);
      return;
    }
    setSelectedPersonId(nodeDatum.id.toString());
    setOpen(true);
  };

  return (
    <foreignObject width={120} height={80} x={-60} y={-40}>
      <div
        onClick={(e) => onClick(nodeDatum, e)}
        onContextMenu={handleRightClick}
        style={{
          width: "120px",
          height: "55px",
          borderRadius: "12px",
          backgroundColor: "#a5c86c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          userSelect: "none",
          padding: "4px",
        }}
      >
        <div className="flex gap-3 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-sm" style={{ lineHeight: "12px" }}>
              {nodeDatum.name}
            </div>
            {hasDates && (
              <div style={{ fontSize: "10px", fontWeight: "lighter", marginTop: 2 }}>
                {dateString}
              </div>
            )}
          </div>
          {nodeDatum.info && (
            <Info size={16} color="#fff" onClick={handleInfoClick} style={{ cursor: "pointer" }} />
          )}
        </div>
      </div>
    </foreignObject>
  );
};

export default CustomNode; 