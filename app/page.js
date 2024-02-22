'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import Field from "./_components/Field";
import MountainColored from "@/icons/mountain-colored";
import Mountain from "@/icons/mountain";
import WaterDropColored from "@/icons/water-drop-colored";
import DropWater from "@/icons/water-drop";

export default function Home() {
    const router = useRouter();
    const local = [
        {
            icon: () => <DropWater className="h-auto w-7" />,
            text: "Sim",
            className: (isOnWater) =>
                isOnWater ? "on-local-water" : "input-bg-color",
        },
        {
            icon: () => <Mountain className="h-auto w-7" />,
            text: "Não",
            className: (isOnWater) =>
                !isOnWater ? "on-local-ground" : "input-bg-color",
        },
    ];

    function getIP() {
        axios.get("https://client-info-by-ip.vercel.app/api/get-ip")
        .then(e => {
            const ip = e.data.ip
              router.push("/ip/"+ip);
            }).then(e => {
                
            // router.push("/ip/"+'164.163.206.106');
        })
    }

    return (
        <main className="container min-h-screen pt-4 sm:text-lg text-base">
            <Field
                isDisabled={true}
                label={"IP do computador"}
                prefix={"IP"}
                id="ip-comp"
                value={"000.000.000.000"}
            />

            <div className="mt-10">
                <Field
                    isDisabled={true}
                    label="Dados do usuário"
                    prefix={"Cidade"}
                    value={"Sua cidade"}
                />
                <br />
                <Field isDisabled={true} prefix={"UF"} value={"Seu País"} />
            </div>
            <div className="sm:flex gap-3 mt-20 items-center">
                <span className="sm:block font-bold">Está na água?</span>
                <div className="flex gap-3">
                    {local.map((l) => {
                        return (
                            <div
                                key={l.text}
                                className={`flex p-3 rounded-lg gap-3 w-min input-bg-color`}
                            >
                                <span>{l.text}</span>
                                {l.icon()}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-10">
                <div
                    className="rounded-xl input-bg-color hover:bg-teal-400 p-2 text-center font-semibold cursor-pointer "
                    onClick={getIP}
                >
                    Check seu IP
                </div>
            </div>
        </main>
    );
}