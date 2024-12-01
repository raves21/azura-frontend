import ProfileImages from "./profileImages/ProfileImages";
import ProfilePosts from "./profilePosts/ProfilePosts";
import ProfileTabs from "./profileTabs/ProfileTabs";

export default function UserProfileDetails() {
  return (
    <section className="flex flex-col w-full gap-4 pb-10">
      <div className="flex flex-col w-full gap-3 overflow-hidden bg-socialPrimary">
        <ProfileImages
          avatar="/sample-user-pfp.png"
          banner="/sample-user-banner.jpg"
        />
        <div className="flex flex-col gap-4 px-5">
          <button className="self-end px-4 py-3 text-sm transition-colors border border-gray-600 rounded-full hover:border-mainAccent hover:text-mainAccent hover:bg-socialPrimaryHover">
            Edit Profile
          </button>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Elon Musk</p>
            <p className="text-socialTextSecondary">@elonmusk</p>
          </div>
          <div>Let's make humanity interplanetary! 🚀</div>
          <div className="flex gap-6">
            <p>
              <span className="font-semibold">24&nbsp;</span>
              <span className="text-socialTextSecondary">following</span>
            </p>
            <p>
              <span className="font-semibold">17,456&nbsp;</span>
              <span className="text-socialTextSecondary">following</span>
            </p>
          </div>
        </div>
        <ProfileTabs />
      </div>
      <ProfilePosts />
    </section>
  );
}
