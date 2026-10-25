/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AcademicsSection } from './components/AcademicsSection';
import { JkboseNoticeBoard } from './components/JkboseNoticeBoard';
import { BeyondClassroomSection } from './components/BeyondClassroomSection';
import { PmShriDashboard } from './components/PmShriDashboard';
import { DigitalAndLibrarySection } from './components/DigitalAndLibrarySection';
import { InclusionAndSafetySection } from './components/InclusionAndSafetySection';
import { StaffSection } from './components/StaffSection';
import { NoticesSection } from './components/NoticesSection';
import { StudentParentPortal } from './components/StudentParentPortal';
import { GreenCampusSection } from './components/GreenCampusSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { SearchModal } from './components/SearchModal';

import { 
  INITIAL_SCHOOL_INFO, 
  INITIAL_FACILITIES, 
  INITIAL_STAFF_MEMBERS, 
  INITIAL_NOTICES, 
  INITIAL_QUALITY_INDICATORS,
  ACADEMIC_CLASSES_DATA,
  StaffMember,
  FacilityItem,
  NoticeItem,
  QualityIndicator
} from './data/schoolData';

export default function App() {
  // LocalStorage Persistence
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem('pmshri_staff');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if saved data has old placeholders or lacks S.No 7 Mr. Muzzaffer Ahmad Khan / updated designations
        const hasOldPlaceholders = parsed.some((s: StaffMember) => 
          s.name.includes('[Staff Member') || s.name.includes('[Headmaster') || s.name.includes('Configurable')
        );
        const hasSlot7Muzzaffer = parsed.some((s: StaffMember) => 
          s.slotNumber === 7 && s.name.includes('Muzzaffer Ahmad Khan') && s.designation === 'Master'
        );
        const hasUpdatedTahir = parsed.some((s: StaffMember) =>
          s.name.includes('Tahir Ahmad Kumar') && s.qualifications.includes('M.Sc. Math')
        );

        if (hasOldPlaceholders || !hasSlot7Muzzaffer || !hasUpdatedTahir) {
          localStorage.setItem('pmshri_staff', JSON.stringify(INITIAL_STAFF_MEMBERS));
          return INITIAL_STAFF_MEMBERS;
        }
        return parsed;
      }
      return INITIAL_STAFF_MEMBERS;
    } catch {
      return INITIAL_STAFF_MEMBERS;
    }
  });

  const [facilities, setFacilities] = useState<FacilityItem[]>(() => {
    try {
      const saved = localStorage.getItem('pmshri_facilities');
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch {
      return INITIAL_FACILITIES;
    }
  });

  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    try {
      const saved = localStorage.getItem('pmshri_notices');
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  });

  const [indicators, setIndicators] = useState<QualityIndicator[]>(() => {
    try {
      const saved = localStorage.getItem('pmshri_indicators');
      return saved ? JSON.parse(saved) : INITIAL_QUALITY_INDICATORS;
    } catch {
      return INITIAL_QUALITY_INDICATORS;
    }
  });

  const [hoiMessage, setHoiMessage] = useState<string>(() => {
    return localStorage.getItem('pmshri_hoi_message') || INITIAL_SCHOOL_INFO.hoi.message;
  });

  const [hoiName, setHoiName] = useState<string>(() => {
    const saved = localStorage.getItem('pmshri_hoi_name');
    if (!saved || saved.includes('[Head of Institution') || saved.includes('[Headmaster')) {
      return INITIAL_SCHOOL_INFO.hoi.name;
    }
    return saved;
  });

  // UI state
  const [activeSection, setActiveSection] = useState<string>('home');
  const [adminOpen, setAdminOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('pmshri_staff', JSON.stringify(staffList));
  }, [staffList]);

  useEffect(() => {
    localStorage.setItem('pmshri_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('pmshri_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('pmshri_indicators', JSON.stringify(indicators));
  }, [indicators]);

  const handleUpdateHoi = (message: string, name: string) => {
    setHoiMessage(message);
    setHoiName(name);
    localStorage.setItem('pmshri_hoi_message', message);
    localStorage.setItem('pmshri_hoi_name', name);
  };

  const handleResetAll = () => {
    if (window.confirm("Reset all custom modifications to official school initial defaults?")) {
      setStaffList(INITIAL_STAFF_MEMBERS);
      setFacilities(INITIAL_FACILITIES);
      setNotices(INITIAL_NOTICES);
      setIndicators(INITIAL_QUALITY_INDICATORS);
      setHoiMessage(INITIAL_SCHOOL_INFO.hoi.message);
      setHoiName(INITIAL_SCHOOL_INFO.hoi.name);
      localStorage.clear();
      setAdminOpen(false);
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Font size scale class
  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-[0.92rem]';
    if (fontSize === 'lg') return 'text-[1.08rem]';
    return '';
  };

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-800 ${isHighContrast ? 'high-contrast' : ''} ${getFontSizeClass()}`}>
      
      {/* Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onToggleContrast={() => setIsHighContrast(!isHighContrast)}
        isHighContrast={isHighContrast}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          notices={notices}
          onSelectNotice={(notice) => setSelectedNotice(notice)}
        />

        {/* 2. About Our School & "In the Lap of Nature" */}
        <AboutSection
          onOpenAdmin={() => setAdminOpen(true)}
          hoiMessage={hoiMessage}
          hoiName={hoiName}
          annualPriorities={INITIAL_SCHOOL_INFO.hoi.annualPriorities}
        />

        {/* 3. Campus Infrastructure & Facilities */}
        <FacilitiesSection
          facilities={facilities}
          onOpenAdmin={() => setAdminOpen(true)}
          onEditFacility={(fac) => setAdminOpen(true)}
        />

        {/* 4. Academics & Learning Excellence */}
        <AcademicsSection />

        {/* 4b. JKBOSE Live Notice Board & Desk of Kashmir */}
        <JkboseNoticeBoard />

        {/* 5. Smart Classroom, ICT Lab & School Library */}
        <DigitalAndLibrarySection />

        {/* 6. "Beyond the Classroom" (10 Development Domains) */}
        <BeyondClassroomSection />

        {/* 7. PM SHRI School Development Dashboard (16 Domains) */}
        <PmShriDashboard
          indicators={indicators}
          onOpenAdmin={() => setAdminOpen(true)}
          onUpdateIndicator={(updated) => {
            setIndicators(indicators.map(i => i.id === updated.id ? updated : i));
          }}
        />

        {/* 8. Inclusion, CWSN & Student Safety */}
        <InclusionAndSafetySection />

        {/* 9. Leadership & 13 Staff Directory */}
        <StaffSection
          staffList={staffList}
          onOpenAdmin={() => setAdminOpen(true)}
          onEditStaff={() => setAdminOpen(true)}
        />

        {/* 10. Notices, Circulars & Announcements */}
        <NoticesSection
          notices={notices}
          onOpenAdmin={() => setAdminOpen(true)}
          onSelectNotice={(notice) => setSelectedNotice(notice)}
          selectedNotice={selectedNotice}
          onCloseNoticeModal={() => setSelectedNotice(null)}
        />

        {/* 11. Students & Parents Information Portal */}
        <StudentParentPortal />

        {/* 12. Green Chowgam Campus & Sustainability */}
        <GreenCampusSection />

        {/* 13. Photo Gallery & Campus Life */}
        <GallerySection />

        {/* 14. Contact & Admissions Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Staff Administrative Console Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        staffList={staffList}
        onUpdateStaff={setStaffList}
        notices={notices}
        onUpdateNotices={setNotices}
        facilities={facilities}
        onUpdateFacilities={setFacilities}
        hoiMessage={hoiMessage}
        hoiName={hoiName}
        onUpdateHoi={handleUpdateHoi}
        onResetAll={handleResetAll}
      />

      {/* Quick Search Spotlight Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        facilities={facilities}
        notices={notices}
        classes={ACADEMIC_CLASSES_DATA}
        onNavigate={handleNavigate}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
      />

    </div>
  );
}
