'use client'

import Image from "next/image";
import Field from "@/app/_components/Field";
import DropWater from "@/icons/water-drop";
import Mountain from "@/icons/mountain";
import WaterDropColored from "@/icons/water-drop-colored";
import MountainColored from "@/icons/mountain-colored";
import Tooltip from "@/app/_components/Tooltip";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        axios.get("https://client-info-by-ip.vercel.app/api/get-ip")
        .then(e => {
            setUserInfo(e.data)
        })
    },[])

    return (
        <main className="container min-h-screen pt-4 sm:text-lg text-base">
        {
            userInfo &&
            <UserForm userData={userInfo}  />

        }
        </main>
    );
}

/**
 * 
 * @param {{
 * userData:{
    * ip:String, userInfo:{latitute:Number,longitute:Number,regionName:String, city:String},
    * isOnWater:{isOnWater:Boolean},weather:{code:String, temp:Number, condition_slug:String, icon:SVG}
 * }
 * }} userData
 * @returns 
 */
const UserForm = ({userData}) => {
    const {ip, isOnWater, userInfo, weather} = userData
    const local = [
        {
            icon: (isOnWater) =>
                isOnWater ? (
                    <WaterDropColored className="h-auto w-7" />
                ) : (
                    <DropWater className="h-auto w-7" />
                ),
            text: "Sim",
            className: (isOnWater) =>
                isOnWater ? "on-local-water" : "input-bg-color",
        },
        {
            icon: (isOnWater) =>
                !isOnWater ? (
                    <MountainColored className="h-auto w-7" />
                ) : (
                    <Mountain className="h-auto w-7" />
                ),
            text: "Não",
            className: (isOnWater) =>
                !isOnWater ? "on-local-ground" : "input-bg-color",
        },
    ];
    
    return (
        <>
            <Field
                isDisabled={true}
                label={"IP do computador"}
                prefix={"IP"}
                id="ip-comp"
                value={ip}
            />

            <div className="mt-10">
                <Field
                    isDisabled={true}
                    label="Dados do usuário"
                    prefix={"Cidade"}
                    value={userInfo.city}
                />
                <br />
                <Field
                    isDisabled={true}
                    prefix={"UF"}
                    value={userInfo.regionName}
                />
            </div>
            <div className="sm:flex gap-3 mt-20 items-center">
                <span className="sm:block font-bold">Está na água?</span>
                <div className="flex gap-3">
                    {local.map((l) => {
                        return (
                            <div
                                key={l.text}
                                className={`flex p-3 rounded-lg gap-3 w-min ${l.className(
                                    isOnWater.isOnWater
                                )}`}
                            >
                                <span>{l.text}</span>
                                {l.icon(isOnWater.isOnWater)}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-10">
                <span className="font-bold sm:block">Está muito calor?</span>
                <div className="input-bg-color overflow-hidden mt-2 rounded-xl">
                    <div
                        className="inline-block "
                        style={{
                            marginLeft: "50%",
                            transform: "translate(-50%)",
                        }}
                    >
                        <Tooltip
                            msg={
                                weather.condition_slug === "clear_day"
                                    ? "Muito"
                                    : "Pouco"
                            }
                            className="mx-auto"
                        >
                            <Image
                                width={220}
                                height={220}
                                alt="weather"
                                src={`https://assets.hgbrasil.com/weather/icons/conditions/${weather.condition_slug}.svg`}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}