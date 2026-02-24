import UserAvatar from "./avatar";

const UserDetails: React.FC<{
  name: string,
  email: string,
  profilePic: string,
  role: string
}> = ({
  name,
  email,
  profilePic,
  role
}) => {
    return (
      <div className="flex items-center gap-2.5">
        <div>
          {profilePic ? (
            <img
              src={profilePic}
              alt="user_profile_pic"
              className="w-8 h-8 br-100"
              style={{ maxWidth: "initial" }}
            />
          ) : (
            <UserAvatar name={name} />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm color-sub-text">{name}</span>
          <span className="text-sm color-sub-text">{email}</span>
        </div>
      </div>
    );
  };
export default UserDetails;
