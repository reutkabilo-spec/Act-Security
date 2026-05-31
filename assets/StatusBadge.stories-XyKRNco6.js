import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-CZkk4ATX.js";import{n,r,t as i}from"./StatusBadge-CT9WCS3L.js";var a,o,s,c,l,u,d;e((()=>{r(),a=t(),o=[`not_connected`,`connecting`,`syncing`,`connected`,`degraded`,`needs_attention`,`error`,`disabled`],s={title:`Status/StatusBadge`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{status:{control:`select`,options:o}}},c={args:{status:`connected`}},l={render:()=>(0,a.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:o.map(e=>(0,a.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:14},children:[(0,a.jsx)(i,{status:e}),(0,a.jsx)(`code`,{style:{fontSize:12,color:`var(--text-3)`},children:e})]},e))})},u={render:()=>(0,a.jsx)(`div`,{style:{display:`flex`,gap:20,alignItems:`center`,flexWrap:`wrap`},children:o.map(e=>(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,a.jsx)(n,{status:e,size:12}),(0,a.jsx)(`code`,{style:{fontSize:10,color:`var(--text-3)`},children:e})]},e))})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'connected'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      {ALL.map(s => <div key={s} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }}>
          <StatusBadge status={s} />
          <code style={{
        fontSize: 12,
        color: 'var(--text-3)'
      }}>{s}</code>
        </div>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      {ALL.map(s => <div key={s} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }}>
          <StatusDot status={s} size={12} />
          <code style={{
        fontSize: 10,
        color: 'var(--text-3)'
      }}>{s}</code>
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}},d=[`Playground`,`AllBadges`,`Dots`]}))();export{l as AllBadges,u as Dots,c as Playground,d as __namedExportsOrder,s as default};