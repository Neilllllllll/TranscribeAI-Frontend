import { useEffect, useState } from 'react';
import { MODULE_ROUTES } from '../routes.tsx';
import type { Module } from '../types/module.type.ts';

export function useGetCurrentMode() {
  // 1. On initialise avec le mode correspondant à l'URL actuelle (ou undefined)
  const [mode, setMode] = useState<Module | undefined>(() => 
    MODULE_ROUTES.find(route => route.fullPath === window.location.pathname)
  );

  const currentPath = window.location.pathname;

  useEffect(() => {
    // 2. On cherche la route correspondante
    const activeRoute = MODULE_ROUTES.find((route) => route.fullPath === currentPath);
    
    if (activeRoute) {
      setMode(activeRoute);
    }
  }, [currentPath]);

  return mode; // 3. On retourne l'objet complet pour l'utiliser dans les composants
}