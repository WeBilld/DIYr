import React, { useState, useEffect } from "react";

import Tool from "../tool/Tool";
import "./myTools.css";

export default function MyTools() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5500/rest/tools/user`, {
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTools(data.tools);
      })
      .catch((err) => console.warn(err));
  }, [tools.length]);

  const changeToolAvailabilityState = (toolID, availability) => {
    setTools(tools.map(tool => {
      if (tool._id === toolID) return { ...tool, available: availability }
      return tool;
    }))
  };

  return (
    <div className="myToolsContainer">
      {tools.map((t, idx) => (
        <Tool
          changeToolAvailabilityState={changeToolAvailabilityState}
          tool_id={t._id}
          tool_name={t.tool_name}
          owner_id={t.owner_id}
          description={t.description}
          image_url={t.image_url}
          available={t.available}
          num_likes={t.num_likes}
          created_at={t.created_at}
          key={idx}
          index={idx}
        />
      ))}
    </div>
  );
}
