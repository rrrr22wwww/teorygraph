import { useState } from "react";

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

export function Inputbox() {
  const [state, setState] = useState("");
  const debounce = debounceRealization((value: string) => {
    return setState(`${value}`);
  }, 500);
  const handlefunc = (value: string) => {
    debounce(value);
  };
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
