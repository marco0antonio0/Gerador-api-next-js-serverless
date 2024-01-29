import FileSaver from "file-saver";
import JSZip from "jszip";

const handleDownload = async (routerName: string) => {
  const zip = new JSZip();
  // package.json
  zip.file(`api-Gerada/package.json`, code_packageJson);
  // firebase file
  zip.file(`api-Gerada/firebase.config`, firebaseFile);
  // rota-api
  zip.file(`api-Gerada/pages/api/${routerName}.ts`, SetRouterFile(routerName));
  // txt config api config
  zip.file(
    `api-Gerada/services/${routerName}/config/${routerName}.ts`,
    config(routerName)
  );
  //
  zip.file(`api-Gerada/services/${routerName}/create.ts`, code_create);
  //
  zip.file(`api-Gerada/services/${routerName}/remove.ts`, code_remove);
  //
  zip.file(`api-Gerada/services/${routerName}/search.ts`, code_search);
  //
  zip.file(`api-Gerada/services/${routerName}/update.ts`, code_update);

  const content = await zip.generateAsync({ type: "blob" });
  FileSaver(content, "api-gerada.zip");
};

function SetRouterFile(routerName: string) {
  return `
import { NextApiRequest, NextApiResponse } from "next";
import { Search } from "../../services/${routerName}/search";
import { Create } from "../../services/${routerName}/create";
import { Remove } from "../../services/${routerName}/remove";
import { Update } from "../../services/${routerName}/update";
//import { VerifyToken } from "../../controller/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PATCH, DELETE, POST, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,auth"
  );
  // Tratamento específico para a solicitação OPTIONS
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Responde imediatamente com status 200
    return;
  }
  //const token = req.headers.authorization?.replace("Bearer ", "");

  if (true) {
    switch (req.method) {
      case "GET":
        //   ==================================
        //          select
        Search(req, res);
        break;

      case "POST":
        //   ==================================
        //          create
        Create(req, res);
        break;
      case "PUT":
        //   ==================================
        //          update
        Update(req, res);
        break;
      case "DELETE":
        //   ==================================
        //          delete
        Remove(req, res);
        break;
      case "PATCH":
        //   ==================================
        //          parcial update
        res.status(200).json({ data: "rota do tipo PATCH" });
        break;

      default:
        break;
    }
  } else {
    res.status(401).json({ status: false });
  }
}

`;
}

function config(routerName: string) {
  return `
const nameRouter = "${routerName}/";
export { nameRouter };
`;
}

const code_create = `
import { push, ref, set } from "firebase/database";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase.config";
import { nameRouter } from "./config";

export function Create(req: NextApiRequest, res: NextApiResponse) {
  const { title, text } = req.body;
  if (title && text) {
    try {
      const reff = ref(db, nameRouter);
      if (
        title &&
        text &&
        typeof title != "undefined" &&
        typeof text != "undefined"
      ) {
        push(reff, {
          title: title,
          text: text,
        });
        res.status(201).json({ status: true });
      } else {
        res.status(400).json({ status: false });
      }
    } catch (error) {
      res.status(500).json({ status: false });
    }
  } else {
    res.status(400).json({ status: false });
  }
}
`;

const code_remove = `
import { push, ref, remove, set } from "firebase/database";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase.config";
import { nameRouter } from "./config";

export function Remove(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.body;
  if (key) {
    try {
      const reff = ref(db, nameRouter + key);
      remove(reff);
    } catch (error) {
      res.status(400).json({ status: false });
    }
  } else {
    res.status(400).json({ status: false });
  }
}

`;

const code_search = `
import { DatabaseReference, get, ref } from "firebase/database";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase.config";
import { nameRouter } from "./config";
function transformarEmLista(objeto: {
  [key: string]: { text: string; title: string };
}): { key: string; text: string; title: string }[] {
  return Object.entries(objeto).map(([key, value]) => ({ key, ...value }));
}
//
export function Search(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;
  var reff = null;
  if (key) {
    reff = ref(db, nameRouter + key);
    seachByKey(reff, res);
  } else {
    reff = ref(db, nameRouter);
    seach(reff, res);
  }
}

function seach(reff: DatabaseReference, res: NextApiResponse) {
  get(reff)
    .then((e) => {
      if (e.exists()) {
        var data = transformarEmLista(e.val());
        res.status(200).json({ status: true, data: data });
      } else {
        res.status(404).json({ status: false, data: [] });
      }
    })
    .catch((e) => {
      res.status(500).json({ status: false, data: [] });
    });
}

function seachByKey(reff: DatabaseReference, res: NextApiResponse) {
  get(reff)
    .then((e) => {
      if (e.exists()) {
        res.status(200).json({ status: true, data: e.val() });
      } else {
        res.status(404).json({ status: false, data: [] });
      }
    })
    .catch((e) => {
      res.status(500).json({ status: false, data: [] });
    });
}

`;

const code_update = `
import { ref, update } from "firebase/database";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase.config";
import { nameRouter } from "./config";

export function Update(req: NextApiRequest, res: NextApiResponse) {
  const { key, title, text } = req.body;
  if (key) {
    try {
      const reff = ref(db, nameRouter + key);
      if (key && text && title) {
        update(reff, {
          title: title,
          text: text,
        });
        res.status(200).json({ status: true });
      } else {
        res.status(400).json({ status: false });
      }
    } catch (error) {
      res.status(400).json({ status: false });
    }
  } else {
    res.status(400).json({ status: false });
  }
}

`;

const code_packageJson = `
{
  "name": "apigerada",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/next": "^9.0.0",
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.1",
    "firebase": "^10.7.2",
    "jsonwebtoken": "^9.0.2",
    "next": "^13.4.19",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "20.11.7",
    "@types/react": "18.2.48",
    "typescript": "5.3.3"
  }
}

`;

const firebaseFile = `
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
require("dotenv").config();

var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MENSAGINSENDER,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const appxx = initializeApp(firebaseConfig);
const auth = getAuth(appxx);
const db = getDatabase(appxx);
export { appxx, auth, db };

`;

export { handleDownload };
