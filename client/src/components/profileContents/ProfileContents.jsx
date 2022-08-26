import MyTools from '../myTools/MyTools';
import ProfileNavbar from '../profileNavbar/ProfileNavbar';
import Transactions from '../transactions/Transactions';
import './profileContents.css';

export default function ProfileContents() {
    return (
        <div className="profileContentsContainer">
            <center>
                <ProfileNavbar />
            </center>
            {/* <Transactions /> */}
            <MyTools />
        </div>
    )
}
