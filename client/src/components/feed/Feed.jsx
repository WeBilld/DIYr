import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import "./feed.css";

export default function Feed() {
  // TODO: pass in user city from contextAPI

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const body = {
      queryString: `_id, owner_id, description, image_url, num_likes, created_at, city, first_name, last_name, email, liked_by_user, followed_by_user, profile_image_url`,
    };

    fetch(`http://localhost:5500/rest/graphql/getFolloweesProjects`, {
      method: "POST",
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.getFolloweesProjects);
        setProjects(data.getFolloweesProjects);
      })
      .catch((err) => console.warn(err));
  }, [projects.length]);

  return (
    <div className="feedContentContainer">
      {projects.map((p, idx) => (
        <Post
          project_id={p._id}
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
