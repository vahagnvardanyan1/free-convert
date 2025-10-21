import { useState, useEffect, useCallback } from 'react';

interface UseDropdownsReturn {
  openDropdowns: Record<string, boolean>;
  isOpen: (name: string) => boolean;
  open: (name: string) => void;
  close: (name: string) => void;
  toggle: (name: string) => void;
  closeAll: () => void;
}

export const useDropdowns = (): UseDropdownsReturn => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const isOpen = useCallback((name: string) => openDropdowns[name] || false, [openDropdowns]);

  const open = useCallback((name: string) => {
    setOpenDropdowns(prev => ({ ...prev, [name]: true }));
  }, []);

  const close = useCallback((name: string) => {
    setOpenDropdowns(prev => ({ ...prev, [name]: false }));
  }, []);

  const toggle = useCallback((name: string) => {
    setOpenDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const closeAll = useCallback(() => {
    setOpenDropdowns({});
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAll]);

  return {
    openDropdowns,
    isOpen,
    open,
    close,
    toggle,
    closeAll,
  };
};
