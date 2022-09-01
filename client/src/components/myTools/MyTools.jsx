import Tool from '../tool/Tool';
import { useEffect, useState } from 'react';
import './myTools.css';

export default function MyTools() {

  const [tools, setTools] = useState({})

  useEffect(() => {
    fetch(`http://localhost:5500/rest/tools/user`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTools(data);
      })
      .catch((err) => console.warn(err));
  });

  const toolArray = tools.map((el, i) => <Tool key={i} data={el} />)

    return (
        <div className="myToolsContainer">
          {toolArray}
        </div>
    )
}
