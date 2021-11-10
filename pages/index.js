import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div class="fixed w-full text-gray-100">
      <nav class="flex justify-between" style={{ backgroundColor: "#3f51b5" }}>
        <div class="text-2xl ml-4 p-5">Vachan Admin</div>
        <div class="mt-6">
          <Link class="" href="/login">
            <a class="mr-2">Log In</a>
          </Link>
          <Link class="mr-2" href="/signup">
            <a class="mx-2">Sign Up</a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
