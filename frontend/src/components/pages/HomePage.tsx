import GlobalOverview from "../sections/GlobalOverview";
import ProfileSection from "../sections/ProfileSection";
function HomePage() {
  return (
    <div className="p-6 space-y-8">
      <GlobalOverview />
      <ProfileSection />
    </div>
  );
}

export default HomePage;
