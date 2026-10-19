# UI showcase

Run `bun run dev`, then open **http://localhost:3000/ui**. The route returns
404 in production; the gallery's dynamic import is development-only.

The examples exercise every installed module in `src/components/ui` with the
existing Base Nova components and shared theme. Use the theme selector, edit
fields, navigate tabs and pagination, and open each menu and overlay. Examples
use local fixtures and React state. They do not save documents or upload files.
Code Block includes syntax highlighting, line numbers, diff lines and copying.
Trace includes expandable output and completed, running, pending and error fixtures.
The theme selector uses the application's existing persisted theme preference.
The page sidebar collapses to icons on desktop and opens as a drawer on mobile.
Use the header trigger or Ctrl/Cmd+B; selecting a section closes the mobile drawer.
The standard sidebar provider retains its `sidebar_state` browser cookie.
The workspace picker, expandable Platform navigation, and footer account menu
follow the sidebar-07 composition. Workspace and account identities are fixtures;
account actions show preview notifications.

## Verify

```sh
bun test ./tests/ui-showcase.test.tsx
bun .agents/skills/shadcn/scripts/showcase-coverage.mjs src/components/ui src/features/ui-showcase
```

Coverage checks imports; it does not prove visual appearance or interactions.
In a browser, check desktop and mobile in light and dark mode, keyboard focus,
Escape and focus restoration, and no page-wide horizontal overflow. Check
`/ui → /` with client navigation and browser back/forward, plus direct
page loads.

Public element defaults and generated utilities live in `src/styles/app.css`,
scoped to the public document's `data-public-ui` marker. This includes body-mounted
popups. The utility `@scope` keeps generated utilities from leaking onto
documents without the marker.

## Remove

1. Delete `src/features/ui-showcase/` and `src/routes/ui.tsx`.
2. Delete `tests/ui-showcase.test.tsx` and remove the showcase paragraph from the root README.
3. Run `bun run generate-routes` and `bun run typecheck`.

Keep `src/components/ui`, shared providers, and public style defaults: they are
part of the template's working UI integration. The application has no imports
from this feature outside its route and removable test.
