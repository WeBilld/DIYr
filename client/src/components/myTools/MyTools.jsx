import React, { useState, useEffect } from "react";

import Tool from "../tool/Tool";
import "./myTools.css";

export default function MyTools() {
  return (
    <div className="myToolsContainer">
      <Tool />
      <Tool />
      <Tool />
      <Tool />
      <Tool />
      <Tool />
    </div>
  );
}
