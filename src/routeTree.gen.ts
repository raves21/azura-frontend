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
import { Route as ProtectedTvRouteImport } from './routes/_protected/tv/route'
import { Route as ProtectedSocialRouteImport } from './routes/_protected/social/route'
import { Route as ProtectedMovieRouteImport } from './routes/_protected/movie/route'
import { Route as ProtectedAnimeRouteImport } from './routes/_protected/anime/route'
import { Route as ProtectedTvIndexImport } from './routes/_protected/tv/index'
import { Route as ProtectedSocialIndexImport } from './routes/_protected/social/index'
import { Route as ProtectedMovieIndexImport } from './routes/_protected/movie/index'
import { Route as ProtectedAnimeIndexImport } from './routes/_protected/anime/index'
import { Route as AuthSignupIndexImport } from './routes/_auth/signup/index'
import { Route as AuthLoginIndexImport } from './routes/_auth/login/index'
import { Route as AuthDetachedModeIndexImport } from './routes/_auth/detached-mode/index'
import { Route as ProtectedSocialSearchRouteImport } from './routes/_protected/social/search/route'
import { Route as ProtectedSocialUserHandleRouteImport } from './routes/_protected/social/$userHandle/route'
import { Route as ProtectedTvCatalogIndexImport } from './routes/_protected/tv/catalog/index'
import { Route as ProtectedTvTvIdIndexImport } from './routes/_protected/tv/$tvId/index'
import { Route as ProtectedSocialSearchIndexImport } from './routes/_protected/social/search/index'
import { Route as ProtectedSocialUserHandleIndexImport } from './routes/_protected/social/$userHandle/index'
import { Route as ProtectedMovieCatalogIndexImport } from './routes/_protected/movie/catalog/index'
import { Route as ProtectedMovieMovieIdIndexImport } from './routes/_protected/movie/$movieId/index'
import { Route as ProtectedAnimeCatalogIndexImport } from './routes/_protected/anime/catalog/index'
import { Route as ProtectedAnimeAnimeIdIndexImport } from './routes/_protected/anime/$animeId/index'
import { Route as AuthSignupVerifyEmailIndexImport } from './routes/_auth/signup/verify-email/index'
import { Route as AuthLoginForgotPasswordIndexImport } from './routes/_auth/login/forgot-password/index'
import { Route as ProtectedTvCatalogSearchIndexImport } from './routes/_protected/tv/catalog/search/index'
import { Route as ProtectedTvTvIdWatchIndexImport } from './routes/_protected/tv/$tvId/watch/index'
import { Route as ProtectedSocialSearchPostsIndexImport } from './routes/_protected/social/search/posts/index'
import { Route as ProtectedSocialSearchPeopleIndexImport } from './routes/_protected/social/search/people/index'
import { Route as ProtectedSocialUserHandlePostsIndexImport } from './routes/_protected/social/$userHandle_/posts/index'
import { Route as ProtectedSocialUserHandleCollectionsIndexImport } from './routes/_protected/social/$userHandle/collections/index'
import { Route as ProtectedMovieCatalogSearchIndexImport } from './routes/_protected/movie/catalog/search/index'
import { Route as ProtectedMovieMovieIdWatchIndexImport } from './routes/_protected/movie/$movieId/watch/index'
import { Route as ProtectedAnimeAnimeIdWatchIndexImport } from './routes/_protected/anime/$animeId/watch/index'
import { Route as AuthLoginForgotPasswordVerifyEmailIndexImport } from './routes/_auth/login/forgot-password/verify-email/index'
import { Route as AuthLoginForgotPasswordFindAccountIndexImport } from './routes/_auth/login/forgot-password/find-account/index'
import { Route as AuthLoginForgotPasswordChangePasswordIndexImport } from './routes/_auth/login/forgot-password/change-password/index'
import { Route as ProtectedSocialUserHandlePostsPostIdIndexImport } from './routes/_protected/social/$userHandle_/posts/$postId/index'
import { Route as ProtectedSocialUserHandleCollectionsCollectionIdIndexImport } from './routes/_protected/social/$userHandle_/collections/$collectionId/index'

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

