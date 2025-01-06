import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-600">
      <div className="relative w-screen max-w-md p-2 bg-white rounded-3xl shadow-2xl transform transition-all hover:scale-105">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-white animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m16 0H4m8-8a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
        </div>
        <div className="m-8">
          <h1 className="text-2xl font-extrabold text-center text-gray-900 ">
            Join Us Today!
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Sign up to create your personalized dashboard and explore amazing
            features.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SignUp />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-pink-600 hover:text-pink-800 font-semibold"
          >
            Sign in
          </a>
        </p>
        <div className="mt-4 flex justify-center gap-3 text-gray-500">
          <a href="#" className="hover:text-gray-700">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-700">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}
