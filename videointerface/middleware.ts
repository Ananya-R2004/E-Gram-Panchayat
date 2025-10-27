import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',                     // protected
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware(async (auth, req) => {
  const sessionAuth = await auth();

  // 👇 Skip protection for sign-in and sign-up pages
  const url = req.nextUrl.pathname;
  if (url.startsWith('/sign-in') || url.startsWith('/sign-up')) return;

  // 👇 Protect all other routes
  if (isProtectedRoute(req) && !sessionAuth.userId) {
    return sessionAuth.redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
