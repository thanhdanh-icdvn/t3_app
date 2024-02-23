import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";

import { api } from "@/trpc/server";

import { CreatePost } from "@/app/_components/create-post";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="text-foreground bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <ThemeSwitcher />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="col-span-1 flex flex-col"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  First Steps →
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link
            className="col-span-1 flex flex-col"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Documentation →
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Button asChild>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Sign out" : "Sign in"}
              </Link>
            </Button>
          </div>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
