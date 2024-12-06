/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedRouteImport } from './routes/_protected/route'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as ProtectedSocialRouteImport } from './routes/_protected/social/route'
import { Route as ProtectedSocialIndexImport } from './routes/_protected/social/index'
import { Route as ProtectedAnimeIndexImport } from './routes/_protected/anime/index'
import { Route as AuthSignupIndexImport } from './routes/_auth/signup/index'
import { Route as AuthLoginIndexImport } from './routes/_auth/login/index'
import { Route as AuthDetachedModeIndexImport } from './routes/_auth/detached-mode/index'
import { Route as ProtectedSocialSearchRouteImport } from './routes/_protected/social/search/route'
import { Route as ProtectedSocialUserNameRouteImport } from './routes/_protected/social/$userName/route'
import { Route as ProtectedSocialSearchIndexImport } from './routes/_protected/social/search/index'
import { Route as ProtectedSocialUserNameIndexImport } from './routes/_protected/social/$userName/index'
import { Route as ProtectedAnimeCatalogIndexImport } from './routes/_protected/anime/catalog/index'
import { Route as ProtectedAnimeAnimeIdIndexImport } from './routes/_protected/anime/$animeId/index'
import { Route as AuthSignupVerifyEmailIndexImport } from './routes/_auth/signup/verify-email/index'
import { Route as AuthLoginForgotPasswordIndexImport } from './routes/_auth/login/forgot-password/index'
import { Route as ProtectedSocialSearchPostsIndexImport } from './routes/_protected/social/search/posts/index'
import { Route as ProtectedSocialSearchPeopleIndexImport } from './routes/_protected/social/search/people/index'
import { Route as ProtectedSocialUserNamePostIndexImport } from './routes/_protected/social/$userName_/post/index'
import { Route as ProtectedSocialUserNameCollectionsIndexImport } from './routes/_protected/social/$userName/collections/index'
import { Route as ProtectedAnimeAnimeIdWatchIndexImport } from './routes/_protected/anime/$animeId/watch/index'
import { Route as AuthLoginForgotPasswordVerifyEmailIndexImport } from './routes/_auth/login/forgot-password/verify-email/index'
import { Route as AuthLoginForgotPasswordFindAccountIndexImport } from './routes/_auth/login/forgot-password/find-account/index'
import { Route as AuthLoginForgotPasswordChangePasswordIndexImport } from './routes/_auth/login/forgot-password/change-password/index'
import { Route as ProtectedSocialUserNamePostPostIdIndexImport } from './routes/_protected/social/$userName_/post/$postId/index'
import { Route as ProtectedSocialUserNameCollectionsCollectionIdIndexImport } from './routes/_protected/social/$userName_/collections/$collectionId/index'

// Create/Update Routes

const ProtectedRouteRoute = ProtectedRouteImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedSocialRouteRoute = ProtectedSocialRouteImport.update({
  path: '/social',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedSocialIndexRoute = ProtectedSocialIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedSocialRouteRoute,
} as any)

