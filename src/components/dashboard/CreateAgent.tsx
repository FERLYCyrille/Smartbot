import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    X,
    Check,
    ChevronLeft,
    ChevronRight,
    Upload,
    Bot,
    Copy,
    CopyCheck,
} from "lucide-react";

import WidgetPreview from "./WidgetPreview";
import MotsClesInput from "./MotsClesInput";
import type { AgentForm, Agent } from "./types";
import { supabase } from "../../../Supabaseclient";
import { useAuth } from "../../context/AuthContext";

interface Props {
    onCancel: () => void;
    onCreated: (form: AgentForm, cle: string) => Promise<void>;
}

const STEPS = ["Informations", "Base de connaissance", "Apparence", "Langue", "Récapitulatif"];

const COLORS = [
    "#2F6F5E",
    "#14171F",
    "#C9A227",
    "#6B6459",
    "#E63946",
    "#457B9D",
    "#7209B7",
    "#F77F00",
    "#2A9D8F",
    "#D62828",
];

export default function CreateAgent({ onCancel, onCreated }: Props) {
    const { user } = useAuth();

    const [step, setStep] = useState(1);
    const [generated, setGenerated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingIcon, setUploadingIcon] = useState(false);
    const [copied, setCopied] = useState(false);

    const [generatedKey] = useState(
        () => `kadi_live_${Math.random().toString(16).slice(2, 12)}`
    );

    const [form, setForm] = useState<AgentForm>({
        botName: "",
        activityName: "",
        description: "",
        faq: [{ q: "", r: "", motsCles: [] }],
        endpoints: "",
        couleur: "#2F6F5E",
        position: "bas-droit",
        multilingue: false,
        iconeUrl: "",
    });

    const update = (key: keyof AgentForm, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const updateFaq = (index: number, key: "q" | "r", value: string) => {
        update(
            "faq",
            form.faq.map((item, i) => (i === index ? { ...item, [key]: value } : item))
        );
    };

    const updateFaqKeywords = (index: number, motsCles: string[]) => {
        update(
            "faq",
            form.faq.map((item, i) => (i === index ? { ...item, motsCles } : item))
        );
    };

    const addFaq = () => {
        update("faq", [...form.faq, { q: "", r: "", motsCles: [] }]);
    };

    const removeFaq = (index: number) => {
        update("faq", form.faq.filter((_, i) => i !== index));
    };

    const handleIconUpload = async (file: File) => {
        if (!user) return;
        setUploadingIcon(true);

        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}.${ext}`;

        const { error } = await supabase.storage.from("agent-icons").upload(path, file);

        if (error) {
            console.error("Erreur upload icône:", error.message);
            setUploadingIcon(false);
            return;
        }

        const { data } = supabase.storage.from("agent-icons").getPublicUrl(path);
        update("iconeUrl", data.publicUrl);
        setUploadingIcon(false);
    };

    const step1Valid = form.botName.trim().length > 0 && form.activityName.trim().length > 0;
    const canGoNext = step !== 1 || step1Valid;

    const handleFinish = async () => {
        setSubmitting(true);
        await onCreated(form, generatedKey);
        setSubmitting(false);
    };

    const snippetAttrs =
        `data-key="${generatedKey}" data-color="${form.couleur}" data-position="${form.position}"` +
        (form.iconeUrl ? ` data-icon="${form.iconeUrl}"` : "");

    const snippet = `<script src="https://vbzrmzycrxwqdomlfkyi.supabase.co/storage/v1/object/public/widget/widget.js" ${snippetAttrs}></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <button
                onClick={onCancel}
                className="flex items-center gap-1.5 text-sm text-[#6B6459] hover:text-[#14171F] transition-colors mb-6"
            >
                <ChevronLeft size={16} strokeWidth={2.5} />
                Retour
            </button>

            <h1 className="text-[28px] sm:text-3xl font-semibold tracking-tight mb-1.5">
                Créer un agent
            </h1>
            <p className="text-sm text-[#6B6459] mb-8 sm:mb-10">
                Configurez votre chatbot en plusieurs étapes.
            </p>

            {/* Stepper */}
            <div className="flex items-center mb-8 sm:mb-10 overflow-x-auto pb-1 -mx-1 px-1">
                {STEPS.map((label, index) => {
                    const number = index + 1;
                    const active = step === number;
                    const done = step > number;

                    return (
                        <div key={label} className="flex items-center shrink-0">
                            <div className="flex flex-col items-center gap-1.5">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300"
                                    style={{
                                        backgroundColor: done ? "#2F6F5E" : active ? "#14171F" : "#F1EFEA",
                                        color: done || active ? "#fff" : "#A39C90",
                                    }}
                                >
                                    {done ? <Check size={13} strokeWidth={3} /> : number}
                                </div>
                                <span
                                    className="text-[11px] hidden lg:block whitespace-nowrap transition-colors"
                                    style={{ color: active ? "#14171F" : done ? "#6B6459" : "#B7B0A4" }}
                                >
                                    {label}
                                </span>
                            </div>

                            {number < STEPS.length && (
                                <div className="w-6 sm:w-10 h-px mx-1.5 sm:mx-2 mb-4 lg:mb-5 rounded-full bg-[#EDEAE3] overflow-hidden shrink-0">
                                    <div
                                        className="h-full rounded-full transition-all duration-500 ease-out"
                                        style={{
                                            width: step > number ? "100%" : "0%",
                                            backgroundColor: "#2F6F5E",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
                {/* FORM CARD */}
                <div className="rounded-2xl border border-[#EDEAE3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-5 sm:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="flex flex-col gap-5">
                                    <Field label="Nom du bot">
                                        <input
                                            value={form.botName}
                                            onChange={(e) => update("botName", e.target.value)}
                                            placeholder="Ex : Ana"
                                            className="input"
                                        />
                                    </Field>

                                    <Field label="Nom de l'activité">
                                        <input
                                            value={form.activityName}
                                            onChange={(e) => update("activityName", e.target.value)}
                                            placeholder="Ex : Boutique Ana"
                                            className="input"
                                        />
                                    </Field>

                                    <Field label="Description">
                                        <textarea
                                            rows={4}
                                            value={form.description}
                                            onChange={(e) => update("description", e.target.value)}
                                            placeholder="Décrivez votre activité..."
                                            className="input resize-none"
                                        />
                                    </Field>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-[#6B6459] uppercase tracking-wide">
                                            FAQ
                                        </label>

                                        <button
                                            onClick={addFaq}
                                            className="text-sm font-medium text-[#2F6F5E] flex items-center gap-1 hover:opacity-70 transition-opacity"
                                        >
                                            <Plus size={14} />
                                            Ajouter
                                        </button>
                                    </div>

                                    {form.faq.map((pair, index) => (
                                        <div
                                            key={index}
                                            className="border border-[#EDEAE3] rounded-xl p-4 relative flex flex-col gap-3 bg-[#FDFCFA]"
                                        >
                                            {form.faq.length > 1 && (
                                                <button
                                                    onClick={() => removeFaq(index)}
                                                    className="absolute right-3 top-3 text-[#B7B0A4] hover:text-[#14171F] transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}

                                            <input
                                                value={pair.q}
                                                onChange={(e) => updateFaq(index, "q", e.target.value)}
                                                placeholder="Question"
                                                className="w-full bg-transparent border-b border-[#EDEAE3] pb-2 pr-6 text-sm outline-none focus:border-[#2F6F5E] transition-colors"
                                            />

                                            <textarea
                                                value={pair.r}
                                                onChange={(e) => updateFaq(index, "r", e.target.value)}
                                                placeholder="Réponse"
                                                rows={2}
                                                className="w-full bg-transparent text-sm outline-none resize-none"
                                            />

                                            <div>
                                                <label className="text-xs text-[#6B6459] block mb-1.5">
                                                    Mots-clés déclencheurs
                                                </label>
                                                <MotsClesInput
                                                    value={pair.motsCles}
                                                    onChange={(mc) => updateFaqKeywords(index, mc)}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <Field label="Endpoints API">
                                        <textarea
                                            value={form.endpoints}
                                            onChange={(e) => update("endpoints", e.target.value)}
                                            placeholder="Endpoints API"
                                            rows={3}
                                            className="input resize-none"
                                        />
                                    </Field>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <p className="text-sm font-medium mb-3">Couleur principale</p>

                                        <div className="flex flex-wrap gap-3 items-center">
                                            {COLORS.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => update("couleur", color)}
                                                    className="w-9 h-9 rounded-full transition-transform hover:scale-110"
                                                    style={{
                                                        backgroundColor: color,
                                                        boxShadow:
                                                            form.couleur === color
                                                                ? "0 0 0 2px #fff, 0 0 0 4px #14171F"
                                                                : "none",
                                                    }}
                                                />
                                            ))}

                                            <label
                                                className="w-9 h-9 rounded-full border-2 border-dashed border-[#D8D2C7] flex items-center justify-center cursor-pointer relative overflow-hidden shrink-0"
                                                style={
                                                    !COLORS.includes(form.couleur)
                                                        ? { backgroundColor: form.couleur, borderStyle: "solid" }
                                                        : {}
                                                }
                                            >
                                                {COLORS.includes(form.couleur) && (
                                                    <Plus size={13} className="text-[#B7B0A4]" />
                                                )}
                                                <input
                                                    type="color"
                                                    value={form.couleur}
                                                    onChange={(e) => update("couleur", e.target.value)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </label>
                                        </div>

                                        <p className="text-xs text-[#6B6459] mt-2 font-mono">{form.couleur}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-3">Position du widget</p>

                                        <div className="flex gap-2.5">
                                            {(["bas-droit", "bas-gauche"] as const).map((pos) => (
                                                <button
                                                    key={pos}
                                                    onClick={() => update("position", pos)}
                                                    className="border rounded-full px-4 py-2 text-sm transition-colors"
                                                    style={
                                                        form.position === pos
                                                            ? { backgroundColor: "#14171F", borderColor: "#14171F", color: "#fff" }
                                                            : { borderColor: "#EDEAE3", color: "#6B6459" }
                                                    }
                                                >
                                                    {pos === "bas-droit" ? "Bas droite" : "Bas gauche"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-3">Icône du chatbot (optionnel)</p>

                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-[#F1EFEA] flex items-center justify-center overflow-hidden shrink-0">
                                                {form.iconeUrl ? (
                                                    <img
                                                        src={form.iconeUrl}
                                                        alt="Icône du bot"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Bot size={22} className="text-[#B7B0A4]" />
                                                )}
                                            </div>

                                            <label className="flex items-center gap-2 text-sm text-[#2F6F5E] cursor-pointer border border-[#EDEAE3] rounded-full px-4 py-2 hover:bg-[#FAF9F6] transition-colors">
                                                <Upload size={14} />
                                                {uploadingIcon ? "Envoi..." : "Choisir une image"}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    disabled={uploadingIcon}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleIconUpload(file);
                                                    }}
                                                />
                                            </label>
                                        </div>

                                        <p className="text-xs text-[#6B6459] mt-2">
                                            Sans icône, un pictogramme par défaut sera utilisé.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4 */}
                            {step === 4 && (
                                <div className="flex flex-col gap-5">
                                    <label className="text-sm font-medium">Réponse multilingue automatique</label>

                                    <button
                                        onClick={() => update("multilingue", !form.multilingue)}
                                        className="w-14 h-8 rounded-full flex items-center px-1 transition-colors"
                                        style={{
                                            backgroundColor: form.multilingue ? "#2F6F5E" : "#E4E0D8",
                                            justifyContent: form.multilingue ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <motion.div layout className="w-6 h-6 bg-white rounded-full shadow" />
                                    </button>

                                    <p className="text-sm text-[#6B6459] max-w-md">
                                        {form.multilingue
                                            ? "Votre agent détecte automatiquement la langue du visiteur."
                                            : "Votre agent répond selon la langue de votre FAQ."}
                                    </p>
                                </div>
                            )}

                            {/* STEP 5 */}
                            {step === 5 && (
                                <div className="flex flex-col gap-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <RecapItem label="Nom du bot" value={form.botName || "—"} />
                                        <RecapItem label="Activité" value={form.activityName || "—"} />
                                        <RecapItem
                                            label="Questions FAQ"
                                            value={String(form.faq.filter((item) => item.q.trim()).length)}
                                        />
                                        <RecapItem
                                            label="Multilingue"
                                            value={form.multilingue ? "Activé" : "Désactivé"}
                                        />
                                    </div>

                                    {!generated ? (
                                        <button
                                            onClick={() => setGenerated(true)}
                                            className="bg-[#2F6F5E] text-white rounded-full px-5 py-3 text-sm w-fit flex items-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]"
                                        >
                                            Générer la clé d'intégration
                                            <Check size={15} />
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-[#14171F] rounded-xl p-5"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-xs text-white/50">Script à copier</p>
                                                <button
                                                    onClick={handleCopy}
                                                    className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
                                                >
                                                    {copied ? <CopyCheck size={13} /> : <Copy size={13} />}
                                                    {copied ? "Copié" : "Copier"}
                                                </button>
                                            </div>

                                            <code className="text-xs text-white/90 break-all block">{snippet}</code>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* NAVIGATION */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#EDEAE3]">
                        <button
                            disabled={step === 1}
                            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                            className="flex items-center gap-1.5 text-sm text-[#6B6459] disabled:opacity-30 hover:text-[#14171F] transition-colors disabled:hover:text-[#6B6459]"
                        >
                            <ChevronLeft size={15} />
                            Précédent
                        </button>

                        {step < 5 ? (
                            <button
                                disabled={!canGoNext}
                                onClick={() => setStep((prev) => Math.min(5, prev + 1))}
                                className="bg-[#14171F] text-white rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-1.5 disabled:opacity-30 hover:brightness-110 transition-all active:scale-[0.98]"
                            >
                                Suivant
                                <ChevronRight size={15} />
                            </button>
                        ) : (
                            <button
                                disabled={!generated || submitting}
                                onClick={handleFinish}
                                className="bg-[#2F6F5E] text-white rounded-full px-5 py-2.5 text-sm font-medium disabled:opacity-30 flex items-center gap-1.5 hover:brightness-110 transition-all active:scale-[0.98]"
                            >
                                {submitting ? "Création..." : "Terminer"}
                                <Check size={15} />
                            </button>
                        )}
                    </div>
                </div>

                {/* PREVIEW — sticky on large screens, stacked below on mobile */}
                <div className="lg:sticky lg:top-8">
                    <WidgetPreview form={form} />
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="text-xs font-medium text-[#6B6459] mb-1.5 block">{label}</label>
            {children}
        </div>
    );
}

function RecapItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="border border-[#EDEAE3] rounded-xl p-3.5 bg-[#FDFCFA]">
            <p className="text-[11px] text-[#6B6459] mb-1">{label}</p>
            <p className="text-sm font-medium truncate">{value}</p>
        </div>
    );
}

