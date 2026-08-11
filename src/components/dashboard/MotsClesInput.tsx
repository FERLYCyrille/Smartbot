import { useState } from "react";
import { X } from "lucide-react";


interface Props {

    value: string[];

    onChange: (value: string[]) => void;

}



export default function MotsClesInput({ value, onChange }: Props) {


    const [draft, setDraft] = useState("");



    const ajouter = () => {

        const mot = draft.trim().toLowerCase();

        if (mot && !value.includes(mot)) {

            onChange([...value, mot]);

        }

        setDraft("");

    };



    const retirer = (mot: string) => {

        onChange(value.filter(m => m !== mot));

    };



    return (

        <div>


            {
                value.length > 0 &&

                <div className="flex flex-wrap gap-1.5 mb-2">

                    {
                        value.map(mot => (

                            <span

                                key={mot}

                                className="
                                flex
                                items-center
                                gap-1.5
                                bg-[#2F6F5E]/10
                                text-[#2F6F5E]
                                text-xs
                                px-2.5
                                py-1
                                rounded-full
                                "

                            >

                                {mot}

                                <button

                                    type="button"

                                    onClick={() => retirer(mot)}

                                >

                                    <X size={11} />

                                </button>

                            </span>

                        ))

                    }

                </div>

            }



            <input

                value={draft}

                onChange={e => setDraft(e.target.value)}

                onKeyDown={e => {

                    if (e.key === "Enter" || e.key === ",") {

                        e.preventDefault();

                        ajouter();

                    }

                }}

                onBlur={ajouter}

                placeholder="Mot-clé puis Entrée (ex: livraison, delai)"

                className="
                w-full
                border
                rounded-lg
                px-3
                py-2
                text-xs
                outline-none
                "

            />


        </div>

    );

}