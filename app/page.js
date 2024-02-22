'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Field from "./_components/Field";
import DropWater from "@/icons/water-drop";
import Mountain from "@/icons/mountain";
import Sun from "@/icons/sun";
import getIP from "@/api/getIP";
import getIsOnWaterAPI from "@/api/getIsOnWaterAPI";
import getWeatherAPI from "@/api/getWeatherAPI";
import WaterDropColored from "@/icons/water-drop-colored";
import MountainColored from "@/icons/mountain-colored";
import Tooltip from "./_components/Tooltip";
import axios from "axios";

const Home = () => {
    const [IP, setIP] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [isOnWater, setIsOnWater] = useState({ isOnWater: false });
    const [weather, setWeather] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseIP = await fetch(
                    process.env.DOMAIN + "/api/get-ip"
                );
                const dataIP = await responseIP.json();
                setIP(dataIP.ip);

                const responseUserInfo = await getIP(dataIP.ip);
                setUserInfo(responseUserInfo);

                const lat = responseUserInfo.latitude;
                const lon = responseUserInfo.longitude;
                // const responseIsOnWater = await getIsOnWaterAPI(lat, lon); //SÓ FUNCIONA LOCALMENTE
                const responseIsOnWater = { isOnWater: false };
                setIsOnWater(responseIsOnWater);

                const responseWeather = await getWeatherAPI(lat, lon);
                setWeather(responseWeather);
            } catch (error) {
                console.error("Erro ao obter dados:", error);
            }
        };

        fetchData();
    }, []);

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
        <main className="container min-h-screen pt-4 text-lg">
            <Field
                isDisabled={true}
                label={"IP do computador"}
                prefix={"IP"}
                id="ip-comp"
                value={IP}
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
            <div className="flex gap-3 mt-20 items-center">
                <span className="font-bold">Está na água?</span>
                {local.map((l) => (
                    <div
                        key={l.text}
                        className={`flex p-3 rounded-lg gap-3 w-min ${l.className(
                            isOnWater.isOnWater
                        )}`}
                    >
                        <span>{l.text}</span>
                        {l.icon(isOnWater.isOnWater)}
                    </div>
                ))}
            </div>
            <div className="mt-16">
                <span className="font-bold sm:block">Está muito calor?</span>
                <div className="input-bg-color mt-2 rounded-xl">
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
        </main>
    );
};

export default Home;
