import React, { useState } from "react";
import { render } from "@opentui/react";
import * as fs from "fs";
import path from "path";
import { SelectRenderableEvents, type SelectOption } from "@opentui/core";

interface CustomSelectedProps {
  handle?: (option: SelectOption) => void;
  option: SelectOption[];
}

interface objlist {
  name: string;
  value: number;
  description: string;
}
function scanFolder(PATH: string) {
  try {
    if (!fs.existsSync(PATH)) {
      throw new Error(`Tests to directory not found: ${PATH}`);
    }
    const files = fs.readdirSync(PATH).filter((file) => file.endsWith(".txt"));
    if (files.length === 0) {
      throw new Error("zero file to folder type .txt");
    }
    const fileOptionsList = files.map((file) => ({
      name: file,
      value: path.join(PATH, file),
    }));
    return fileOptionsList;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else console.error("unknown type error ", error);
  }
}

const folderData = scanFolder("test/list_of_adjacency") as SelectOption[];

export function CustomSelected({ handle, option }: CustomSelectedProps) {
  const [selectIndex, setSelectedIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  );

  return (
    <box
      style={{
        border: false,
        padding: 0.75,
        height: 20,
      }}
    >
      <select
        style={{
          height: 20,
          alignItems: "center",
          justifyContent: "center",
          focusedBackgroundColor: "#0F0F0F",
          selectedTextColor: "#000000",
          selectedBackgroundColor: "#ff6200",
          selectedDescriptionColor: "#000000",
        }}
        focused={true}
        options={option}
        onChange={(index, option) => {
          setSelectedIndex(index);
        }}
        onSelect={(index, option) => {
          if (handle && option) handle(option);
          setSelectedOption(option);
          setIsSelected(true);
        }}
      ></select>
    </box>
  );
}

export function App() {
  const testLits: objlist[] = [
    { name: "Binary Tree", value: 13, description: "search of tree " },
    { name: "Chain bandwidth", value: 13, description: "from a to b" },
    { name: "back", value: 13, description: "" },
  ];
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  );

  const handleOptionSelect = (option: SelectOption) => {
    setSelectedOption(option);
    setIsSelected(true);
  };

  if (isSelected && selectedOption) {
    return (
      <box style={{ padding: 1 }}>
        <text>Test name: {selectedOption.name}</text>
        <text content={selectedOption.value} fg={"#7E7E7E"} />
        <CustomSelected option={testLits}></CustomSelected>
      </box>
    );
  }

  return <CustomSelected handle={handleOptionSelect} option={folderData} />;
}

render(<App />);
