import './home.css';
import FeedNavbar from "../../components/feedNavbar/FeedNavbar";
import Feed from '../../components/feed/Feed';

export default function Home() {
  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <FeedNavbar />
        <Feed />
      </div>
    </div>
  )
}
