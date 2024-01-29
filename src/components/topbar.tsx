import { useState } from "react";

export default function TopBar({ data = [true, false, false] }: { data: any }) {
  return (
    <>
      <div className="h-32 w-[100%] mb-0 border-b-2 border-gray-200 flex flex-row md:h-24">
        <div className="w-[100%] flex flex-row sm:hidden">
          <LayoutDesktop data={data} />
        </div>
        <div className="w-[100%] hidden sm:flex sm:flex-row">
          <LayoutSmartphone data={data} />
        </div>
      </div>
    </>
  );
}

function LayoutDesktop({ data }: { data: any }) {
  return (
    <>
      <div className=" w-52 h-[100%] m-auto ml-14 ">
        <img src="/image/icon/Logo.png" alt="" className="h-[100%]" />
      </div>
      <div className="m-auto ml-32 flex flex-row gap-16 text-xl mb-10 md:ml-10 md:gap-10 md:mb-auto">
        <h1
          className={`select-none cursor-pointer active:scale-[1.05] ${
            data[0] ? "opacity-90" : "opacity-50"
          } font-bold`}
        >
          Inicio
        </h1>
        <h1
          className={`select-none cursor-pointer active:scale-[1.05] ${
            data[1] ? "opacity-90" : "opacity-50"
          } font-bold`}
        >
          Sobre
        </h1>
        <h1
          className={`select-none cursor-pointer active:scale-[1.05] ${
            data[2] ? "opacity-90" : "opacity-50"
          } font-bold`}
        >
          Projeto
        </h1>
      </div>
    </>
  );
}

function LayoutSmartphone({ data }: { data: any }) {
  const [IsOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <>
      <div className=" w-52 h-[100%] m-auto ml-10 ">
        <img src="/image/icon/Logo.png" alt="" className="h-[100%]" />
      </div>

      <img
        onClick={() => {
          setIsOpenMenu((e) => (e ? false : true));
        }}
        src="/image/icon/menuIcon.png"
        alt=""
        className="h-[70%] w-auto m-auto mr-10 cursor-pointer select-none active:scale-[1.05]"
      />
      {!IsOpenMenu ? null : <MenuOpen data={data} />}
    </>
  );
}

function MenuOpen({ data }: { data: any }) {
  return (
    <>
      <div className="absolute right-3 mt-2 top-24 h-auto bg-white border-2 border-gray-200 rounded-2xl items-center content-center flex flex-col gap-6 py-8 px-14">
        <h1
          className={`select-none cursor-pointer active:scale-[1.05] ${
            data[0] ? "opacity-90" : "opacity-50"
          } font-bold`}
        >
          Inicio
        </h1>
        <h1
          className={`select-none cursor-pointer active:scale-[1.05] ${
            data[1] ? "opacity-90" : "opacity-50"
          } font-bold`}
        >
          Sobre
        </h1>
        <h1
          className={`select-none cursor-pointer active:scale-[1.05] ${
            data[2] ? "opacity-90" : "opacity-50"
          } font-bold`}
        >
          Projeto
        </h1>
      </div>
    </>
  );
}
