import './profile.css';
import UserInfoSidebar from "../../components/userInfoSidebar/UserInfoSidebar";
import Transactions from '../../components/transactions/Transactions';
import Requests from '../../components/requestsSidebar/Requests';
import ProfileContents from '../../components/profileContents/ProfileContents';

export default function Profile() {
    return (
        <div className="profileContainer">
            <UserInfoSidebar />
            {/* <Transactions /> */}
            <ProfileContents />
            <Requests />
        </div>
    )
}
