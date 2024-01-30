import Image from "next/image";
import { Inter } from "next/font/google";
import TopBar from "@/components/topbar";
import { handleDownload } from "@/code/codeGenerator";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const r = useRouter();
  const [erroStatus, seterroStatus] = useState(false);
  const [dados, setdados] = useState("");
  return (
    <main className={`flex min-h-screen flex-col `}>
      <TopBar data={[false, false, false]} />

      <div className="w-[80%] h-auto m-auto mt-0 flex flex-col">
        <h1 className="m-auto text-2xl font-semibold mt-5">Gerador de api</h1>
        <div className="flex flex-col m-auto gap-3 mt-5 w-[100%]">
          <input
            onChange={(e) => {
              setdados(e.target.value);
              if (dados.length == 0) {
                seterroStatus(true);
              } else {
                seterroStatus(false);
              }
            }}
            type="text"
            className="h-14 m-auto w-[70%] max-w-[500px] px-5 border-2 border-gray-300"
            placeholder="digite o nome da rota que deseja criar"
          />
          {!erroStatus ? null : (
            <h1 className="m-auto text-red-500">campo vazio ou invalido</h1>
          )}
          <Widget_btn
            OnClick={() => {
              if (dados.length > 0) {
                handleDownload(dados);
              } else {
                seterroStatus(true);
              }
            }}
            text="fazer download da api"
          />
        </div>
        <div className="h-20"></div>
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
        className="w-[300px] rounded-xl bg-green-400 m-auto flex sm:w-[50%] active:scale-[1.05] select-none cursor-pointer"
      >
        <h1 className="m-auto my-5 text-white">{text}</h1>
      </div>
    </>
  );
}
