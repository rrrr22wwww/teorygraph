import React, { useState } from "react";
import { render } from "@opentui/react";
import type { SelectOption } from "@opentui/core";
import * as fs from "fs";
import path from "path";

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
      value: path.join(PATH, file),
      name: file,
    }));
    console.log(fileOptionsList);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else console.error("unknown type error ", error);
  }
}
scanFolder("test/list_of_adjacency");
