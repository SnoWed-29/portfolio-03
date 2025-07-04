import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import themeEmitter, { type ThemeName } from '@/lib/theme-emitter';

import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import SkillTree from '@/components/InteractiveSkillTree';

// A new wrapper component to observe sections
const SectionObserver = ({ children, sectionName }: { children: React.ReactNode, sectionName: ThemeName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      // Instead of using context, we now EMIT an event
      themeEmitter.emit('themeChange', sectionName);
    }
  }, [isInView, sectionName]);

  return <div ref={ref}>{children}</div>;
};

// No PageContent component needed, just the main component
const Index = () => {
  return (
    <div className="font-inter text-foreground min-h-screen  overflow-x-hidden relative">
      <CustomCursor />
      <main className="relative z-10">
        <SectionObserver sectionName="hero">
          <Hero />
        </SectionObserver>
        <SectionObserver sectionName="showcase">
          <Showcase />
        </SectionObserver>
        <SectionObserver sectionName="parallax">
          <SkillTree />
        </SectionObserver>
      </main>
      
    </div>
  );
};

export default Index;