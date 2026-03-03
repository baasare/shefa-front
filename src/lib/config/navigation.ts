/**
 * Navigation Configuration
 * Defines navigation items for different sections of the app
 */

import { routes } from './routes';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

/**
 * Marketing site navigation (public header)
 */
export const marketingNav: NavItem[] = [
  {
    label: 'Features',
    href: routes.features,
    description: 'Explore our AI trading capabilities',
  },
  {
    label: 'Pricing',
    href: routes.pricing,
    description: 'Choose the right plan for you',
  },
  {
    label: 'About',
    href: routes.about,
    description: 'Learn more about ShefaFx',
  },
  {
    label: 'Blog',
    href: routes.blog,
    description: 'Trading insights and updates',
  },
  {
    label: 'Contact',
    href: routes.contact,
    description: 'Get in touch with us',
  },
];

/**
 * Dashboard sidebar navigation
 */
export const dashboardNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: routes.dashboard.home,
    icon: 'LayoutDashboard',
    description: 'Overview and insights',
  },
  {
    label: 'Portfolio',
    href: routes.dashboard.portfolio.index,
    icon: 'Briefcase',
    description: 'View your investments',
    children: [
      {
        label: 'Overview',
        href: routes.dashboard.portfolio.index,
      },
      {
        label: 'Positions',
        href: routes.dashboard.portfolio.positions,
      },
      {
        label: 'History',
        href: routes.dashboard.portfolio.history,
      },
      {
        label: 'Analytics',
        href: routes.dashboard.portfolio.analytics,
      },
    ],
  },
  {
    label: 'Strategies',
    href: routes.dashboard.strategies.index,
    icon: 'Target',
    description: 'Manage trading strategies',
    children: [
      {
        label: 'All Strategies',
        href: routes.dashboard.strategies.index,
      },
      {
        label: 'Create New',
        href: routes.dashboard.strategies.create,
      },
      {
        label: 'Templates',
        href: routes.dashboard.strategies.templates,
      },
      {
        label: 'Strategy Builder',
        href: routes.dashboard.strategies.builder,
      },
    ],
  },
  {
    label: 'AI Agents',
    href: routes.dashboard.agents.index,
    icon: 'Bot',
    description: 'Monitor agent activity',
    children: [
      {
        label: 'Activity Feed',
        href: routes.dashboard.agents.index,
      },
      {
        label: 'New Analysis',
        href: routes.dashboard.agents.analysis,
      },
      {
        label: 'Decisions',
        href: routes.dashboard.agents.decisions,
      },
      {
        label: 'Logs',
        href: routes.dashboard.agents.logs,
      },
    ],
  },
  {
    label: 'Orders',
    href: routes.dashboard.orders.index,
    icon: 'ShoppingCart',
    description: 'Manage orders',
    children: [
      {
        label: 'All Orders',
        href: routes.dashboard.orders.index,
      },
      {
        label: 'Pending',
        href: routes.dashboard.orders.pending,
      },
      {
        label: 'History',
        href: routes.dashboard.orders.history,
      },
    ],
  },
  {
    label: 'Approvals',
    href: routes.dashboard.approvals.index,
    icon: 'CheckCircle',
    description: 'Review pending approvals',
    badge: 'HITL',
  },
  {
    label: 'Market',
    href: routes.dashboard.market.index,
    icon: 'TrendingUp',
    description: 'Market data and analysis',
    children: [
      {
        label: 'Overview',
        href: routes.dashboard.market.index,
      },
      {
        label: 'Watchlist',
        href: routes.dashboard.market.watchlist,
      },
      {
        label: 'Screener',
        href: routes.dashboard.market.screener,
      },
    ],
  },
  {
    label: 'Education',
    href: routes.dashboard.education.index,
    icon: 'BookOpen',
    description: 'Learn trading strategies',
    children: [
      {
        label: 'Learning Center',
        href: routes.dashboard.education.index,
      },
      {
        label: 'Guides',
        href: routes.dashboard.education.guides,
      },
      {
        label: 'Tutorials',
        href: routes.dashboard.education.tutorials,
      },
      {
        label: 'Glossary',
        href: routes.dashboard.education.glossary,
      },
    ],
  },
];

