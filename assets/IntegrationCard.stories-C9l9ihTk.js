import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-CZkk4ATX.js";import{W as n,et as r,f as i,t as a}from"./lucide-react-B7m-8RHS.js";import{n as o,t as s}from"./LogoTile-CJqYyjRZ.js";import{o as c,r as l,s as u,t as d}from"./ui-0YtK8uIX.js";import{n as f,r as p,s as m,t as h}from"./integrations-C3TpwK4p.js";import{r as g,t as _}from"./StatusBadge-CT9WCS3L.js";function v({integration:e,onOpen:t,active:a=!1}){let o=e,u=o.status===`connected`||o.status===`syncing`,f=o.status===`needs_attention`||o.status===`error`||o.status===`degraded`,m=o.status===`degraded`?`Fix`:o.status===`needs_attention`||o.status===`error`?`Reconnect`:o.status===`disabled`?`Enable`:u?`Manage`:`Connect`,h=a?b:u?S:`var(--border)`,g=a?`0 0 0 3px var(--ring)`:`none`;return(0,y.jsxs)(`button`,{onClick:()=>t(o),className:`group surface flex flex-col gap-4 rounded-2xl p-5 text-left transition-all duration-150 hover:-translate-y-0.5`,style:{borderColor:h,boxShadow:g,background:u?C:`var(--surface-1)`},onMouseEnter:e=>{e.currentTarget.style.borderColor=x,e.currentTarget.style.boxShadow=`0 0 0 3px var(--ring), var(--shadow)`},onMouseLeave:e=>{e.currentTarget.style.borderColor=h,e.currentTarget.style.boxShadow=g},children:[(0,y.jsxs)(`div`,{className:`flex items-start justify-between gap-2`,children:[(0,y.jsx)(s,{id:o.id,mono:o.mono,color:o.color}),o.status===`connected`?(0,y.jsx)(l,{}):o.recommended&&o.status===`not_connected`?(0,y.jsx)(c,{side:`bottom`,align:`end`,width:224,label:`Setup Copilot recommends connecting this early - it unlocks the most downstream value for the rest of your stack.`,children:(0,y.jsxs)(`span`,{className:`chip`,style:{background:`transparent`,color:`var(--text-3)`,border:`1px solid var(--border)`,fontWeight:500},children:[(0,y.jsx)(i,{size:12,style:{color:`var(--accent-strong)`}}),` Recommended`]})}):null]}),(0,y.jsxs)(`div`,{className:`flex-1`,children:[(0,y.jsx)(`div`,{className:`flex items-center gap-2`,children:(0,y.jsx)(`h3`,{className:`text-[15px] font-semibold`,style:{color:`var(--text-1)`},children:o.name})}),(0,y.jsx)(`span`,{className:`text-xs font-medium`,style:{color:`var(--text-3)`},children:o.category}),(0,y.jsx)(`p`,{className:`mt-2 text-[13px] leading-relaxed`,style:{color:`var(--text-2)`},children:o.blurb}),o.copilotWhy&&(0,y.jsx)(`div`,{className:`mt-3`,children:(0,y.jsx)(p,{text:o.copilotWhy})})]}),(0,y.jsx)(`div`,{className:`border-t pt-3`,style:{borderColor:`var(--border)`},children:(0,y.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,y.jsx)(`div`,{className:`flex items-center gap-1.5`,children:o.status===`connected`?o.updateAvailable?(0,y.jsx)(c,{width:224,label:`A newer version of this connector is available - new scopes or fixes. Open it to review and apply the update.`,children:(0,y.jsxs)(`span`,{className:`chip`,style:{background:`color-mix(in srgb, var(--warn) 16%, transparent)`,color:`var(--warn)`,border:`1px solid color-mix(in srgb, var(--warn) 32%, transparent)`},children:[(0,y.jsx)(n,{size:11}),` Update`]})}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(d,{}),o.lastSync&&(0,y.jsx)(`span`,{className:`text-[11px]`,style:{color:`var(--text-3)`},children:o.lastSync})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(_,{status:o.status}),u&&o.updateAvailable&&(0,y.jsx)(c,{width:224,label:`A newer version of this connector is available - new scopes or fixes. Open it to review and apply the update.`,children:(0,y.jsxs)(`span`,{className:`chip`,style:{background:`color-mix(in srgb, var(--warn) 16%, transparent)`,color:`var(--warn)`,border:`1px solid color-mix(in srgb, var(--warn) 32%, transparent)`},children:[(0,y.jsx)(n,{size:11}),` Update`]})})]})}),(0,y.jsxs)(`span`,{className:`inline-flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors`,style:{color:f?`var(--warn)`:`var(--text-2)`},children:[m,(0,y.jsx)(r,{size:13,className:`transition-transform group-hover:translate-x-0.5`})]})]})})]})}var y,b,x,S,C,w=e((()=>{a(),o(),g(),m(),u(),y=t(),b=`color-mix(in srgb, var(--accent) 60%, var(--border))`,x=`color-mix(in srgb, var(--accent) 45%, var(--border))`,S=`color-mix(in srgb, var(--accent) 40%, var(--border))`,C=`color-mix(in srgb, var(--accent) 5%, var(--surface-1))`,v.__docgenInfo={description:``,methods:[],displayName:`IntegrationCard`,props:{integration:{required:!0,tsType:{name:`Integration`},description:``},onOpen:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(i: Integration) => void`,signature:{arguments:[{type:{name:`Integration`},name:`i`}],return:{name:`void`}}},description:``},active:{required:!1,tsType:{name:`boolean`},description:`the integration whose panel is currently open - gets a persistent brand ring`,defaultValue:{value:`false`,computed:!1}}}}})),T,E,D,O,k,A,j,M,N,P;e((()=>{w(),f(),T=t(),E=h.find(e=>e.id===`aws`),D=(e,t={})=>({...E,status:e,lastSync:e===`connected`||e===`syncing`?`4 min ago`:void 0,...t}),O={title:`Components/IntegrationCard`,component:v,parameters:{layout:`centered`},tags:[`autodocs`],args:{onOpen:()=>{}},decorators:[e=>(0,T.jsx)(`div`,{style:{width:320},children:(0,T.jsx)(e,{})})]},k={args:{integration:D(`not_connected`,{recommended:!0})}},A={args:{integration:D(`connected`),active:!0}},j=[`not_connected`,`connecting`,`syncing`,`connected`,`degraded`,`needs_attention`,`error`,`disabled`],M={parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(300px, 1fr))`,gap:16},children:j.map(e=>(0,T.jsx)(v,{integration:D(e),onOpen:()=>{}},e))})},N={parameters:{layout:`padded`},render:()=>(0,T.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(300px, 1fr))`,gap:16},children:[(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`p`,{style:{fontSize:12,color:`var(--text-3)`,marginBottom:8},children:`Default (hover me)`}),(0,T.jsx)(v,{integration:D(`not_connected`,{recommended:!0}),onOpen:()=>{}})]}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`p`,{style:{fontSize:12,color:`var(--text-3)`,marginBottom:8},children:`Selected (panel open)`}),(0,T.jsx)(v,{integration:D(`connected`),onOpen:()=>{},active:!0})]})]})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    integration: withStatus('not_connected', {
      recommended: true
    })
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    integration: withStatus('connected'),
    active: true
  }
}`,...A.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16
  }}>
      {ALL.map(s => <IntegrationCard key={s} integration={withStatus(s)} onOpen={() => {}} />)}
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16
  }}>
      <div>
        <p style={{
        fontSize: 12,
        color: 'var(--text-3)',
        marginBottom: 8
      }}>Default (hover me)</p>
        <IntegrationCard integration={withStatus('not_connected', {
        recommended: true
      })} onOpen={() => {}} />
      </div>
      <div>
        <p style={{
        fontSize: 12,
        color: 'var(--text-3)',
        marginBottom: 8
      }}>Selected (panel open)</p>
        <IntegrationCard integration={withStatus('connected')} onOpen={() => {}} active />
      </div>
    </div>
}`,...N.parameters?.docs?.source}}},P=[`Recommended`,`Selected`,`AllStates`,`HoverVsSelected`]}))();export{M as AllStates,N as HoverVsSelected,k as Recommended,A as Selected,P as __namedExportsOrder,O as default};