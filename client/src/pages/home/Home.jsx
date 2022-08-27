import './home.css';
import FeedNavbar from "../../components/feedNavbar/FeedNavbar";
import Feed from '../../components/feed/Feed';
import Explore from '../../components/explore/Explore';
import { useState } from 'react';

export default function Home() {
  const [feedType, setFeedType] = useState('feed');

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <FeedNavbar feedType={feedType} setFeedType={setFeedType} />
        {feedType === 'feed' && <Feed />}
        {feedType === 'explore' && <Explore />}
      </div>
    </div>
  )
}
