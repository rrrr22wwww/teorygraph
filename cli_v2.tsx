import React, { useState } from "react";
import { render } from "@opentui/react";
import * as fs from "fs"

function debounceRealization(callback: (value: string) => void, delay: number) {
  let timeout: null | any = null;
  return function (value: string) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(value);
      timeout = null;
    }, delay);
  };
}

function Inputbox() {
  const [state, setState] = useState("");
  const debounce = debounceRealization((value: string) => {
    return setState(`${value}`);
  }, 500);
  const handlefunc = (value: string) => {
    debounce(value);
  };

  // case 'load': {
  //   if (!fs.existsSync(TEST_DIR)) {
  //     throw new Error(`Директория тестов не найдена: ${TEST_DIR}`);
  //   }
  //   const files = fs.readdirSync(TEST_DIR).filter(file => file.endsWith('.txt'));
  //   if (files.length === 0) {
  //     throw new Error('В директории тестов нет .txt файлов.');
  //   }
  //   const fileOptions = files.map(file => ({ value: path.join(TEST_DIR, file), label: file }));

    function scanFolder (PATH:string) {

      try{
        if (!fs.existsSync(PATH)) {
          throw new Error(`Директория тестов не найдена: ${PATH}`);
        };
          const files = fs.readdirSync(PATH).filter(file => file.endsWith('.txt'));
          if (files.length === 0) {
            throw new Error('zero file to folder type .txt')
          }
        const fileOptions = files.map(file => ({ value: }))
      } catch {
        return <text>err!</text>
      }
    }


    scanFolder("C:\\Users\\oisa0\\OneDrive\\Рабочий стол\\tgr\\teorygraph\\test\\list_of_adjacency")

  function listSelection() {

  }




  return (
    <box>
      <box title="Enter your name" style={{ border: true, height: 3 }}>
        <input
          placeholder="Type here..."
          focused
          onInput={handlefunc}
          onSubmit={(state) => console.log("Submitted:", state)}
        />
      </box>
      <box style={{ border: true, height: 6 }}>
        <text>{state}</text>
      </box>
    </box>
  );
}

export function App() {
  return <box style={{ border: true, height: "auto" }}></box>;
}

render(<App />);
