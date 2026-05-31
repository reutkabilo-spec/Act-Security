import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-CZkk4ATX.js";import{a as n,i as r,n as i,o as a,r as o,s,t as c}from"./integrations-C3TpwK4p.js";var l,u,d,f,p,m,h;e((()=>{s(),i(),l=t(),u={title:`Components/Setup Copilot`,component:n,parameters:{layout:`padded`},tags:[`autodocs`]},d={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,l.jsx)(r,{size:22}),(0,l.jsx)(r,{size:26}),(0,l.jsx)(r,{size:32})]})},f={decorators:[e=>(0,l.jsx)(`div`,{style:{maxWidth:360},children:(0,l.jsx)(e,{})})],args:{children:`Connect AWS first - it gives Act the access graph everything else maps onto.`}},p={render:()=>(0,l.jsx)(`div`,{style:{maxWidth:360},children:(0,l.jsx)(o,{text:`Pairs with Okta to map cloud access back to real identities.`})})},m={render:()=>(0,l.jsx)(`div`,{style:{maxWidth:720},children:(0,l.jsx)(a,{items:c,onOpen:()=>{}})})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <CopilotMark size={22} />
      <CopilotMark size={26} />
      <CopilotMark size={32} />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    maxWidth: 360
  }}><Story /></div>],
  args: {
    children: 'Connect AWS first - it gives Act the access graph everything else maps onto.'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 360
  }}>
      <CopilotInsight text="Pairs with Okta to map cloud access back to real identities." />
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 720
  }}>
      <SetupCopilotPanel items={INTEGRATIONS} onOpen={() => {}} />
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Mark`,`Tip`,`Insight`,`RecommendationPanel`]}))();export{p as Insight,d as Mark,m as RecommendationPanel,f as Tip,h as __namedExportsOrder,u as default};