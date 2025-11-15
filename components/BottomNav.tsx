import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { HomeIcon, WomanIcon, UsersIcon, GlobeIcon } from './IconComponents';
import { ActiveSection } from '../types';

interface NavItem {
    id: ActiveSection;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
}

const navItems: NavItem[] = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'women', icon: WomanIcon, label: 'Women' },
    { id: 'candidates', icon: UsersIcon, label: 'Candidates' },
    { id: 'minorities', icon: GlobeIcon, label: 'Minorities' },
];

const BottomNav: React.FC = () => {
    const { activeSection, setActiveSection } = useAppContext();

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 glass-pane z-40 border-t border-white/10">
            <div className="flex justify-around items-center h-full">
                {navItems.map(item => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className="flex flex-col items-center justify-center text-xs w-full h-full"
                            aria-label={item.label}
                        >
                            <Icon 
                                className={`w-6 h-6 mb-1 transition-colors ${isActive ? 'text-[var(--color-accent)]' : 'text-gray-400'}`} 
                            />
                            <span className={`transition-colors ${isActive ? 'text-[var(--color-accent)] font-bold' : 'text-gray-400'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
