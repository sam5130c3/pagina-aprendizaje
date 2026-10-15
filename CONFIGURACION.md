# Configuración: registro de usuarios y pagos

La web ya trae todo el código listo. Solo falta que crees las dos cuentas y
pegues las llaves en un archivo `.env`.

```bash
cp .env.example .env
```

---

## 1. Registro con correo y con Google (Supabase)

1. Entra a <https://supabase.com> y crea un proyecto (plan gratuito).
2. Ve a **Project Settings → API** y copia:
   - **Project URL** → pégala en `VITE_SUPABASE_URL`
   - **anon public** → pégala en `VITE_SUPABASE_ANON_KEY`
3. Ve a **Authentication → Providers → Email** y déjalo activado.
   Si quieres que la gente entre sin confirmar el correo, desactiva
   *Confirm email* (para producción es mejor dejarlo activo).
4. Para el botón de Google, en **Authentication → Providers → Google**:
   - Crea unas credenciales OAuth en <https://console.cloud.google.com>
     (tipo *Aplicación web*).
   - En *URIs de redireccionamiento autorizados* pega la URL que te muestra
     Supabase (algo como `https://xxxx.supabase.co/auth/v1/callback`).
   - Copia el *Client ID* y el *Client Secret* en Supabase y activa el proveedor.
5. En **Authentication → URL Configuration → Redirect URLs** agrega:
   - `http://localhost:5173/cuenta` (para desarrollo)
   - `https://tudominio.com/cuenta` (cuando publiques)

Listo: `/cuenta` ya permite registrarse, entrar, entrar con Google y recuperar
la contraseña.

---

## 2. Pasarela de pagos (ePayco)

1. Crea tu comercio en <https://dashboard.epayco.co>.
2. Ve a **Integraciones → Llaves API** y copia la **PUBLIC_KEY**
   → pégala en `VITE_EPAYCO_PUBLIC_KEY`.
   > La llave *privada* y el *P_CUST_ID* **no** van en este proyecto: solo se
   > usan en un servidor. Nunca las pegues en el `.env` del frontend.
3. Mientras pruebas deja `VITE_EPAYCO_TEST=true` (no se cobra dinero real).
   Para cobrar de verdad cámbialo a `false`.
4. En el panel de ePayco, en **Configuración → Respuesta y confirmación**,
   registra:
   - **URL de respuesta:** `https://tudominio.com/pago/respuesta`
   - **URL de confirmación:** la de tu servidor (opcional, ver abajo).

### Precio del programa

Está en `src/data/programs.ts`, campo `price` (en pesos, sin puntos):

```ts
price: 1200000,   // $1.200.000 COP
```

### Cómo queda el flujo

1. El estudiante entra a un programa y pulsa **Inscríbete ahora**.
2. Llega a `/inscripcion/:programa`, llena sus datos y pulsa **Pagar**.
3. Se abre el checkout de ePayco (tarjetas, PSE, Nequi, Daviplata, Baloto, Efecty).
4. Al terminar vuelve a `/pago/respuesta`, donde la web consulta el estado real
   de la transacción en ePayco y muestra si fue aprobada, pendiente o rechazada.

### URL de confirmación (recomendado para producción)

La página de respuesta le muestra el resultado al estudiante, pero **quien debe
dar por válida una inscripción es tu servidor**. ePayco envía un POST a la *URL
de confirmación* con el resultado de cada transacción; ese endpoint debe validar
la firma (`signature`) usando tu llave privada y recién ahí marcar la
inscripción como pagada. Cuando lo tengas, pon su dirección en
`VITE_EPAYCO_CONFIRMATION_URL`.

Documentación: <https://docs.epayco.co/payments/checkout>
