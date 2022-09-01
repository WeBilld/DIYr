import "./tool.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

export default function Tool({
  tool_name,
  owner_id,
  description,
  image_url,
  available,
  num_likes,
  created_at,
  key,
}) {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="toolContainer">
      <img src={image_url} alt="" className="toolImg" />
      {userInfo.user_id !== owner_id ? key % 2 === 0 ? <FavoriteBorderIcon className="likeIcon" /> : <FavoriteIcon className="likeIcon" /> : null}
      {/* {key % 2 === 0 ? (
        <FavoriteBorderIcon className="likeIcon" />
      ) : (
        <FavoriteIcon className="likeIcon" />
      )} */}

      <p className="toolType">{tool_name}</p>
      <div className="toolInfo">
        <div className="toolInfoItem">
          <p className="toolInfoType">Owner:</p>
          <p className="toolInfoValue">Javan Ang</p>
        </div>
        <div className="toolInfoItem">
          <p className="toolInfoType">Location:</p>
          <p className="toolInfoValue">Los Angeles</p>
        </div>
        <div className="toolInfoItem">
          <p className="toolInfoType">Desc:</p>
          <p className="toolInfoValue">{description}</p>
        </div>
        <div className="toolInfoItem">
          <p className="toolInfoType">Available:</p>
          {available ? (
            <p className="toolInfoValue">
              <CheckIcon color="success" />
            </p>
          ) : (
            <p className="toolInfoValue">
              <CloseIcon color="error" />
            </p>
          )}
        </div>
        <div className="requestButtonWrapper">
          {available ? (
            <Button
              variant="outlined"
              color="success"
              className="requestButton"
            >
              Request Tool
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              className="requestButton"
              disabled
            >
              Request Tool
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
