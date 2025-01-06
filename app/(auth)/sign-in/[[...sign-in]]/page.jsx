import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-600">
      <div className="relative w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl transform transition-all hover:scale-105">
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
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
              d="M16 7v-2a4 4 0 10-8 0v2m-2 0a6 6 0 1112 0v2m0 4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m10 0H6"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Sign in to access your personalized dashboard and explore amazing
          features.
        </p>
        <div className="flex flex-col items-center gap-3">
          <SignIn />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="text-pink-600 hover:text-pink-800 font-semibold"
          >
            Sign up
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
