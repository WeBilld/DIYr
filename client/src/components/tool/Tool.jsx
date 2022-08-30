import './tool.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';

export default function Tool() {
    return (
        <div className="toolContainer">
            <img src="https://images.unsplash.com/photo-1619982268623-bcba4bd35c1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dG9vbHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" alt="" className="toolImg" />
            {/* <FavoriteBorderIcon className="likeIcon" /> */}
            <FavoriteIcon className="likeIcon" />
            <p className="toolType">Hatchet</p>
            <div className="toolInfo">
                <div className="toolInfoItem">
                    <p className="toolInfoType">Owner:</p>
                    <p className="toolInfoValue">Jonathan Luu</p>
                </div>
                <div className="toolInfoItem">
                    <p className="toolInfoType">Location:</p>
                    <p className="toolInfoValue">Chicago</p>
                </div>
                <div className="toolInfoItem">
                    <p className="toolInfoType">Desc:</p>
                    <p className="toolInfoValue">Wonderfully sharp hatchet! Cuts through anything. *whisper* aaaanything</p>
                </div>
                <div className="toolInfoItem">
                    <p className="toolInfoType">Available:</p>
                    {/* <p className="toolInfoValue"><CheckIcon color="success" /></p> */}
                    <p className="toolInfoValue"><CloseIcon color="error" /></p>
                </div>
                <div className="requestButtonWrapper">
                    <Button variant='text' color='success' className='requestButton'>Request Tool</Button>
                </div>
            </div>
        </div>
    )
}
