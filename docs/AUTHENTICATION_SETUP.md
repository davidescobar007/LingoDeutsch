# Configuración de Autenticación con Google

## Resumen

Se ha implementado una página de login completa con autenticación mediante Google OAuth2 utilizando PocketBase como backend.

## Archivos Creados/Modificados

### 1. Hook de Autenticación (`src/hooks/useGoogleAuth.tsx`)
- Maneja el flujo completo de OAuth2 con Google
- Gestiona el estado de autenticación del usuario
- Verifica automáticamente si el usuario está autenticado
- Maneja la redirección después del login
- Incluye función de logout

### 2. Página de Login (`src/app/[locale]/login/page.tsx`)
- Diseño moderno y responsivo
- Muestra características de la aplicación
- Botón de inicio de sesión con Google
- Estados de carga
- Redirección automática si el usuario ya está autenticado

### 3. Traducciones
Se agregaron las siguientes claves en `messages/es.json` y `messages/de.json`:

```json
"login": {
   "welcome": "...",
   "subtitle": "...",
   "signInWithGoogle": "...",
   "signingIn": "...",
   "description": "...",
   "features": {
      "vocabulary": "...",
      "grammar": "...",
      "practice": "...",
      "track": "..."
   },
   "footer": "..."
}
```

## Configuración Requerida

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_API_ENVIRONMENT=http://localhost:8090
```

### 2. Configuración de PocketBase

#### Paso 1: Configurar Google OAuth en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "APIs & Services" > "Credentials"
4. Crea credenciales OAuth 2.0 Client ID
5. Configura las URIs de redirección autorizadas:
   - Para desarrollo: `http://localhost:8090/api/oauth2-redirect`
   - Para producción: `https://tu-dominio-pocketbase.com/api/oauth2-redirect`
6. Guarda el Client ID y Client Secret

#### Paso 2: Configurar en PocketBase

1. Accede a tu panel de administración de PocketBase
2. Ve a **Settings** > **Auth providers**
3. Encuentra **Google** en la lista de providers
4. Habilita Google OAuth
5. Ingresa el **Client ID** y **Client Secret** de Google
6. Guarda los cambios

#### Paso 3: Configurar URLs de Redirección de la Aplicación

Las URLs de redirección permitidas en tu aplicación Next.js deben ser:
- Desarrollo: `http://localhost:3000/login`
- Producción: `https://tudominio.com/login`

## Flujo de Autenticación

1. Usuario hace clic en "Continuar con Google"
2. Se obtienen los métodos de autenticación de PocketBase
3. Se guarda el estado OAuth en localStorage (code verifier, state)
4. Usuario es redirigido a Google para autenticarse
5. Google redirige de vuelta a la aplicación con el código
6. El hook verifica el estado y completa el flujo OAuth2
7. Usuario es autenticado y redirigido a `/app`

## Características Implementadas

### Hook `useGoogleAuth`
- ✅ Autenticación con Google OAuth2
- ✅ Verificación del estado de autenticación
- ✅ Manejo de la sesión del usuario
- ✅ Función de logout
- ✅ Protección contra CSRF con state verification
- ✅ Redirección automática después del login
- ✅ Manejo de errores con toast notifications

### Página de Login
- ✅ Diseño responsivo (mobile y desktop)
- ✅ Integración con el sistema de temas de la aplicación
- ✅ Animaciones y transiciones suaves
- ✅ Estados de carga
- ✅ Iconos de lucide-react
- ✅ Multiidioma (español y alemán)
- ✅ Protección de ruta (redirección si ya está autenticado)

## Uso del Hook en Otros Componentes

```tsx
import { useGoogleAuth } from '@/hooks/useGoogleAuth'

function MiComponente() {
   const { isAuthenticated, user, signOut } = useGoogleAuth()

   if (!isAuthenticated) {
      return <div>No autenticado</div>
   }

   return (
      <div>
         <p>Bienvenido {user?.email}</p>
         <button onClick={signOut}>Cerrar Sesión</button>
      </div>
   )
}
```

## Protección de Rutas

Para proteger rutas que requieren autenticación, puedes usar el hook:

```tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'

export default function ProtectedPage() {
   const { isAuthenticated, isLoading } = useGoogleAuth()
   const router = useRouter()

   useEffect(() => {
      if (!isLoading && !isAuthenticated) {
         router.push('/login')
      }
   }, [isAuthenticated, isLoading, router])

   if (isLoading) {
      return <div>Cargando...</div>
   }

   return <div>Contenido protegido</div>
}
```

## Notas Importantes

1. **Seguridad**: El flujo OAuth utiliza PKCE (Proof Key for Code Exchange) automáticamente para mayor seguridad
2. **Estado**: El estado de autenticación se mantiene en PocketBase y se sincroniza automáticamente
3. **Tokens**: PocketBase maneja automáticamente la renovación de tokens
4. **LocalStorage**: Solo se usa temporalmente durante el flujo OAuth y se limpia después

## Testing

Para probar la autenticación:

1. Asegúrate de que PocketBase esté corriendo
2. Verifica que las variables de entorno estén configuradas
3. Inicia la aplicación: `npm run dev`
4. Navega a `http://localhost:3000/login`
5. Haz clic en "Continuar con Google"
6. Completa el flujo de autenticación en Google
7. Deberías ser redirigido a `/app` después del login exitoso

## Troubleshooting

### Error: "Google authentication is not configured"
- Verifica que Google OAuth esté habilitado en PocketBase
- Confirma que las credenciales estén correctamente configuradas

### Error: "State mismatch"
- Limpia localStorage
- Intenta el flujo de nuevo
- Verifica que no haya extensiones del navegador interfiriendo

### Usuario no redirigido después del login
- Verifica la URL de redirección en Google Cloud Console
- Confirma que la URL coincida con tu entorno (desarrollo/producción)
- Revisa la consola del navegador para errores

## Próximos Pasos

- [ ] Implementar middleware para proteger rutas automáticamente
- [ ] Agregar más providers (GitHub, Microsoft, etc.)
- [ ] Implementar refresh automático de tokens
- [ ] Agregar perfil de usuario completo
- [ ] Implementar recuperación de sesión
