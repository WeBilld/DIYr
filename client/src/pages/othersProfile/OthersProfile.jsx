import OtherUsersInfoSidebar from '../../components/otherUsersInfoSidebar/OtherUsersInfoSidebar';
import OtherUsersProfileContents from '../../components/otherUsersProfileContents/OtherUsersProfileContents';
import './othersProfile.css';

export default function OthersProfile() {
    return (
        <div className="othersProfileContainer">
            <OtherUsersInfoSidebar />
            <OtherUsersProfileContents />
        </div>
    )
}
