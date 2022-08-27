import './feedNavbar.css';

export default function FeedNavbar({ feedType, setFeedType }) {
    const handleFeedSelection = () => {
        if (feedType === 'explore') setFeedType('feed');
    }
    const handleExploreSelection = () => {
        if (feedType === 'feed') setFeedType('explore');
    }

    return (
        <div className="feedNavbarContainer">
            <div className="feedNavbarLinks">
                <span className="feedNavbarLink" onClick={handleFeedSelection}>My Feed</span>
                <span className="feedNavbarLink" onClick={handleExploreSelection}>Explore</span>
            </div>
        </div>
    )
}
