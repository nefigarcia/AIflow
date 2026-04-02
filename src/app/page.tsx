import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import DemoVideo from '@/components/landing/DemoVideo';
import ProblemSolution from '@/components/landing/ProblemSolution';
import HowItWorks from '@/components/landing/HowItWorks';
import Industries from '@/components/landing/Industries';
import AgentBuilder from '@/components/landing/AgentBuilder';
import Testimonials from '@/components/landing/Testimonials';
import About from '@/components/landing/About';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <DemoVideo />
        <ProblemSolution />
        <HowItWorks />
        <Industries />
        <AgentBuilder />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
