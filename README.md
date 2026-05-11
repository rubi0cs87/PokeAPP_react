# PokéApp

Una Pokédex completa construida con React y Chakra UI v3, consumiendo la [PokéAPI](https://pokeapi.co/).

Con esta pokéApp puedes ver los stats básicos de todos los pokemon, buscar por tipos y/o por generaciones, "capturarlos" de forma automática o mediante un minijuego de captura basado en la probabilidad real del juego.

## Funcionalidades

- Explorar todos los Pokémon con paginación "Cargar más"
- Buscar cualquier Pokémon por nombre o número
- Filtrar por tipo y/o generación simultáneamente
- Página de detalle con stats, tipos y sprite
- Modo shiny — cambia todos los sprites a su versión shiny
- Simulador de captura con la fórmula real de la Gen I, selección de pokeball y estado del Pokémon
- Capturar / liberar Pokémon — persistido en `localStorage`
- Notificaciones toast al capturar, escapar y liberar (máximo 3 a la vez)
- Pantalla de error con MissingNo para Pokémon inválidos

## Páginas

| Ruta           | Descripción                                 |
| -------------- | ------------------------------------------- |
| `/`            | Inicio — Pokémon aleatorio del día          |
| `/filters`     | Explorador — filtra por tipo y/o generación |
| `/pokemon/:id` | Detalle — stats y simulador de captura      |
| `/captured`    | Tus Pokémon capturados                      |

## Tecnologías

- **React 18** — componentes funcionales y hooks
- **React Router v6** — enrutado en el cliente
- **Chakra UI v3** — componentes de UI responsivos
- **PokéAPI** — API REST pública
- **Vite** — herramienta de build

## Cómo empezar

```bash
npm install
npm run dev
```
