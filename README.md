# Colombia FM - Reproductor Web de Emisoras 📻🇨🇴

Una aplicación web moderna y elegante para escuchar en vivo el Top 10 de las mejores emisoras de radio de Colombia.

## ✨ Características

- **Diseño Moderno (Dark Mode):** Interfaz estilizada y responsiva con una paleta de colores cuidadosamente seleccionada para una excelente experiencia visual.
- **Reproductor de Audio Integrado:** Utiliza la API nativa de audio de HTML5 para reproducir transmisiones de radio en vivo de forma fluida.
- **Controles Completos:** Permite pausar, reproducir, avanzar a la siguiente emisora, retroceder y ajustar el volumen.
- **Animaciones Interactivas:** Incluye un ecualizador animado que se activa al reproducir la música, dando un toque dinámico a la experiencia.
- **Gestión de Estado de Emisoras:** Indica visualmente qué emisora está actualmente en reproducción en la lista lateral.

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica del proyecto y reproductor de audio `<audio>`.
- **CSS3 / Tailwind CSS (CDN):** Estilos y diseño responsivo sin necesidad de configurar un entorno de desarrollo complejo.
- **Vanilla JavaScript:** Toda la lógica del reproductor, manejo de eventos y manipulación del DOM está escrita en JavaScript puro, sin librerías externas.
- **FontAwesome (CDN):** Iconografía moderna (botones de play/pausa, volumen, etc.).

## 🚀 Despliegue en GitHub Pages

Este proyecto está listo para ser desplegado de manera gratuita y sencilla en **GitHub Pages**. Dado que es un sitio completamente estático (HTML, CSS y JS del lado del cliente), no requiere configuración de servidores ni builds complejos.

### Pasos para desplegar:

1. **Sube este repositorio a tu cuenta de GitHub.** Asegúrate de que los archivos (`index.html`, `app.js`, `style.css`, etc.) estén en la raíz (o `main`) del repositorio.
2. Ve a tu repositorio en GitHub y haz clic en la pestaña **Settings** (Configuración).
3. En el menú de la barra lateral izquierda, baja hasta la sección **Code and automation** y selecciona **Pages** (Páginas).
4. En la sección **Build and deployment**:
   - En **Source** selecciona "Deploy from a branch".
   - En **Branch**, selecciona la rama donde tengas los archivos (por lo general `main` o `master`), deja la carpeta en `/ (root)` y dale a **Save** (Guardar).
5. ¡Listo! GitHub comenzará el proceso. En un par de minutos, en esa misma pantalla de Pages, te aparecerá un mensaje verde con el enlace (URL) público de tu nueva página web.

---

### Notas Adicionales:

*   **Bloqueo de Audio:** Los navegadores modernos por seguridad impiden que el audio se reproduzca automáticamente sin interacción del usuario (Autoplay Policy). Es necesario que el usuario haga clic en una emisora o en el botón de play para iniciar.
*   **Transmisiones de Terceros:** Las URLs de streaming (como las de StreamTheWorld, Shoutcast, etc.) pertenecen a las emisoras respectivas. Algunas de estas emisoras podrían transmitir mediante HTTP en lugar de HTTPS, lo cual puede generar advertencias de "Contenido mixto" (Mixed Content) si la página se despliega en HTTPS (como en GitHub Pages). Se han seleccionado URLs compatibles en la medida de lo posible.