import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Helper de refresco de sesión para `middleware.ts` (Auth / protección de rutas).
 *
 * Se documenta para la FASE de autenticación. Para activarlo, crear un archivo
 * `web/middleware.ts` en la raíz del proyecto que llame a `updateSession`:
 *
 *   import { updateSession } from "@/lib/supabase/middleware";
 *   export async function middleware(request: NextRequest) {
 *     return updateSession(request);
 *   }
 *   export const config = { matcher: [...] };
 *
 * Mientras no exista `web/middleware.ts`, este archivo no se ejecuta en runtime.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // No ejecutar código entre createServerClient y getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

function isPublicPath(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/propiedades") ||
    pathname.startsWith("/agentes") ||
    pathname.startsWith("/contacto") ||
    pathname.startsWith("/nosotros") ||
    pathname.startsWith("/vender") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api")
  );
}
