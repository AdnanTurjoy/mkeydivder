import React from "react";

interface SplitButtonsProps {
  onVerticalSplit: () => void;
  onHorizontalSplit: () => void;
}

const SplitButtons: React.FC<SplitButtonsProps> = ({
  onVerticalSplit,
  onHorizontalSplit,
}) => {
  return (
    <div className="flex flex-row items-center justify-center h-full w-full">
      <button className="p-2 m-1 bg-gray-200 rounded" onClick={onVerticalSplit}>
        V
      </button>
      <button
        className="p-2 m-1 bg-gray-200 rounded"
        onClick={onHorizontalSplit}
      >
        H
      </button>
    </div>
  );
};

export default SplitButtons;
