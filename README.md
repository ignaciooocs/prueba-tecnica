# 📌 Proyecto Prueba Técnica  

## 🚀 Clonar el Repositorio  

Para clonar el proyecto, abre una terminal y ejecuta:  

```bash
git clone https://github.com/ignaciooocs/prueba-tecnica.git
```

Luego, accede a la carpeta del proyecto:  

```bash
cd prueba-tecnica
```

---

## 🛠️ Correr Backend (NestJS)  

1. Accede a la carpeta del backend:  

```bash
cd backend-nestjs
```

2. Instala las dependencias:  

```bash
npm install
```
###   
>[!WARNING]
>Para que el sistema funcione se requiere una base de datos **PostgreSQL** en ejecución.  

💪 **Si tienes `Docker` instalado**, asegúrate de estar en la carpeta del backend y ejecuta el siguiente comando:  

```bash
docker compose up -d
```

Esto iniciará la base de datos automáticamente, creando un contenedor con PostgreSQL según la configuración del archivo `docker-compose.yml`.  

🔴 **Si no tienes Docker**, asegúrate de que una base de datos **PostgreSQL** esté corriendo con las siguientes credenciales:  

```json
{
  "port": 5432,
  "username": "demo",
  "password": "demo",
  "database": "demo"
}
```

### 🔑 Variables de Entorno  

>[!CAUTION]
>Para que el sistema funcione correctamente, debes añadir las variables de entorno necesarias en el archivo `.env`.  

Estas variables son necesarias para que el sistema esté autorizado para enviar correos, de lo contrario no se podrá completar el proceso de autenticación:  

```ini
USER_EMAIL=ejemplo@email.com
USER_PASSWORD=password
```

📌 **Reemplaza los valores por los que te enviará el desarrollador o usa los tuyos si los tienes.**  

---

### ▶️ Iniciar el Backend  

Con todo listo, ejecuta el siguiente comando para iniciar el backend:  

```bash
npm start
```

📌 **Accede a la documentación de la API en:**  
```
http://localhost:3000/docs
```

---

## 🎨 Correr Frontend (Expo)  

1. Accede a la carpeta del frontend:  

```bash
cd frontend-expo
```

2. Instala las dependencias:  

```bash
npm install
```

### 🌍 Configuración de Google Places  

Para que la API de `react-native-google-places-autocomplete` funcione correctamente, añade la siguiente variable de entorno en el archivo `.env`:  

```ini
EXPO_PUBLIC_GOOGLE_API=miapi
```

📌 **Reemplaza `"miapi"` con la clave proporcionada por el desarrollador.**  
⚠️ **Si no configuras esta clave, la app seguirá funcionando, pero la búsqueda de lugares no funcionará.**  

---

### ▶️ Iniciar el Frontend  

Ejecuta el siguiente comando:  

```bash
npm start
```

---

## 📱 Probar la Aplicación con Expo Go  

Puedes probar la aplicación en tu teléfono con **Expo Go**:  

1. **Instala Expo Go** desde la [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) o [App Store](https://apps.apple.com/app/expo-go/id982107779).  
2. Asegúrate de que tu teléfono y tu computadora estén conectados a la misma red Wi-Fi.  
3. Después de ejecutar `npm start`, verás un código QR en la terminal.  
4. **Android**: Escanea el código con **Expo Go**.  
   **iOS**: Usa la **cámara** para escanearlo.  
5. La app se cargará y podrás probarla en tiempo real.  

⚠️ **Si no puedes escanear el código QR**, ingresa la URL manualmente en **Expo Go** (`Enter URL manually`). La URL tendrá un formato similar a:  

```
exp://192.168.1.89:8081
```

📌 **Para emuladores:**  
- **Android**: Presiona `a` en la terminal para abrir la app en un emulador de Android.  

---

🔹 **¡Listo! Ahora puedes usar la aplicación.** 🚀

