/**
 * Application Routes Configuration
 * Centralized route definitions for the ShefaFx platform
 */

export const routes = {
  // Public routes
  home: '/',
  features: '/features',
  pricing: '/pricing',
  about: '/about',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  contact: '/contact',
  demo: '/demo',
  waitlist: '/waitlist',

  // Legal routes
  legal: {
    terms: '/legal/terms',
    privacy: '/legal/privacy',
    disclosures: '/legal/disclosures',
  },

  // Auth routes
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    verifyEmail: '/verify-email',
    confirmEmail: (key: string) => `/confirm-email/${key}`,
    callback: '/callback',
  },

  // Onboarding routes
  onboarding: {
    welcome: '/welcome',
    riskProfile: '/risk-profile',
    connectBroker: '/connect-broker',
    createPortfolio: '/create-portfolio',
    createStrategy: '/create-strategy',
    complete: '/complete',
  },

  // Dashboard routes
  dashboard: {
    home: '/dashboard',

    portfolio: {
      index: '/portfolio',
      detail: (id: string) => `/portfolio/${id}`,
      positions: '/portfolio/positions',
      history: '/portfolio/history',
      analytics: '/portfolio/analytics',
    },

    strategies: {
      index: '/strategies',
      create: '/strategies/create',
      templates: '/strategies/templates',
      builder: '/strategies/builder',
      detail: (id: string) => `/strategies/${id}`,
      edit: (id: string) => `/strategies/${id}/edit`,
      backtest: (id: string) => `/strategies/${id}/backtest`,
      performance: (id: string) => `/strategies/${id}/performance`,
    },

    agents: {
      index: '/agents',
      create: '/agents/create',
      detail: (id: string) => `/agents/${id}`,
      edit: (id: string) => `/agents/${id}/edit`,
      statistics: (id: string) => `/agents/${id}/statistics`,
      consensus: '/agents/consensus',
      analysis: '/agents/analysis',
      decisions: '/agents/decisions',
      logs: '/agents/logs',
    },

    orders: {
      index: '/orders',
      pending: '/orders/pending',
      history: '/orders/history',
      detail: (id: string) => `/orders/${id}`,
    },

    approvals: {
      index: '/approvals',
      detail: (id: string) => `/approvals/${id}`,
    },

    market: {
      index: '/market',
      watchlist: '/market/watchlist',
      stock: (symbol: string) => `/market/stocks/${symbol}`,
      screener: '/market/screener',
    },

    education: {
      index: '/education',
      guides: '/education/guides',
      tutorials: '/education/tutorials',
      glossary: '/education/glossary',
    },

    settings: {
      index: '/settings',
      profile: '/settings/profile',
      security: '/settings/security',
      notifications: '/settings/notifications',
      billing: '/settings/billing',
      brokers: '/settings/brokers',
      apiKeys: '/settings/api-keys',
    },

    notifications: '/notifications',

    help: {
      index: '/help',
      support: '/help/support',
      faq: '/help/faq',
    },

    admin: {
      users: '/admin/users',
      analytics: '/admin/analytics',
      monitoring: '/admin/monitoring',
    },
  },

  // System routes
  status: '/status',
  maintenance: '/maintenance',
} as const;

/**
 * Public routes that don't require authentication
 */
export const publicRoutes = [
  routes.home,
  routes.features,
  routes.pricing,
  routes.about,
  routes.blog,
  routes.contact,
  routes.demo,
  routes.waitlist,
  routes.legal.terms,
  routes.legal.privacy,
  routes.legal.disclosures,
  routes.auth.login,
  routes.auth.register,
  routes.auth.forgotPassword,
  routes.auth.resetPassword,
  routes.auth.verifyEmail,
  routes.auth.callback,
  routes.status,
  routes.maintenance,
];

/**
 * Onboarding routes - require auth but not complete onboarding
 */
export const onboardingRoutes = [
  routes.onboarding.welcome,
  routes.onboarding.riskProfile,
  routes.onboarding.connectBroker,
  routes.onboarding.createPortfolio,
  routes.onboarding.createStrategy,
  routes.onboarding.complete,
];

/**
 * Admin routes - require admin role
 */
export const adminRoutes = [
  routes.dashboard.admin.users,
  routes.dashboard.admin.analytics,
  routes.dashboard.admin.monitoring,
];
