import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

function IntroPage() {
  return (
    <div className="flex items-center justify-center min-h-screen   px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <ClipboardList size={60} className="text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-3">Welcome to TaskFlow</h1>

        {/* Description */}
        <p className=" mb-6">
          Organize your work, track progress, and never miss a deadline with TaskFlow.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={"/register"}>
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl font-semibold transition-colors duration-200">
              Register
            </button>
          </Link>
          <Link to={"/login"}>
            <button className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-semibold transition-colors duration-200">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
