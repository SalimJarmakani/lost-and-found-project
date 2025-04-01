import { signout } from "@/lib/actions/authActions";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold">
        Are you sure you want to sign out?
      </h1>
      <form action={signout} className="mt-4">
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Yes, Sign Out
        </button>
      </form>
    </div>
  );
}