const ProtectedAnimeIndexRoute = ProtectedAnimeIndexImport.update({
  path: '/anime/',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const AuthSignupIndexRoute = AuthSignupIndexImport.update({
  path: '/signup/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthDetachedModeIndexRoute = AuthDetachedModeIndexImport.update({
  path: '/detached-mode/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const ProtectedSocialSearchRouteRoute = ProtectedSocialSearchRouteImport.update(
  {
    path: '/search',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any,
)

const ProtectedSocialUserNameRouteRoute =
  ProtectedSocialUserNameRouteImport.update({
    path: '/$userName',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

const ProtectedSocialSearchIndexRoute = ProtectedSocialSearchIndexImport.update(
  {
    path: '/',
    getParentRoute: () => ProtectedSocialSearchRouteRoute,
  } as any,
)

const ProtectedSocialUserNameIndexRoute =
  ProtectedSocialUserNameIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedSocialUserNameRouteRoute,
  } as any)

const ProtectedAnimeCatalogIndexRoute = ProtectedAnimeCatalogIndexImport.update(
  {
    path: '/anime/catalog/',
    getParentRoute: () => ProtectedRouteRoute,
  } as any,
)

const ProtectedAnimeAnimeIdIndexRoute = ProtectedAnimeAnimeIdIndexImport.update(
  {
    path: '/anime/$animeId/',
    getParentRoute: () => ProtectedRouteRoute,
  } as any,
)

const AuthSignupVerifyEmailIndexRoute = AuthSignupVerifyEmailIndexImport.update(
  {
    path: '/signup/verify-email/',
    getParentRoute: () => AuthRouteRoute,
  } as any,
)

const AuthLoginForgotPasswordIndexRoute =
  AuthLoginForgotPasswordIndexImport.update({
    path: '/login/forgot-password/',
    getParentRoute: () => AuthRouteRoute,
  } as any)

const ProtectedSocialSearchPostsIndexRoute =
  ProtectedSocialSearchPostsIndexImport.update({
    path: '/posts/',
    getParentRoute: () => ProtectedSocialSearchRouteRoute,
  } as any)

const ProtectedSocialSearchPeopleIndexRoute =
  ProtectedSocialSearchPeopleIndexImport.update({
    path: '/people/',
    getParentRoute: () => ProtectedSocialSearchRouteRoute,
  } as any)

const ProtectedSocialUserNamePostIndexRoute =
  ProtectedSocialUserNamePostIndexImport.update({
    path: '/$userName/post/',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

const ProtectedSocialUserNameCollectionsIndexRoute =
  ProtectedSocialUserNameCollectionsIndexImport.update({
    path: '/collections/',
    getParentRoute: () => ProtectedSocialUserNameRouteRoute,
  } as any)

const ProtectedAnimeAnimeIdWatchIndexRoute =
  ProtectedAnimeAnimeIdWatchIndexImport.update({
    path: '/anime/$animeId/watch/',
    getParentRoute: () => ProtectedRouteRoute,
  } as any)

const AuthLoginForgotPasswordVerifyEmailIndexRoute =
  AuthLoginForgotPasswordVerifyEmailIndexImport.update({
    path: '/login/forgot-password/verify-email/',
    getParentRoute: () => AuthRouteRoute,
  } as any)

const AuthLoginForgotPasswordFindAccountIndexRoute =
  AuthLoginForgotPasswordFindAccountIndexImport.update({
    path: '/login/forgot-password/find-account/',
    getParentRoute: () => AuthRouteRoute,
  } as any)

const AuthLoginForgotPasswordChangePasswordIndexRoute =
  AuthLoginForgotPasswordChangePasswordIndexImport.update({
    path: '/login/forgot-password/change-password/',
    getParentRoute: () => AuthRouteRoute,
  } as any)

const ProtectedSocialUserNamePostPostIdIndexRoute =
  ProtectedSocialUserNamePostPostIdIndexImport.update({
    path: '/$userName/post/$postId/',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

const ProtectedSocialUserNameCollectionsCollectionIdIndexRoute =
  ProtectedSocialUserNameCollectionsCollectionIdIndexImport.update({
    path: '/$userName/collections/$collectionId/',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRoute
    }
    '/_protected/social': {
      id: '/_protected/social'
      path: '/social'
      fullPath: '/social'
      preLoaderRoute: typeof ProtectedSocialRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/social/$userName': {
      id: '/_protected/social/$userName'
      path: '/$userName'
      fullPath: '/social/$userName'
      preLoaderRoute: typeof ProtectedSocialUserNameRouteImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_protected/social/search': {
      id: '/_protected/social/search'
      path: '/search'
      fullPath: '/social/search'
      preLoaderRoute: typeof ProtectedSocialSearchRouteImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_auth/detached-mode/': {
      id: '/_auth/detached-mode/'
      path: '/detached-mode'
      fullPath: '/detached-mode'
      preLoaderRoute: typeof AuthDetachedModeIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/login/': {
      id: '/_auth/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/signup/': {
      id: '/_auth/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_protected/anime/': {
      id: '/_protected/anime/'
      path: '/anime'
      fullPath: '/anime'
      preLoaderRoute: typeof ProtectedAnimeIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/social/': {
      id: '/_protected/social/'
      path: '/'
      fullPath: '/social/'
      preLoaderRoute: typeof ProtectedSocialIndexImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_auth/login/forgot-password/': {
      id: '/_auth/login/forgot-password/'
      path: '/login/forgot-password'
      fullPath: '/login/forgot-password'
      preLoaderRoute: typeof AuthLoginForgotPasswordIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/signup/verify-email/': {
      id: '/_auth/signup/verify-email/'
      path: '/signup/verify-email'
      fullPath: '/signup/verify-email'
      preLoaderRoute: typeof AuthSignupVerifyEmailIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_protected/anime/$animeId/': {
      id: '/_protected/anime/$animeId/'
      path: '/anime/$animeId'
      fullPath: '/anime/$animeId'
      preLoaderRoute: typeof ProtectedAnimeAnimeIdIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/anime/catalog/': {
      id: '/_protected/anime/catalog/'
      path: '/anime/catalog'
      fullPath: '/anime/catalog'
      preLoaderRoute: typeof ProtectedAnimeCatalogIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/social/$userName/': {
      id: '/_protected/social/$userName/'
      path: '/'
      fullPath: '/social/$userName/'
      preLoaderRoute: typeof ProtectedSocialUserNameIndexImport
      parentRoute: typeof ProtectedSocialUserNameRouteImport
    }
    '/_protected/social/search/': {
      id: '/_protected/social/search/'
      path: '/'
      fullPath: '/social/search/'
      preLoaderRoute: typeof ProtectedSocialSearchIndexImport
      parentRoute: typeof ProtectedSocialSearchRouteImport
    }
    '/_auth/login/forgot-password/change-password/': {
      id: '/_auth/login/forgot-password/change-password/'
      path: '/login/forgot-password/change-password'
      fullPath: '/login/forgot-password/change-password'
      preLoaderRoute: typeof AuthLoginForgotPasswordChangePasswordIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/login/forgot-password/find-account/': {
      id: '/_auth/login/forgot-password/find-account/'
      path: '/login/forgot-password/find-account'
      fullPath: '/login/forgot-password/find-account'
      preLoaderRoute: typeof AuthLoginForgotPasswordFindAccountIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/login/forgot-password/verify-email/': {
      id: '/_auth/login/forgot-password/verify-email/'
      path: '/login/forgot-password/verify-email'
      fullPath: '/login/forgot-password/verify-email'
      preLoaderRoute: typeof AuthLoginForgotPasswordVerifyEmailIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_protected/anime/$animeId/watch/': {
      id: '/_protected/anime/$animeId/watch/'
      path: '/anime/$animeId/watch'
      fullPath: '/anime/$animeId/watch'
      preLoaderRoute: typeof ProtectedAnimeAnimeIdWatchIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/social/$userName/collections/': {
      id: '/_protected/social/$userName/collections/'
      path: '/collections'
      fullPath: '/social/$userName/collections'
      preLoaderRoute: typeof ProtectedSocialUserNameCollectionsIndexImport
      parentRoute: typeof ProtectedSocialUserNameRouteImport
    }
    '/_protected/social/$userName/post/': {
      id: '/_protected/social/$userName/post/'
      path: '/$userName/post'
      fullPath: '/social/$userName/post'
      preLoaderRoute: typeof ProtectedSocialUserNamePostIndexImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_protected/social/search/people/': {
      id: '/_protected/social/search/people/'
      path: '/people'
      fullPath: '/social/search/people'
      preLoaderRoute: typeof ProtectedSocialSearchPeopleIndexImport
      parentRoute: typeof ProtectedSocialSearchRouteImport
    }
    '/_protected/social/search/posts/': {
      id: '/_protected/social/search/posts/'
      path: '/posts'
      fullPath: '/social/search/posts'
      preLoaderRoute: typeof ProtectedSocialSearchPostsIndexImport
      parentRoute: typeof ProtectedSocialSearchRouteImport
    }
    '/_protected/social/$userName/collections/$collectionId/': {
      id: '/_protected/social/$userName/collections/$collectionId/'
      path: '/$userName/collections/$collectionId'
      fullPath: '/social/$userName/collections/$collectionId'
      preLoaderRoute: typeof ProtectedSocialUserNameCollectionsCollectionIdIndexImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_protected/social/$userName/post/$postId/': {
      id: '/_protected/social/$userName/post/$postId/'
      path: '/$userName/post/$postId'
      fullPath: '/social/$userName/post/$postId'
      preLoaderRoute: typeof ProtectedSocialUserNamePostPostIdIndexImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRouteRoute: AuthRouteRoute.addChildren({
    AuthDetachedModeIndexRoute,
    AuthLoginIndexRoute,
    AuthSignupIndexRoute,
    AuthLoginForgotPasswordIndexRoute,
    AuthSignupVerifyEmailIndexRoute,
    AuthLoginForgotPasswordChangePasswordIndexRoute,
    AuthLoginForgotPasswordFindAccountIndexRoute,
    AuthLoginForgotPasswordVerifyEmailIndexRoute,
  }),
  ProtectedRouteRoute: ProtectedRouteRoute.addChildren({
    ProtectedSocialRouteRoute: ProtectedSocialRouteRoute.addChildren({
      ProtectedSocialUserNameRouteRoute:
        ProtectedSocialUserNameRouteRoute.addChildren({
          ProtectedSocialUserNameIndexRoute,
          ProtectedSocialUserNameCollectionsIndexRoute,
        }),
      ProtectedSocialSearchRouteRoute:
        ProtectedSocialSearchRouteRoute.addChildren({
          ProtectedSocialSearchIndexRoute,
          ProtectedSocialSearchPeopleIndexRoute,
          ProtectedSocialSearchPostsIndexRoute,
        }),
      ProtectedSocialIndexRoute,
      ProtectedSocialUserNamePostIndexRoute,
      ProtectedSocialUserNameCollectionsCollectionIdIndexRoute,
      ProtectedSocialUserNamePostPostIdIndexRoute,
    }),
    ProtectedAnimeIndexRoute,
    ProtectedAnimeAnimeIdIndexRoute,
    ProtectedAnimeCatalogIndexRoute,
    ProtectedAnimeAnimeIdWatchIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_protected"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/detached-mode/",
        "/_auth/login/",
        "/_auth/signup/",
        "/_auth/login/forgot-password/",
        "/_auth/signup/verify-email/",
        "/_auth/login/forgot-password/change-password/",
        "/_auth/login/forgot-password/find-account/",
        "/_auth/login/forgot-password/verify-email/"
      ]
    },
    "/_protected": {
      "filePath": "_protected/route.tsx",
      "children": [
        "/_protected/social",
        "/_protected/anime/",
        "/_protected/anime/$animeId/",
        "/_protected/anime/catalog/",
        "/_protected/anime/$animeId/watch/"
      ]
    },
    "/_protected/social": {
      "filePath": "_protected/social/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/social/$userName",
        "/_protected/social/search",
        "/_protected/social/",
        "/_protected/social/$userName/post/",
        "/_protected/social/$userName/collections/$collectionId/",
        "/_protected/social/$userName/post/$postId/"
      ]
    },
    "/_protected/social/$userName": {
      "filePath": "_protected/social/$userName/route.tsx",
      "parent": "/_protected/social",
      "children": [
        "/_protected/social/$userName/",
        "/_protected/social/$userName/collections/"
      ]
    },
    "/_protected/social/search": {
      "filePath": "_protected/social/search/route.tsx",
      "parent": "/_protected/social",
      "children": [
        "/_protected/social/search/",
        "/_protected/social/search/people/",
        "/_protected/social/search/posts/"
      ]
    },
    "/_auth/detached-mode/": {
      "filePath": "_auth/detached-mode/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/login/": {
      "filePath": "_auth/login/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup/": {
      "filePath": "_auth/signup/index.tsx",
      "parent": "/_auth"
    },
    "/_protected/anime/": {
      "filePath": "_protected/anime/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/social/": {
      "filePath": "_protected/social/index.tsx",
      "parent": "/_protected/social"
    },
    "/_auth/login/forgot-password/": {
      "filePath": "_auth/login/forgot-password/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup/verify-email/": {
      "filePath": "_auth/signup/verify-email/index.tsx",
      "parent": "/_auth"
    },
    "/_protected/anime/$animeId/": {
      "filePath": "_protected/anime/$animeId/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/anime/catalog/": {
      "filePath": "_protected/anime/catalog/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/social/$userName/": {
      "filePath": "_protected/social/$userName/index.tsx",
      "parent": "/_protected/social/$userName"
    },
    "/_protected/social/search/": {
      "filePath": "_protected/social/search/index.tsx",
      "parent": "/_protected/social/search"
    },
    "/_auth/login/forgot-password/change-password/": {
      "filePath": "_auth/login/forgot-password/change-password/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/login/forgot-password/find-account/": {
      "filePath": "_auth/login/forgot-password/find-account/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/login/forgot-password/verify-email/": {
      "filePath": "_auth/login/forgot-password/verify-email/index.tsx",
      "parent": "/_auth"
    },
    "/_protected/anime/$animeId/watch/": {
      "filePath": "_protected/anime/$animeId/watch/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/social/$userName/collections/": {
      "filePath": "_protected/social/$userName/collections/index.tsx",
      "parent": "/_protected/social/$userName"
    },
    "/_protected/social/$userName/post/": {
      "filePath": "_protected/social/$userName_/post/index.tsx",
      "parent": "/_protected/social"
    },
    "/_protected/social/search/people/": {
      "filePath": "_protected/social/search/people/index.tsx",
      "parent": "/_protected/social/search"
    },
    "/_protected/social/search/posts/": {
      "filePath": "_protected/social/search/posts/index.tsx",
      "parent": "/_protected/social/search"
    },
    "/_protected/social/$userName/collections/$collectionId/": {
      "filePath": "_protected/social/$userName_/collections/$collectionId/index.tsx",
      "parent": "/_protected/social"
    },
    "/_protected/social/$userName/post/$postId/": {
      "filePath": "_protected/social/$userName_/post/$postId/index.tsx",
      "parent": "/_protected/social"
    }
  }
}
ROUTE_MANIFEST_END */
