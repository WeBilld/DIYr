import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import "./feed.css";

export default function Feed() {
  // TODO: pass in user city from contextAPI

  useEffect(() => {
    const body = {
      queryString: `_id, owner_id, description, image_url, num_likes, created_at, city, first_name, last_name, email, liked_by_user, followed_by_user`,
      city: "Los Angeles",
    };

    fetch(`http://localhost:5500/rest/graphql/projects/`, {
      method: "POST",
      headers: {
        //   Authorization: `Bearer ${auth.token}`,
        // "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.warn(err));
  });

  return (
    <div className="feedContentContainer">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
