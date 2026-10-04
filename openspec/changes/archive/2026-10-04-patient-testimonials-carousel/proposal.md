# Proposal: Patient Testimonials Carousel

## Why

La página indica que pacientes tratados en México aceptaron responder preguntas, pero necesitaba mostrar sus perfiles, fotografías y medios de contacto. La sección incorpora los tres perfiles recibidos y permite recorrerlos en un carrusel adaptable.

## What Changes

- Añadir la sección después de la explicación del tratamiento y la referencia a pacientes tratados en México.
- Presentar las fotografías y el perfil completo de cada paciente dentro de una misma tarjeta, usando recortes fotográficos de los materiales suministrados.
- Mostrar tres tarjetas de la misma altura en escritorio, dos en tablet y una en móvil. El texto completo debe permanecer visible sin scroll dentro de las tarjetas.
- Usar el tamaño estándar de `h2` para el título de sección y mantener la jerarquía regular de títulos de tarjeta.
- En tablet y móvil, avanzar automáticamente y repetir el ciclo sin fin. Con tres perfiles, el orden de dos tarjetas visibles será 1–2, 2–3, 3–1, 1–2. En escritorio, mostrar las tres tarjetas simultáneamente.
- Quitar los botones y el indicador numérico del carrusel. Las fotografías de esta sección no abren el modal de imágenes.
- Incorporar los perfiles transcritos de Isaura, Lourdes y Marisol junto a los datos de contacto proporcionados. Los emails enlazan por `mailto:`; solo los teléfonos completos tendrán enlace de WhatsApp. “Ing. Ramirez” se conserva como texto sin destino inventado.
- Cambiar a 2026 únicamente las etiquetas de año correspondientes en las imágenes de perfil.
- Preparar el modelo para hasta cinco perfiles, mostrando únicamente los perfiles completos disponibles.

## Capabilities

### New Capabilities

- `patient-testimonials`: Carrusel adaptable de perfiles de pacientes, contenido, fotografías y contactos aprobados.

### Modified Capabilities

- Ninguna.

## Impact

- Modifica la página principal y los datos de contacto del sitio.
- Añade datos estructurados de testimonios y recursos locales de imágenes originales y recortadas.
- No agrega backend, formularios ni contenido médico o datos de contacto inventados.
