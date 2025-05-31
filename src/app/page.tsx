import { ClientComponent } from "./_client";

export default function Home() {
  return (
    <div className="w-[90%] mx-auto max-w-[1500px] mt-10 mb-20">

      <div className="mb-5">
        <h1 className="text-[32px] font-semibold mb-1">Members</h1>
        <p className="text-[16px] text-slate-400 text-sm tracking-wider">View your member here.</p>
      </div>

      <ClientComponent />
    </div>
  );
}
