import { TreeNode } from "./types";

export const updateNodeById = (
  node: TreeNode,
  targetId: number,
  updater: (node: TreeNode) => TreeNode
): TreeNode => {
  if (node.id === targetId) {
    return updater(node);
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) => updateNodeById(child, targetId, updater)),
    };
  }
  return node;
};

export const animateTranslate = (
  from: { x: number; y: number },
  to: { x: number; y: number },
  duration: number,
  onUpdate: (translate: { x: number; y: number }) => void
) => {
  const start = performance.now();

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

    const currentX = from.x + (to.x - from.x) * eased;
    const currentY = from.y + (to.y - from.y) * eased;

    onUpdate({ x: currentX, y: currentY });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}; 