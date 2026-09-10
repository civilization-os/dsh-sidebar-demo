/** Minimal external plugin using the official DSH right-sidebar API. */
import type { Context } from '@deepseek-ai/cordis'

export const inject = ['slots', 'sidebarRightTabs']
const TAB_ID = 'dsh-sidebar-demo'
const TAB_KIND = 'sidebar-demo'

interface OfficialContext extends Context {
  slots: any
  sidebarRightTabs: any
}

export function apply(ctx: Context): void {
  const official = ctx as OfficialContext
  ctx.effect(() => official.sidebarRightTabs.register({
    id: TAB_ID,
    kind: TAB_KIND,
    priority: 'extension',
    title: () => 'Demo',
    guide: [{ order: 200, title: () => 'Demo', description: () => '官方右侧栏示例', icon: DemoIcon }],
  }), 'dsh-sidebar-demo: official tab definition')

  ctx.effect(() => official.slots.inject('sidebar.right.pane.tab', () => official.slots.register({
    name: 'sidebar.right.pane.tab',
    key: TAB_ID,
  }, DemoBody)), 'dsh-sidebar-demo: official tab body')

  ctx.effect(() => official.slots.inject('sidebar.right.pane.tab.title', () => official.slots.register({
    name: 'sidebar.right.pane.tab.title',
    key: TAB_ID,
  }, DemoTitle)), 'dsh-sidebar-demo: official tab title')
}

function DemoTitle(): JSX.Element {
  return <><DemoIcon size={15} /><span>Demo</span></>
}

function DemoBody({ sessionId, useSessions, useTabInfo }: any): JSX.Element {
  const { sidebar, tab } = useTabInfo()
  const cwd = useSessions((sessions: any) => sessions?.byId?.[sessionId]?.cwd) as string | undefined
  return (
    <main style={styles.panel}>
      <div style={styles.eyebrow}>
        <DemoIcon size={18} /> OFFICIAL SIDEBAR API
      </div>
      <h2 style={styles.title}>原生右侧栏已就绪</h2>
      <p style={styles.paragraph}>本页面通过 DSH 官方 tab registry 与 keyed slots 原生注册，无任何第三方中间层。</p>
      <dl style={styles.facts}>
        <dt>Session</dt><dd>{sessionId}</dd>
        <dt>Workspace</dt><dd>{cwd ?? '未选择工作区'}</dd>
        <dt>Layout</dt><dd>{sidebar?.fullscreen ? '全屏' : '侧边停靠'}</dd>
        <dt>Visible</dt><dd>{tab?.visible ? '是' : '否'}</dd>
      </dl>
    </main>
  )
}

function DemoIcon({ size = 16, className }: { size?: number; className?: string }): JSX.Element {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 2.5h8M5.5 2.5v3L2.8 11a1.7 1.7 0 001.5 2.5h7.4a1.7 1.7 0 001.5-2.5l-2.7-5.5v-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M4.5 10h7" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

const fg = 'var(--dsw-alias-label-primary, currentColor)'
const muted = 'var(--dsw-alias-label-secondary, rgba(127,127,127,.9))'
const layer = 'var(--dsw-alias-bg-layer-2, Canvas)'
const border = 'var(--dsw-alias-border-l3, rgba(127,127,127,.24))'
const accent = 'var(--dsw-alias-brand-primary, #ed67ad)'
const styles: Record<string, React.CSSProperties> = {
  panel: { boxSizing: 'border-box', display: 'flex', height: '100%', flexDirection: 'column', gap: 12, padding: 18, color: fg, background: layer, overflow: 'auto' },
  eyebrow: { display: 'flex', alignItems: 'center', gap: 7, color: accent, fontSize: 10, fontWeight: 700, letterSpacing: '.08em' },
  title: { margin: 0, fontSize: 18, fontWeight: 650 },
  paragraph: { margin: 0, color: muted, fontSize: 13, lineHeight: 1.7 },
  facts: { display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: '8px 12px', margin: 0, padding: 12, border: '1px solid ' + border, borderRadius: 12, fontSize: 12 },
}
