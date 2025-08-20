import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
 
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard'
    
  },

  {
    displayName: 'Gestion des utilisateurs',
    iconName: 'user-plus',
    route: '/back-office/user-list',
    
  },
  {
    displayName: 'Demande des formations',
    iconName: 'layout-navbar-expand',
    route: '/back-office/excel-list',
    
  },
  {
    displayName: 'Gestion des Actualités',
    iconName: 'list',
    route: '/back-office/actualite-list'
   
  },
  {
    displayName: 'Gestion des Formations',
    iconName: 'poker-chip',
    route: '/back-office/formation-list'
   
  },
  {
    displayName: 'Gestion des demandes',
    iconName: 'tooltip',
    route: '/back-office/demande-list'
    
  },
    {
    displayName: 'Affecter une formation',
    iconName: 'user-plus',
    route: '/back-office/Affectation-list'
    
  },
   {
    displayName: 'Gestion des presences',
    iconName: 'mood-smile',
    route: '/back-office/presence-list'
    
  },
  {
    displayName: 'Progression',
    iconName: 'mood-smile',
    route: '/back-office/progression-collaborateurs'
  
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  }
    // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
