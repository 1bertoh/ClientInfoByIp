'use client'

import getIP from "@/api/getIP";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    function teste() {
        axios.get("https://client-info-by-ip.vercel.app/api/get-ip")
        .then(e => {
            const ip = e.data.ip
              router.push("/ip/"+ip);
            }).then(e => {
                
            // router.push("/ip/"+'164.163.206.106');
        })
    }

    return (
        <main >
            <div>
                <button onClick={teste} >Click me</button>
            </div>
        </main>
    );
}