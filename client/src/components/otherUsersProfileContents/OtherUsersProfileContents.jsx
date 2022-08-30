import OtherUsersProfileNavbar from '../otherUsersProfileNavbar/OtherUsersProfileNavbar';
import OtherUsersTools from '../otherUsersTools/OtherUsersTools';
import './otherUsersProfileContents.css';

export default function OtherUsersProfileContents() {
    return (
        <div className="otherUsersProfileContentsContainer">
            <OtherUsersProfileNavbar />
            <OtherUsersTools />
        </div>
    )
}
