import React, { useState } from "react";
import { render, unmount } from "@opentui/react";
import * as fs from "fs";
import path from "path";
import type { SelectOption } from "@opentui/core";

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

export function App() {
  const [selectIndex, setSelectedIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  );

  // Если уже выбрано, показываем результат
  if (isSelected && selectedOption) {
    return (
      <box style={{ padding: 1 }}>
        <text>Вы выбрали: {selectedOption.name}</text>
        <text>Путь: {selectedOption.value}</text>
      </box>
    );
  }

  return (
    <box>
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
            selectedTextColor: "#000000",
            selectedBackgroundColor: "#ff6200",
          }}
          focused={true}
          options={folderData}
          onChange={(index, option) => {
            setSelectedIndex(index);
          }}
          onSelect={(index, option) => {
            setSelectedOption(option);
            setIsSelected(true);
          }}
        ></select>
      </box>
    </box>
  );
}

render(<App />);
