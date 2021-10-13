import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'
import 'reactjs-popup/dist/index.css'

const YourStory = props => {
  const {yourStory} = props
  const {id, storyImage, caption} = yourStory
  return (
    <Popup
      trigger={
        <div className="react-slick-item" key={id}>
          <img
            className="poster"
            src="./img/sampleProfileImage.svg"
            width="100%"
            height="100%"
            alt="poster"
          />
          <p className="story-username">Your story</p>
        </div>
      }
      modal
    >
      {close => (
        <div data-testid="userStoryModal">
          <IoMdClose onClick={close} />
          <h1>Stories</h1>
          <img
            className="poster"
            src="./img/sampleProfileImage.svg"
            width="100%"
            height="100%"
            alt="user story profile pic"
          />
          <p className="story-username">Rahul</p>
          <img src={storyImage} alt="user story pic" />
          <p className="story-username">{caption}</p>
        </div>
      )}
    </Popup>
  )
}

export default YourStory