/**
 * Dashboard header navigation (quick access)
 */
export const dashboardHeaderNav: NavItem[] = [
  {
    label: 'Notifications',
    href: routes.dashboard.notifications,
    icon: 'Bell',
  },
  {
    label: 'Help',
    href: routes.dashboard.help.index,
    icon: 'HelpCircle',
  },
  {
    label: 'Settings',
    href: routes.dashboard.settings.index,
    icon: 'Settings',
  },
];

/**
 * Settings navigation (sidebar in settings section)
 */
export const settingsNav: NavItem[] = [
  {
    label: 'Profile',
    href: routes.dashboard.settings.profile,
    icon: 'User',
    description: 'Manage your profile',
  },
  {
    label: 'Security',
    href: routes.dashboard.settings.security,
    icon: 'Shield',
    description: '2FA and security settings',
  },
  {
    label: 'Notifications',
    href: routes.dashboard.settings.notifications,
    icon: 'Bell',
    description: 'Email and push preferences',
  },
  {
    label: 'Billing',
    href: routes.dashboard.settings.billing,
    icon: 'CreditCard',
    description: 'Subscription and invoices',
  },
  {
    label: 'Brokers',
    href: routes.dashboard.settings.brokers,
    icon: 'Link',
    description: 'Connected broker accounts',
  },
  {
    label: 'API Keys',
    href: routes.dashboard.settings.apiKeys,
    icon: 'Key',
    description: 'Developer API access',
  },
];

/**
 * Admin navigation (for staff users)
 */
export const adminNav: NavItem[] = [
  {
    label: 'Users',
    href: routes.dashboard.admin.users,
    icon: 'Users',
    description: 'User management',
  },
  {
    label: 'Analytics',
    href: routes.dashboard.admin.analytics,
    icon: 'BarChart',
    description: 'Platform analytics',
  },
  {
    label: 'Monitoring',
    href: routes.dashboard.admin.monitoring,
    icon: 'Activity',
    description: 'System monitoring',
  },
];

/**
 * Footer navigation (marketing site)
 */
export const footerNav = {
  product: [
    { label: 'Features', href: routes.features },
    { label: 'Pricing', href: routes.pricing },
    { label: 'Demo', href: routes.demo },
    { label: 'Status', href: routes.status },
  ],
  company: [
    { label: 'About', href: routes.about },
    { label: 'Blog', href: routes.blog },
    { label: 'Contact', href: routes.contact },
  ],
  resources: [
    { label: 'Help Center', href: routes.dashboard.help.index },
    { label: 'FAQ', href: routes.dashboard.help.faq },
    { label: 'Support', href: routes.dashboard.help.support },
  ],
  legal: [
    { label: 'Terms of Service', href: routes.legal.terms },
    { label: 'Privacy Policy', href: routes.legal.privacy },
    { label: 'Risk Disclosures', href: routes.legal.disclosures },
  ],
};

/**
 * Mobile bottom navigation
 */
export const mobileBottomNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: routes.dashboard.home,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Portfolio',
    href: routes.dashboard.portfolio.index,
    icon: 'Briefcase',
  },
  {
    label: 'Approvals',
    href: routes.dashboard.approvals.index,
    icon: 'CheckCircle',
    badge: 'HITL',
  },
  {
    label: 'Market',
    href: routes.dashboard.market.index,
    icon: 'TrendingUp',
  },
  {
    label: 'More',
    href: routes.dashboard.settings.index,
    icon: 'Menu',
  },
];

/**
 * Onboarding stepper navigation
 */
export const onboardingSteps: NavItem[] = [
  {
    label: 'Welcome',
    href: routes.onboarding.welcome,
  },
  {
    label: 'Risk Profile',
    href: routes.onboarding.riskProfile,
  },
  {
    label: 'Connect Broker',
    href: routes.onboarding.connectBroker,
  },
  {
    label: 'Create Portfolio',
    href: routes.onboarding.createPortfolio,
  },
  {
    label: 'Create Strategy',
    href: routes.onboarding.createStrategy,
  },
  {
    label: 'Complete',
    href: routes.onboarding.complete,
  },
];
