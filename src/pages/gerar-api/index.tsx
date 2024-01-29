import Image from "next/image";
import { Inter } from "next/font/google";
import TopBar from "@/components/topbar";
import { handleDownload } from "@/code/codeGenerator";
import { useRouter } from "next/router";
import { useState } from "react";
import Markdown from "react-markdown";
var FileSaver = require("file-saver");
const inter = Inter({ subsets: ["latin"] });

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
          <div className="prose-xl m-auto w-[70%]">
            <h3 className="">Sobre a api</h3>
            <p>
              O projeto geredor de api consiste na geração de uma estrutura de
              api serverless em Next-js. As rotas geradas para o nome desejado
              digitado acima
              <br />
              Ao fazer o donwload da api, <br />
              Inicie na raiz do projeto o comando <br />
              -----------------------------------------
              <br />
              npm install
              <br />
              -----------------------------------------
              <br />
              Para iniciar a api preencha os dados env com os dados de sua
              database firebase realtime
              <br />
              -----------------------------------------
              <br />
              Rode o comando abaixo assim que tudo estiver ok
              <br />
              npm install
              <br />
              -----------------------------------------
              <br />
            </p>
            <h3>{`<Rota_que_deseja_criar>`}</h3>
            <p>
              sistema crud em que passagem de parametro é dita pelo -- body{" "}
              <br />
            </p>
            <p>
              CREATE: Metodo 'post' <br />
              Recebe como parametro 'title' e 'text'
            </p>
            <p>
              REMOVE: Metodo 'delete' <br />
              Recebe como parametro 'key' para identificar o delete
            </p>
            <p>
              UPDATE: Metodo 'put' <br />
              Recebe como parametro 'key','title','text' para fazer a
              atualização
            </p>
            <p>
              SEARCH ALL: Metodo 'GET' <br />
              Não recebe parametro no 'body' nem no 'req'
            </p>
            <p>
              SEARCH ONLY BY KEY: Metodo 'GET' <br />
              Recebe parametro na URL request, parametro 'key'
            </p>
          </div>
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
