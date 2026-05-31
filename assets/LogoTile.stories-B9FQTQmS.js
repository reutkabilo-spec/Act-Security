import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-CZkk4ATX.js";import{n,t as r}from"./LogoTile-CJqYyjRZ.js";var i,a,o,s,c,l,u;e((()=>{n(),i=t(),a={title:`Foundations/LogoTile`,component:r,parameters:{layout:`centered`},tags:[`autodocs`]},o={args:{mono:`AW`,color:`#FF9900`,size:44}},s=[{mono:`AW`,color:`#FF9900`},{mono:`OK`,color:`#007DC1`},{mono:`EN`,color:`#0078D4`},{mono:`GC`,color:`#4285F4`},{mono:`SP`,color:`#65A637`},{mono:`JI`,color:`#2684FF`},{mono:`SN`,color:`#62D84E`},{mono:`EL`,color:`#FEC514`}],c={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,gap:14,flexWrap:`wrap`},children:s.map(e=>(0,i.jsx)(r,{mono:e.mono,color:e.color},e.mono))})},l={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,gap:14,alignItems:`center`},children:[28,36,44,56,72].map(e=>(0,i.jsx)(r,{mono:`AW`,color:`#FF9900`,size:e},e))})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    mono: 'AW',
    color: '#FF9900',
    size: 44
  }
}`,...o.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap'
  }}>
      {SAMPLES.map(s => <LogoTile key={s.mono} mono={s.mono} color={s.color} />)}
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 14,
    alignItems: 'center'
  }}>
      {[28, 36, 44, 56, 72].map(sz => <LogoTile key={sz} mono="AW" color="#FF9900" size={sz} />)}
    </div>
}`,...l.parameters?.docs?.source}}},u=[`Playground`,`Gallery`,`Sizes`]}))();export{c as Gallery,o as Playground,l as Sizes,u as __namedExportsOrder,a as default};