import { Circle } from "lucide-react";
import type { Agent } from "./types";


export default function StatusBadge({
    statut
}: {
    statut: Agent["statut"]
}) {


    const actif = statut === "actif";


    return (

        <span
            className={`
inline-flex items-center gap-2
rounded-full px-3 py-1 text-xs
${actif
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }
`}
        >

            <Circle
                size={6}
                className={
                    actif
                        ? "fill-green-600"
                        : "fill-gray-400"
                }
            />


            {actif ? "Actif" : "Inactif"}


        </span>

    )

}