import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import ProgramsSection from '@/components/ProgramsSection';
import ResultsSection from '@/components/ResultsSection';
import BoxSection from '@/components/BoxSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ProgramsSection />
        <ResultsSection />
        <BoxSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
