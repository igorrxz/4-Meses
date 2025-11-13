import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Nossa História', href: '#timeline' },
  { label: 'Porque eu te amo', href: '#love-reasons' },
  { label: 'Nossas Fotos', href: '#gallery' },
  { label: 'Sonhos', href: '#dreams' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => item.href);
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-card shadow-2xl py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="glass-card rounded-full w-10 h-10 shadow-lg hover:scale-110 transition-transform duration-300"
          >
            {isDark ? (
              <Sun size={20} className="text-primary" />
            ) : (
              <Moon size={20} className="text-primary" />
            )}
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 glass-card rounded-full px-6 py-3 shadow-lg">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href;
              const isHovered = hoveredItem === item.href;
              
              return (
                <div key={item.href} className="relative">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      relative px-5 py-2.5 rounded-full font-medium text-sm
                      transition-all duration-300 overflow-hidden
                      ${isActive 
                        ? 'text-white' 
                        : 'text-foreground/70 hover:text-primary'
                      }
                    `}
                  >
                    {/* Active background */}
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-aurora rounded-full" />
                    )}
                    
                    {/* Hover effect */}
                    {isHovered && !isActive && (
                      <span className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                    )}
                    
                    {/* Sparkle effect on hover */}
                    {isHovered && (
                      <Sparkles 
                        size={12} 
                        className="absolute -top-1 -right-1 text-primary animate-pulse"
                      />
                    )}
                    
                    <span className="relative z-10 flex items-center gap-2">
                      {item.label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </span>
                  </button>
                  
                  {/* Separator */}
                  {index < navItems.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-border/30" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="glass-card rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-transform duration-300"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-primary" />
                ) : (
                  <Menu className="h-6 w-6 text-primary" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card border-l border-primary/20">
              <div className="flex flex-col space-y-4 mt-12">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`
                        relative group text-left px-6 py-4 rounded-2xl
                        transition-all duration-300 overflow-hidden
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary' 
                          : 'hover:bg-primary/5 text-foreground/80'
                        }
                      `}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                      )}
                      
                      <span className="body-lg font-medium flex items-center gap-3">
                        {isActive && (
                          <Sparkles size={16} className="text-primary animate-pulse" />
                        )}
                        {item.label}
                      </span>
                      
                      {/* Hover shine effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}