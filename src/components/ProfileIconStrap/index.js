import {Component} from 'react'
import Cookies from 'js-cookie'
import {Popover, PopoverBody} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import {IoMdClose} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import 'bootstrap/dist/css/bootstrap.css'

class ProfileIconStrap extends Component {
  state = {
    popoverOpen: false,
  }

  toggle = () => {
    const {popoverOpen} = this.state
    this.setState({
      popoverOpen: !popoverOpen,
    })
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickProfile = () => {
    const {history} = this.props
    history.push('/my-profile')
  }

  render() {
    const {popoverOpen} = this.state
    return (
      <div>
        <button type="button" className="transparent-button" id="Popover1">
          <img src="./img/sampleProfileImage.svg" alt="header profile" />
        </button>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="Popover1"
          toggle={this.toggle}
          testId="popover"
        >
          <PopoverBody>
            <div className="pop-over-body">
              <div>
                <IoMdClose onClick={this.toggle} data-testid="closeIcon" />
                <button type="button" onClick={this.onClickProfile}>
                  <CgProfile data-testid="popOverMenuProfileIcon" /> Profile
                </button>
                <button type="button" onClick={this.onClickLogout}>
                  <FiLogOut data-testid="popOverMenuLogOutIcon" /> Logout
                </button>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

export default withRouter(ProfileIconStrap)
