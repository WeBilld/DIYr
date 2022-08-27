import './post.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Post() {
    return (
        <div className="postContainer">
            <div className="creatorInfoWrapper">
                <img src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="creatorImage" />
                <p className="creatorName">Jalisa Johnson</p>
                <span className="followSeparator">&#8226;</span>
                {/* <p className="follow">Follow</p> */}
                <p className="following">Following</p>
            </div>
            <img src="https://images.unsplash.com/photo-1598300056393-4aac492f4344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZnVybml0dXJlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className="postImage" />
            <div className="postInfo">
                <div className="postLikeInfo">
                    <FavoriteBorderIcon className="postLikeIcon" />
                    {/* <FavoriteIcon className="postLikeIcon" /> */}
                    <p className="numLikes">2,156 Likes</p>
                </div>
                <p className='postDescription'>I totally made this chair no problem. I used it with tools I own and some I borrowed! I think it turned out swimmingly! Like and follow!</p>
                <p className='postedText'>53 Minutes Ago</p>
            </div>
        </div>
    )
}
