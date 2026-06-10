import React, { useState } from 'react';
import { useGIB } from './context/GIBContext';
import OverviewModule from './components/OverviewModule';
import ShopModule from './components/ShopModule';
import TaskModule from './components/TaskModule';
import EventsModule from './components/EventsModule';
import MobileSimulator from './components/MobileSimulator';
import {
  LayoutDashboard,
  Store,
  CheckSquare,
  CalendarDays,
  RotateCcw,
  Moon,
  Sun,
  Award,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

function App() {
  const {
    user,
    toastMessage,
    resetToDefault,
    isDarkMode,
    setIsDarkMode
  } = useGIB();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const body = document.body;
    if (!isDarkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  };

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard': return <OverviewModule />;
      case 'shop':      return <ShopModule />;
      case 'tasks':     return <TaskModule />;
      case 'events':    return <EventsModule />;
      default:          return <OverviewModule />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Genel Bakış',     icon: LayoutDashboard },
    { id: 'tasks',     label: 'Jira Görevleri',  icon: CheckSquare },
    { id: 'shop',      label: 'Mağaza Yönetimi', icon: Store },
    { id: 'events',    label: 'Etkinlikler',      icon: CalendarDays },
  ];

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-dark-bg text-dark-text-primary dark-theme' : 'bg-background text-text-primary'
    }`}>

      {/* ─── GLOBAL TOAST ─────────────────────────────── */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] animate-pop">
          <div className={`glass px-5 py-3 rounded-full shadow-xl border flex items-center gap-2.5 text-sm font-semibold ${
            isDarkMode ? 'border-dark-primary/30 text-dark-primary' : 'border-primary/20 text-primary'
          }`}>
            <Award className="w-4 h-4 text-accent shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ─── LEFT SIDEBAR (ADMIN NAV) ─────────────────── */}
      <aside className={`flex flex-col shrink-0 transition-all duration-300 ${
        sidebarCollapsed ? 'w-[72px]' : 'w-[240px]'
      } ${isDarkMode ? 'bg-dark-surface border-dark-surface-2' : 'bg-white border-border-outline'} border-r`}>

        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b ${
          isDarkMode ? 'border-dark-surface-2' : 'border-border-outline'
        }`}>
          <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-extrabold text-primary dark:text-dark-primary leading-none">GİB İnteraktif</p>
              <p className={`text-[10px] font-medium mt-0.5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>Admin Paneli</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : isDarkMode
                      ? 'text-dark-text-secondary hover:bg-dark-surface-2 hover:text-dark-text-primary'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : ''}`} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-3 space-y-2 border-t ${isDarkMode ? 'border-dark-surface-2' : 'border-border-outline'}`}>
          {/* Dark Mode Toggle */}
          <button
            id="btn-toggle-darkmode"
            onClick={toggleDarkMode}
            title={sidebarCollapsed ? (isDarkMode ? 'Açık Mod' : 'Koyu Mod') : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-dark-surface-2 text-dark-text-secondary hover:text-dark-text-primary'
                : 'bg-surface-2 text-text-secondary hover:text-text-primary'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            {!sidebarCollapsed && <span>{isDarkMode ? 'Açık Moda Geç' : 'Koyu Moda Geç'}</span>}
          </button>

          {/* Reset Button */}
          <button
            id="btn-reset-data"
            onClick={resetToDefault}
            title={sidebarCollapsed ? 'Sıfırla' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-danger/10 text-danger hover:bg-danger/20'
                : 'bg-danger/5 text-danger hover:bg-danger/10'
            }`}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Fabrika Sıfırla</span>}
          </button>

          {/* Collapse Toggle */}
          <button
            id="btn-collapse-sidebar"
            onClick={() => setSidebarCollapsed(p => !p)}
            className={`w-full flex items-center justify-center px-3 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              isDarkMode
                ? 'text-dark-text-secondary hover:bg-dark-surface-2'
                : 'text-text-secondary hover:bg-surface-2'
            }`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT (SPLIT-PANE) ────────────────── */}
      <div className="flex-1 flex min-h-screen overflow-hidden">

        {/* Admin Panel (Left ~70%) */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Top Header Bar */}
          <header className={`h-14 px-6 flex items-center justify-between shrink-0 border-b ${
            isDarkMode ? 'bg-dark-surface border-dark-surface-2' : 'bg-white border-border-outline'
          }`}>
            <div>
              <h1 className="font-bold text-base text-text-primary dark:text-dark-text-primary leading-none">
                {navItems.find(n => n.id === activeTab)?.label ?? 'Genel Bakış'}
              </h1>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                GİB İnteraktif Yönetim Sistemi
              </p>
            </div>

            {/* User Badge */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border ${
              isDarkMode ? 'bg-dark-surface-2 border-dark-surface-2' : 'bg-surface-2 border-border-outline'
            }`}>
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary dark:text-dark-primary">
                  {user.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                {user.name}
              </span>
              <span className="text-[10px] font-bold text-accent">
                {user.points.toLocaleString('tr-TR')} 🪙
              </span>
            </div>
          </header>

          {/* Module Content */}
          <div className={`flex-1 overflow-y-auto p-6 ${
            isDarkMode ? 'bg-dark-bg' : 'bg-background'
          }`}>
            {renderActiveModule()}
          </div>
        </main>

        {/* Mobile Simulator (Right ~30%, fixed width) */}
        <aside className={`w-[360px] shrink-0 flex items-center justify-center border-l py-6 overflow-y-auto ${
          isDarkMode
            ? 'bg-dark-surface/60 border-dark-surface-2'
            : 'bg-surface-2/60 border-border-outline'
        }`}>
          <div className="flex flex-col items-center gap-4">
            {/* Simulator Label */}
            <div className={`text-center`}>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-dark-surface-2 text-dark-text-secondary' : 'bg-white border border-border-outline text-text-secondary'
              }`}>
                📱 Canlı Mobil Simülatör
              </span>
            </div>

            <MobileSimulator />

            {/* Sync indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                Admin Panel ile Canlı Senkron
              </span>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default App;
