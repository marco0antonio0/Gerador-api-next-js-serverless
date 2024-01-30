import Image from "next/image";
import { Inter } from "next/font/google";
import TopBar from "@/components/topbar";
import { handleDownload } from "@/code/codeGenerator";
import { useRouter } from "next/router";
import { useState } from "react";
import Markdown from "react-markdown";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col `}>
      <TopBar data={[false, true, false]} />

      <div className="w-[80%] h-auto m-auto mt-0 flex flex-col">
        <div className="flex flex-col m-auto gap-3 mt-5 w-[100%]">
          <div className="prose-xl m-auto w-[70%]">
            <Markdown>{TextPost}</Markdown>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    </main>
  );
}

const TextPost =
  `
**Geredor de API Next.js em Serverless: Simplificando o Desenvolvimento de APIs Serverless**

Bem-vindo ao Geredor de API, uma ferramenta projetada para agilizar a criação de APIs serverless usando Next.js. Este projeto permite a geração de uma estrutura de API eficiente, personalizada de acordo com o nome desejado.

### Como Utilizar:

1.**Download e Instalação:**
   Ao escolher o nome da sua API, você pode baixar a estrutura gerada. Navegue até a raiz do projeto e execute:
` +
  `
   npm install
   ` +
  `
2.Configuração da API:
   Antes de iniciar a API, preencha as variáveis de ambiente (env) com os dados necessários para conectar à sua base de dados Firebase Realtime.

3.Inicialização da API:
   Após configurar as variáveis, execute o seguinte comando para iniciar a API:
   ` +
  `
   npm start
   ` +
  `
Rotas Disponíveis:
## CRUD Sistema:

- **CREATE: Método 'POST':**
    - Parâmetros: 'title' e 'text' no corpo da requisição.

- **REMOVE: Método 'DELETE':**
    - Parâmetro: 'key' para identificar a remoção.

- **UPDATE: Método 'PUT':**
    - Parâmetros: 'key', 'title', 'text' para realizar a atualização.

- **SEARCH ALL: Método 'GET':**
    - Sem parâmetros no corpo ou na requisição.

- **SEARCH ONLY BY KEY: Método 'GET':**
    - Parâmetro: 'key' passado na URL da requisição.

Facilite o processo de desenvolvimento de APIs serverless com o Geredor de API Next.js. Experimente agora e acelere seu fluxo de trabalho de desenvolvimento de APIs.
`;
