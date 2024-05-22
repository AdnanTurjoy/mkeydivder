import React, { useState } from "react";
import { Partition } from "../types/partition";
import SplitButtons from "./SplitButtons";
import { getRandomColor } from "../utilites/colorUtility";

const LayoutBuilder: React.FC = () => {


  const initialPartition: Partition = {
    id: "1",
    color: getRandomColor(),
  };

  const [layout, setLayout] = useState<Partition>(initialPartition);

  const splitPartition = (
    partitionId: string,
    direction: "horizontal" | "vertical"
  ): void => {
    setLayout((prevLayout) => {
      const updatePartition = (node: Partition): Partition => {
        if (node.id === partitionId) {
          const newPartition1: Partition = {
            id: crypto.randomUUID(),
            color: node.color,
          };
          const newPartition2: Partition = {
            id: crypto.randomUUID(),
            color: getRandomColor(),
          };
          return {
            ...node,
            direction: direction,
            children: [newPartition1, newPartition2],
          };
        } else if (node.children) {
          return {
            ...node,
            children: node.children.map((child) => updatePartition(child)),
          };
        } else {
          return node;
        }
      };
      return updatePartition(prevLayout);
    });
  };

  const handleVerticalSplit = (partitionId: string) => {
    splitPartition(partitionId, "vertical");
  };

  const handleHorizontalSplit = (partitionId: string) => {
    splitPartition(partitionId, "horizontal");
  };

  const renderPartition = (
    partition: Partition,
    parentDirection?: "horizontal" | "vertical"
  ) => {
    return (
      <div
        key={partition.id}
        className="flex-1"
        style={{
          display: "flex",
          flexDirection: parentDirection === "vertical" ? "row" : "column",
        }}
      >
        <div
          className="h-full w-full flex"
          style={{
            backgroundColor: partition.color,
            flexDirection:
              partition.direction === "horizontal" ? "column" : "row",
          }}
        >
          {partition.children ? (
            partition.children.map((childPartition) =>
              renderPartition(childPartition, partition.direction)
            )
          ) : (
            <SplitButtons
              onVerticalSplit={() => handleVerticalSplit(partition.id)}
              onHorizontalSplit={() => handleHorizontalSplit(partition.id)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full flex">{renderPartition(layout)}</div>
    </div>
  );
};

export default LayoutBuilder;
