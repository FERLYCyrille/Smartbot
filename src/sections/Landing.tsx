import FeaturesSection from "../components/FeaturesSection"
import Hero from "../components/Hero"
import PlatformsSection from "../components/PlatformsSection"
import EcosystemSection from "../components/EcosystemSection"
import HowItWorksSection from "../components/HowItWorksSection"
import CTASection from "../components/CTASection"
import TestimonialsSection from "./TestimonialsSection"
import Footer from "../components/Footer"
import FAQSection from "./FAQSection"
import PricingSection from "./Pricingsection"

function SectionLandingPage() {
    return (
        <>
            <Hero />

            <section id="comment-ca-marche">
                <FeaturesSection />
            </section>

            <section id="plateformes">
                <PlatformsSection />
            </section>

            <section id="ecosysteme">
                <EcosystemSection />
            </section>

            <section id="fonctionnalites">
                <HowItWorksSection />
            </section>

            <section id="temoignages">
                <TestimonialsSection />
            </section>

            <section id="faq">
                <FAQSection />
            </section>
            <section id="pricing">
                <PricingSection />
            </section>
            <section id="cta">
                <CTASection />
            </section>

            <Footer />
        </>
    );
}

export default SectionLandingPage;

