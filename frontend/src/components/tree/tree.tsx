"use client";

import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import axios from "axios";
import CustomNode from "./CustomNode";
import { TreeNode, TreeComponentProps, Dimensions, Translate } from "react-d3-tree";
import { updateNodeById, animateTranslate } from "./utils";
import { toast } from "sonner";
import { useTree } from "@/contexts/tree-context";

const TreeComponent: React.FC<TreeComponentProps> = ({ initialData, orientation }: { initialData?: TreeNode; orientation: "vertical" | "horizontal" }) => {
  const treeContainer = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [treeData, setTreeData] = useState<TreeNode>(initialData);
  const [translate, setTranslate] = useState<Translate>({ x: 0, y: 0 });


  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 - 100 });
    }
  }, []);

  const handleNodeClick = async (nodeDatum: TreeNode, evt: React.MouseEvent) => {
    if (!treeContainer.current) return;

    const bounds = treeContainer.current.getBoundingClientRect();
    const clickedX = evt.clientX - bounds.left;
    const clickedY = evt.clientY - bounds.top;

    const from = { ...translate };
    const to = {
      x: dimensions.width / 2 - clickedX + translate.x,
      y: dimensions.height / 2 - clickedY + translate.y,
    };

    animateTranslate(from, to, 1000, setTranslate);



    if (nodeDatum.children && nodeDatum.children.length > 0) {
      const newTree = updateNodeById(treeData, nodeDatum.id, (node) => ({
        ...node,
        children: [],
      }));
      setTreeData(newTree);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.atatek.kz/tree/api/tree/?node_id=${nodeDatum.id}`,
        { withCredentials: true }
      );

      const children = response.data.data.map((item: any) => ({
        ...item,
        children: [],
        hexColor: "#2ecc71",
      }));

      if (children.length === 0) {
        toast.info("Ұрпақтары табылмады");
        return;
      }

      const newTree = updateNodeById(treeData, nodeDatum.id, (node) => ({
        ...node,
        children,
      }));

      setTreeData(newTree);
    } catch (error) {
      console.error("Ошибка при загрузке детей:", error);
      toast.error("Ошибка при загрузке данных");
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", zIndex: "1" }} ref={treeContainer} className="fixed top-0 left-0 w-full h-full">
      {dimensions.width > 0 && (
        <Tree
          data={treeData}
          orientation={orientation}
          translate={translate}
          renderCustomNodeElement={(rd3tProps) => (
            <CustomNode {...rd3tProps} nodeDatum={rd3tProps.nodeDatum as unknown as TreeNode} onClick={handleNodeClick} />
          )}
          pathFunc="step"
          collapsible={false}
          shouldCollapseNeighborNodes={false}
          zoomable={true}
        />
      )}
    </div>
  );
};

export default TreeComponent;
