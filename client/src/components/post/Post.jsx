import "./post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Post({
  first_name,
  last_name,
  created_at,
  email,
  followed_by_user,
  num_likes,
  description,
  image_url,
  liked_by_user,
  profile_image_url,
}) {
  let today = new Date();
  let createdDate = new Date(created_at * 1);

  let diffDays = Math.floor(
    (today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
  );
  let stockPhotoUrl =
    "https://images.unsplash.com/photo-1598300056393-4aac492f4344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZnVybml0dXJlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60";
  let imageSrc = image_url === "project.png" ? stockPhotoUrl : image_url;
  let creatorPhoto =
    "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
  let lastPhoto =
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGd1eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

  const handleLike = (event) => {
    console.log('tried to like!');
  }

  return (
    <div className="postContainer">
      <div className="creatorInfoWrapper">
        <img src={profile_image_url} alt="" className="creatorImage" />
        <p className="creatorName">{first_name + " " + last_name}</p>
        <span className="followSeparator">&#8226;</span>
        {followed_by_user ? (
          <p className="following">Following</p>
        ) : (
          <p className="follow">Follow</p>
        )}
      </div>
      <img src={imageSrc} alt="" className="postImage" />
      <div className="postInfo">
        <div className="postLikeInfo">
          {liked_by_user ? (
            <FavoriteIcon className="postLikeIcon" />
          ) : (
            <FavoriteBorderIcon className="postLikeIcon" onClick={handleLike} />
          )}
          <p className="numLikes">{num_likes} Likes</p>
        </div>
        <p className="postDescription">{description}</p>
        <p className="postedText">
          {diffDays === 0 ? "Today" : diffDays + " days ago"}
        </p>
      </div>
    </div>
  );
}
