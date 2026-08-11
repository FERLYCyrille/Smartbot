import {
    LayoutGrid,
    Plus,
    FileText,
    Settings,
    X
} from "lucide-react";

import type { Page } from "./types";


const navItems: { key: Page; label: string; icon: typeof LayoutGrid }[] = [
    {
        key: "overview",
        label: "Vue d'ensemble",
        icon: LayoutGrid
    },
    {
        key: "create",
        label: "Créer un agent",
        icon: Plus
    },
    {
        key: "docs",
        label: "Documentation",
        icon: FileText
    },
    {
        key: "settings",
        label: "Paramètres",
        icon: Settings
    }
];


interface Props {

    page: Page;

    setPage: (p: Page) => void;

    resetToOverview: () => void;

    mobileOpen: boolean;

    onMobileClose: () => void;

}


export default function Sidebar({
    page,
    setPage,
    resetToOverview,
    mobileOpen,
    onMobileClose
}: Props) {


    return (

        <aside className={`
fixed lg:sticky
top-0 left-0
h-screen
w-64
bg-[#14171F]
px-5
py-8
z-40
shrink-0
transition-transform duration-300
${mobileOpen ? "translate-x-0" : "-translate-x-full"}
lg:translate-x-0
`}>


            <div className="flex items-center justify-between mb-10">

                <button
                    onClick={resetToOverview}
                    className="text-2xl font-extrabold tracking-tight text-white hover:opacity-80 transition-opacity"
                >
                    SMARTBOT
                </button>

                <button
                    onClick={onMobileClose}
                    className="text-white/60 lg:hidden"
                >
                    <X size={20} />
                </button>

            </div>


            <nav className="flex flex-col gap-2">

                {
                    navItems.map(
                        ({ key, label, icon: Icon }) => (

                            <button

                                key={key}

                                onClick={() => setPage(key)}

                                className={`
flex gap-3 items-center
px-3 py-2 rounded-xl
text-sm
${page === key
                                        ? "bg-white/10 text-white"
                                        : "text-white/50"
                                    }
`}

                            >

                                <Icon size={17} />

                                {label}

                            </button>

                        )
                    )

                }

            </nav>


        </aside>

    )

}