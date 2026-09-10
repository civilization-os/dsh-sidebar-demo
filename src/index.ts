/**
 * dsh-sidebar-demo — host half (Node).
 *
 * This scaffold is a pure client consumer of the official DSH right-sidebar
 * registry and keyed slots, so the Node half is intentionally empty. The entry
 * must still exist: profile boot mounts the package and the
 * client half (exports["./client"]) is only served for mounted entries.
 *
 * If your plugin needs host-side capability (routes, WebSockets, tools,
 * settings schema …) implement it here.
 */
export const name = 'dsh-sidebar-demo'

export function apply(): void {
  // host half intentionally empty for the demo scaffold
}
