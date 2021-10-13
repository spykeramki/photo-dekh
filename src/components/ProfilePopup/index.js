import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {IoMdClose} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import 'reactjs-popup/dist/index.css'

const ProfilePopup = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickProfile = () => {
    const {history} = props
    history.push('/my-profile')
  }

  return (
    <Popup
      trigger={
        <button type="button" className="transparent-button">
          <img src="./img/sampleProfileImage.svg" alt="header profile pic" />
        </button>
      }
      position="bottom center"
    >
      {close => (
        <div>
          <IoMdClose onClick={close} data-testid="closeIcon" />
          <button type="button" onClick={onClickProfile}>
            <CgProfile data-testid="popOverMenuProfileIcon" /> Profile
          </button>
          <button type="button" onClick={onClickLogout}>
            <FiLogOut data-testid="popOverMenuLogOutIcon" /> Logout
          </button>
        </div>
      )}
    </Popup>
  )
}
export default withRouter(ProfilePopup)
