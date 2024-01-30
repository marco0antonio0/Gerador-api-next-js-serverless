import Image from "next/image";
import { Inter } from "next/font/google";
import TopBar from "@/components/topbar";
import { useRouter } from "next/router";
var FileSaver = require("file-saver");
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const r = useRouter();

  return (
    <main className={`flex min-h-screen flex-col `}>
      <TopBar data={[true, false, false]} />

      <div className="w-[80%] h-auto m-auto mt-0 flex flex-col">
        <h1 className="m-auto text-2xl font-semibold mt-5">Gerador de api</h1>
        <div className="flex flex-col m-auto gap-3 mt-5 w-[100%]">
          <Widget_btn
            OnClick={() => {
              r.push("/gerar-api");
            }}
            text="Gerar api 1 rota"
          />
        </div>
      </div>
    </main>
  );
}

function Widget_btn({ text, OnClick }: { text: string; OnClick: Function }) {
  return (
    <>
      <div
        onClick={() => {
          OnClick();
        }}
        className="w-[300px] rounded-xl bg-green-400 m-auto flex sm:w-[80%] active:scale-[1.05] select-none cursor-pointer"
      >
        <h1 className="m-auto my-5 text-white">{text}</h1>
      </div>
    </>
  );
}
