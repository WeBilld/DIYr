import Post from '../post/Post';
import './feed.css';

export default function Feed() {
    return (
        <div className="feedContentContainer">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}
