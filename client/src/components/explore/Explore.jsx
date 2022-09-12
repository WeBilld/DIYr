import Post from "../post/Post";
import "./explore.css";
import React, { useState, useEffect } from "react";

export default function Explore() {
  const [localProjects, setLocalProjects] = useState([]);

  useEffect(() => {
    const body = {
      queryString: `_id, owner_id, description, image_url, num_likes, created_at, city, first_name, last_name, email, liked_by_user, followed_by_user, profile_image_url`,
      city: "Los Angeles",
    };

    fetch(`http://localhost:5500/rest/graphql/getLocalProjects`, {
      method: "POST",
      headers: {
        //   Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setLocalProjects(data.getLocalProjects);
      })
      .catch((err) => console.warn(err));
  }, [localProjects.length]);

  return (
    <div className="feedContentContainer">
      {localProjects.map((p, idx) => (
        <Post
          first_name={p.first_name}
          last_name={p.last_name}
          created_at={p.created_at}
          email={p.email}
          followed_by_user={p.followed_by_user}
          num_likes={p.num_likes}
          description={p.description}
          image_url={p.image_url}
          liked_by_user={p.liked_by_user}
          profile_image_url={p.profile_image_url}
          key={idx}
        />
      ))}
    </div>
  );
}
