import './index.css'
import FollowStrapComponent from '../FollowStrapComponent'

const MyProfileDetails = props => {
  const {profileDetails, onClickEditProfile, isFollow} = props
  const {
    profilePic,
    userName,
    followersCount,
    postsCount,
    followingCount,
    userBio,
  } = profileDetails

  return (
    <div>
      <div>
        <img
          src={profilePic}
          alt="profile route profile pic"
          className="profile-image"
        />
      </div>
      <div>
        <div>
          <h1>{userName}</h1>
          {isFollow ? (
            <FollowStrapComponent name={userName} img={profilePic} />
          ) : (
            <button type="button" onClick={onClickEditProfile}>
              Edit Profile
            </button>
          )}
        </div>
        <div>
          <p>{postsCount} Posts</p>
          <p>{followersCount} followers</p>
          <p>{followingCount} following</p>
        </div>
        <div>
          <p>{userBio}</p>
        </div>
      </div>
    </div>
  )
}

export default MyProfileDetails
