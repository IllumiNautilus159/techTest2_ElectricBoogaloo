import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { OperatorFunction } from "node_modules/@trpc/server/dist/observable/types";
import { FunctionComponent, FunctionComponentElement, useContext, useEffect, useState } from "react";
import { ScratchCode } from "~/types/ScratchCode";
import { api } from "~/utils/api";

export default function Home() {

  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  // define state variables 
  const [lastCode, newCode] = useState<ScratchCode>();
  const [allCodes,setAllCodes] = useState<ScratchCode[]>();

  //init values
  var initcodes = api.code.getAllCodes.useQuery();
  var makeCode = api.code.generateCode.useQuery("500");

  // refesh state vars (triggers when "Make a code!" clicked)
  const _newCode = ()=>{
    makeCode.refetch();
    initcodes.refetch();
    newCode(makeCode.data);
    setAllCodes(initcodes.data);
  }
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <CodeGenButton code={lastCode?.code} update={_newCode} />
            <AuthShowcase />
          </div>
          <h3 className="text-white">Here's a list of all the failed attempts haha</h3>
          {allCodes?.map((code)=>{
            return <p key={code.id} className="text-white">{code.code}</p>
          })}
        
        </div>
      </main>
    </>
  );
}



export function CodeGenButton(props:{code? : string ,update : any }){
  // function that generates a new code then updates the state 
  const update = props.update;
  // the value that is to be displayed
  const code = props.code;
  return <>
          <button className="text-white" onClick={update}>Make A Code!</button>
          <p className="text-white">{code}</p>
        </>

}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