const ProtectedTvRouteRoute = ProtectedTvRouteImport.update({
  path: '/tv',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedSocialRouteRoute = ProtectedSocialRouteImport.update({
  path: '/social',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedMovieRouteRoute = ProtectedMovieRouteImport.update({
  path: '/movie',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedAnimeRouteRoute = ProtectedAnimeRouteImport.update({
  path: '/anime',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedTvIndexRoute = ProtectedTvIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedTvRouteRoute,
} as any)

const ProtectedSocialIndexRoute = ProtectedSocialIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedSocialRouteRoute,
} as any)

const ProtectedMovieIndexRoute = ProtectedMovieIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedMovieRouteRoute,
} as any)

const ProtectedAnimeIndexRoute = ProtectedAnimeIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedAnimeRouteRoute,
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

const ProtectedSocialUserHandleRouteRoute =
  ProtectedSocialUserHandleRouteImport.update({
    path: '/$userHandle',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

const ProtectedTvCatalogIndexRoute = ProtectedTvCatalogIndexImport.update({
  path: '/catalog/',
  getParentRoute: () => ProtectedTvRouteRoute,
} as any)

const ProtectedTvTvIdIndexRoute = ProtectedTvTvIdIndexImport.update({
  path: '/$tvId/',
  getParentRoute: () => ProtectedTvRouteRoute,
} as any)

const ProtectedSocialSearchIndexRoute = ProtectedSocialSearchIndexImport.update(
  {
    path: '/',
    getParentRoute: () => ProtectedSocialSearchRouteRoute,
  } as any,
)

const ProtectedSocialUserHandleIndexRoute =
  ProtectedSocialUserHandleIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedSocialUserHandleRouteRoute,
  } as any)

const ProtectedMovieCatalogIndexRoute = ProtectedMovieCatalogIndexImport.update(
  {
    path: '/catalog/',
    getParentRoute: () => ProtectedMovieRouteRoute,
  } as any,
)

const ProtectedMovieMovieIdIndexRoute = ProtectedMovieMovieIdIndexImport.update(
  {
    path: '/$movieId/',
    getParentRoute: () => ProtectedMovieRouteRoute,
  } as any,
)

const ProtectedAnimeCatalogIndexRoute = ProtectedAnimeCatalogIndexImport.update(
  {
    path: '/catalog/',
    getParentRoute: () => ProtectedAnimeRouteRoute,
  } as any,
)

const ProtectedAnimeAnimeIdIndexRoute = ProtectedAnimeAnimeIdIndexImport.update(
  {
    path: '/$animeId/',
    getParentRoute: () => ProtectedAnimeRouteRoute,
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

const ProtectedTvCatalogSearchIndexRoute =
  ProtectedTvCatalogSearchIndexImport.update({
    path: '/catalog/search/',
    getParentRoute: () => ProtectedTvRouteRoute,
  } as any)

const ProtectedTvTvIdWatchIndexRoute = ProtectedTvTvIdWatchIndexImport.update({
  path: '/$tvId/watch/',
  getParentRoute: () => ProtectedTvRouteRoute,
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

const ProtectedSocialUserHandlePostsIndexRoute =
  ProtectedSocialUserHandlePostsIndexImport.update({
    path: '/$userHandle/posts/',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

const ProtectedSocialUserHandleCollectionsIndexRoute =
  ProtectedSocialUserHandleCollectionsIndexImport.update({
    path: '/collections/',
    getParentRoute: () => ProtectedSocialUserHandleRouteRoute,
  } as any)

const ProtectedMovieCatalogSearchIndexRoute =
  ProtectedMovieCatalogSearchIndexImport.update({
    path: '/catalog/search/',
    getParentRoute: () => ProtectedMovieRouteRoute,
  } as any)

const ProtectedMovieMovieIdWatchIndexRoute =
  ProtectedMovieMovieIdWatchIndexImport.update({
    path: '/$movieId/watch/',
    getParentRoute: () => ProtectedMovieRouteRoute,
  } as any)

const ProtectedAnimeAnimeIdWatchIndexRoute =
  ProtectedAnimeAnimeIdWatchIndexImport.update({
    path: '/$animeId/watch/',
    getParentRoute: () => ProtectedAnimeRouteRoute,
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

const ProtectedSocialUserHandlePostsPostIdIndexRoute =
  ProtectedSocialUserHandlePostsPostIdIndexImport.update({
    path: '/$userHandle/posts/$postId/',
    getParentRoute: () => ProtectedSocialRouteRoute,
  } as any)

const ProtectedSocialUserHandleCollectionsCollectionIdIndexRoute =
  ProtectedSocialUserHandleCollectionsCollectionIdIndexImport.update({
    path: '/$userHandle/collections/$collectionId/',
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
    '/_protected/anime': {
      id: '/_protected/anime'
      path: '/anime'
      fullPath: '/anime'
      preLoaderRoute: typeof ProtectedAnimeRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/movie': {
      id: '/_protected/movie'
      path: '/movie'
      fullPath: '/movie'
      preLoaderRoute: typeof ProtectedMovieRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/social': {
      id: '/_protected/social'
      path: '/social'
      fullPath: '/social'
      preLoaderRoute: typeof ProtectedSocialRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/tv': {
      id: '/_protected/tv'
      path: '/tv'
      fullPath: '/tv'
      preLoaderRoute: typeof ProtectedTvRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/social/$userHandle': {
      id: '/_protected/social/$userHandle'
      path: '/$userHandle'
      fullPath: '/social/$userHandle'
      preLoaderRoute: typeof ProtectedSocialUserHandleRouteImport
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
      path: '/'
      fullPath: '/anime/'
      preLoaderRoute: typeof ProtectedAnimeIndexImport
      parentRoute: typeof ProtectedAnimeRouteImport
    }
    '/_protected/movie/': {
      id: '/_protected/movie/'
      path: '/'
      fullPath: '/movie/'
      preLoaderRoute: typeof ProtectedMovieIndexImport
      parentRoute: typeof ProtectedMovieRouteImport
    }
    '/_protected/social/': {
      id: '/_protected/social/'
      path: '/'
      fullPath: '/social/'
      preLoaderRoute: typeof ProtectedSocialIndexImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_protected/tv/': {
      id: '/_protected/tv/'
      path: '/'
      fullPath: '/tv/'
      preLoaderRoute: typeof ProtectedTvIndexImport
      parentRoute: typeof ProtectedTvRouteImport
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
      path: '/$animeId'
      fullPath: '/anime/$animeId'
      preLoaderRoute: typeof ProtectedAnimeAnimeIdIndexImport
      parentRoute: typeof ProtectedAnimeRouteImport
    }
    '/_protected/anime/catalog/': {
      id: '/_protected/anime/catalog/'
      path: '/catalog'
      fullPath: '/anime/catalog'
      preLoaderRoute: typeof ProtectedAnimeCatalogIndexImport
      parentRoute: typeof ProtectedAnimeRouteImport
    }
    '/_protected/movie/$movieId/': {
      id: '/_protected/movie/$movieId/'
      path: '/$movieId'
      fullPath: '/movie/$movieId'
      preLoaderRoute: typeof ProtectedMovieMovieIdIndexImport
      parentRoute: typeof ProtectedMovieRouteImport
    }
    '/_protected/movie/catalog/': {
      id: '/_protected/movie/catalog/'
      path: '/catalog'
      fullPath: '/movie/catalog'
      preLoaderRoute: typeof ProtectedMovieCatalogIndexImport
      parentRoute: typeof ProtectedMovieRouteImport
    }
    '/_protected/social/$userHandle/': {
      id: '/_protected/social/$userHandle/'
      path: '/'
      fullPath: '/social/$userHandle/'
      preLoaderRoute: typeof ProtectedSocialUserHandleIndexImport
      parentRoute: typeof ProtectedSocialUserHandleRouteImport
    }
    '/_protected/social/search/': {
      id: '/_protected/social/search/'
      path: '/'
      fullPath: '/social/search/'
      preLoaderRoute: typeof ProtectedSocialSearchIndexImport
      parentRoute: typeof ProtectedSocialSearchRouteImport
    }
    '/_protected/tv/$tvId/': {
      id: '/_protected/tv/$tvId/'
      path: '/$tvId'
      fullPath: '/tv/$tvId'
      preLoaderRoute: typeof ProtectedTvTvIdIndexImport
      parentRoute: typeof ProtectedTvRouteImport
    }
    '/_protected/tv/catalog/': {
      id: '/_protected/tv/catalog/'
      path: '/catalog'
      fullPath: '/tv/catalog'
      preLoaderRoute: typeof ProtectedTvCatalogIndexImport
      parentRoute: typeof ProtectedTvRouteImport
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
      path: '/$animeId/watch'
      fullPath: '/anime/$animeId/watch'
      preLoaderRoute: typeof ProtectedAnimeAnimeIdWatchIndexImport
      parentRoute: typeof ProtectedAnimeRouteImport
    }
    '/_protected/movie/$movieId/watch/': {
      id: '/_protected/movie/$movieId/watch/'
      path: '/$movieId/watch'
      fullPath: '/movie/$movieId/watch'
      preLoaderRoute: typeof ProtectedMovieMovieIdWatchIndexImport
      parentRoute: typeof ProtectedMovieRouteImport
    }
    '/_protected/movie/catalog/search/': {
      id: '/_protected/movie/catalog/search/'
      path: '/catalog/search'
      fullPath: '/movie/catalog/search'
      preLoaderRoute: typeof ProtectedMovieCatalogSearchIndexImport
      parentRoute: typeof ProtectedMovieRouteImport
    }
    '/_protected/social/$userHandle/collections/': {
      id: '/_protected/social/$userHandle/collections/'
      path: '/collections'
      fullPath: '/social/$userHandle/collections'
      preLoaderRoute: typeof ProtectedSocialUserHandleCollectionsIndexImport
      parentRoute: typeof ProtectedSocialUserHandleRouteImport
    }
    '/_protected/social/$userHandle/posts/': {
      id: '/_protected/social/$userHandle/posts/'
      path: '/$userHandle/posts'
      fullPath: '/social/$userHandle/posts'
      preLoaderRoute: typeof ProtectedSocialUserHandlePostsIndexImport
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
    '/_protected/tv/$tvId/watch/': {
      id: '/_protected/tv/$tvId/watch/'
      path: '/$tvId/watch'
      fullPath: '/tv/$tvId/watch'
      preLoaderRoute: typeof ProtectedTvTvIdWatchIndexImport
      parentRoute: typeof ProtectedTvRouteImport
    }
    '/_protected/tv/catalog/search/': {
      id: '/_protected/tv/catalog/search/'
      path: '/catalog/search'
      fullPath: '/tv/catalog/search'
      preLoaderRoute: typeof ProtectedTvCatalogSearchIndexImport
      parentRoute: typeof ProtectedTvRouteImport
    }
    '/_protected/social/$userHandle/collections/$collectionId/': {
      id: '/_protected/social/$userHandle/collections/$collectionId/'
      path: '/$userHandle/collections/$collectionId'
      fullPath: '/social/$userHandle/collections/$collectionId'
      preLoaderRoute: typeof ProtectedSocialUserHandleCollectionsCollectionIdIndexImport
      parentRoute: typeof ProtectedSocialRouteImport
    }
    '/_protected/social/$userHandle/posts/$postId/': {
      id: '/_protected/social/$userHandle/posts/$postId/'
      path: '/$userHandle/posts/$postId'
      fullPath: '/social/$userHandle/posts/$postId'
      preLoaderRoute: typeof ProtectedSocialUserHandlePostsPostIdIndexImport
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
    ProtectedAnimeRouteRoute: ProtectedAnimeRouteRoute.addChildren({
      ProtectedAnimeIndexRoute,
      ProtectedAnimeAnimeIdIndexRoute,
      ProtectedAnimeCatalogIndexRoute,
      ProtectedAnimeAnimeIdWatchIndexRoute,
    }),
    ProtectedMovieRouteRoute: ProtectedMovieRouteRoute.addChildren({
      ProtectedMovieIndexRoute,
      ProtectedMovieMovieIdIndexRoute,
      ProtectedMovieCatalogIndexRoute,
      ProtectedMovieMovieIdWatchIndexRoute,
      ProtectedMovieCatalogSearchIndexRoute,
    }),
    ProtectedSocialRouteRoute: ProtectedSocialRouteRoute.addChildren({
      ProtectedSocialUserHandleRouteRoute:
        ProtectedSocialUserHandleRouteRoute.addChildren({
          ProtectedSocialUserHandleIndexRoute,
          ProtectedSocialUserHandleCollectionsIndexRoute,
        }),
      ProtectedSocialSearchRouteRoute:
        ProtectedSocialSearchRouteRoute.addChildren({
          ProtectedSocialSearchIndexRoute,
          ProtectedSocialSearchPeopleIndexRoute,
          ProtectedSocialSearchPostsIndexRoute,
        }),
      ProtectedSocialIndexRoute,
      ProtectedSocialUserHandlePostsIndexRoute,
      ProtectedSocialUserHandleCollectionsCollectionIdIndexRoute,
      ProtectedSocialUserHandlePostsPostIdIndexRoute,
    }),
    ProtectedTvRouteRoute: ProtectedTvRouteRoute.addChildren({
      ProtectedTvIndexRoute,
      ProtectedTvTvIdIndexRoute,
      ProtectedTvCatalogIndexRoute,
      ProtectedTvTvIdWatchIndexRoute,
      ProtectedTvCatalogSearchIndexRoute,
    }),
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
        "/_protected/anime",
        "/_protected/movie",
        "/_protected/social",
        "/_protected/tv"
      ]
    },
    "/_protected/anime": {
      "filePath": "_protected/anime/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/anime/",
        "/_protected/anime/$animeId/",
        "/_protected/anime/catalog/",
        "/_protected/anime/$animeId/watch/"
      ]
    },
    "/_protected/movie": {
      "filePath": "_protected/movie/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/movie/",
        "/_protected/movie/$movieId/",
        "/_protected/movie/catalog/",
        "/_protected/movie/$movieId/watch/",
        "/_protected/movie/catalog/search/"
      ]
    },
    "/_protected/social": {
      "filePath": "_protected/social/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/social/$userHandle",
        "/_protected/social/search",
        "/_protected/social/",
        "/_protected/social/$userHandle/posts/",
        "/_protected/social/$userHandle/collections/$collectionId/",
        "/_protected/social/$userHandle/posts/$postId/"
      ]
    },
    "/_protected/tv": {
      "filePath": "_protected/tv/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/tv/",
        "/_protected/tv/$tvId/",
        "/_protected/tv/catalog/",
        "/_protected/tv/$tvId/watch/",
        "/_protected/tv/catalog/search/"
      ]
    },
    "/_protected/social/$userHandle": {
      "filePath": "_protected/social/$userHandle/route.tsx",
      "parent": "/_protected/social",
      "children": [
        "/_protected/social/$userHandle/",
        "/_protected/social/$userHandle/collections/"
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
      "parent": "/_protected/anime"
    },
    "/_protected/movie/": {
      "filePath": "_protected/movie/index.tsx",
      "parent": "/_protected/movie"
    },
    "/_protected/social/": {
      "filePath": "_protected/social/index.tsx",
      "parent": "/_protected/social"
    },
    "/_protected/tv/": {
      "filePath": "_protected/tv/index.tsx",
      "parent": "/_protected/tv"
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
      "parent": "/_protected/anime"
    },
    "/_protected/anime/catalog/": {
      "filePath": "_protected/anime/catalog/index.tsx",
      "parent": "/_protected/anime"
    },
    "/_protected/movie/$movieId/": {
      "filePath": "_protected/movie/$movieId/index.tsx",
      "parent": "/_protected/movie"
    },
    "/_protected/movie/catalog/": {
      "filePath": "_protected/movie/catalog/index.tsx",
      "parent": "/_protected/movie"
    },
    "/_protected/social/$userHandle/": {
      "filePath": "_protected/social/$userHandle/index.tsx",
      "parent": "/_protected/social/$userHandle"
    },
    "/_protected/social/search/": {
      "filePath": "_protected/social/search/index.tsx",
      "parent": "/_protected/social/search"
    },
    "/_protected/tv/$tvId/": {
      "filePath": "_protected/tv/$tvId/index.tsx",
      "parent": "/_protected/tv"
    },
    "/_protected/tv/catalog/": {
      "filePath": "_protected/tv/catalog/index.tsx",
      "parent": "/_protected/tv"
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
      "parent": "/_protected/anime"
    },
    "/_protected/movie/$movieId/watch/": {
      "filePath": "_protected/movie/$movieId/watch/index.tsx",
      "parent": "/_protected/movie"
    },
    "/_protected/movie/catalog/search/": {
      "filePath": "_protected/movie/catalog/search/index.tsx",
      "parent": "/_protected/movie"
    },
    "/_protected/social/$userHandle/collections/": {
      "filePath": "_protected/social/$userHandle/collections/index.tsx",
      "parent": "/_protected/social/$userHandle"
    },
    "/_protected/social/$userHandle/posts/": {
      "filePath": "_protected/social/$userHandle_/posts/index.tsx",
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
    "/_protected/tv/$tvId/watch/": {
      "filePath": "_protected/tv/$tvId/watch/index.tsx",
      "parent": "/_protected/tv"
    },
    "/_protected/tv/catalog/search/": {
      "filePath": "_protected/tv/catalog/search/index.tsx",
      "parent": "/_protected/tv"
    },
    "/_protected/social/$userHandle/collections/$collectionId/": {
      "filePath": "_protected/social/$userHandle_/collections/$collectionId/index.tsx",
      "parent": "/_protected/social"
    },
    "/_protected/social/$userHandle/posts/$postId/": {
      "filePath": "_protected/social/$userHandle_/posts/$postId/index.tsx",
      "parent": "/_protected/social"
    }
  }
}
ROUTE_MANIFEST_END */
