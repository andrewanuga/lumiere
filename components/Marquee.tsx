const items = ["Portrait", "Wedding", "Editorial", "Commercial", "Fine Art", "Events", "Lifestyle"];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div style={{
      borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",
      overflow:"hidden",padding:"18px 0",background:"var(--bg2)",
      position:"relative",zIndex:1,
    }}>
      <div className="animate-marquee" style={{display:"flex",gap:0,whiteSpace:"nowrap"}}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:".28em",
            textTransform:"uppercase",color:"var(--muted)",
            padding:"0 36px",display:"inline-flex",alignItems:"center",gap:36,flexShrink:0,
          }}>
            {item}
            <span style={{width:3,height:3,background:"var(--gold)",borderRadius:"50%",display:"inline-block"}}/>
          </span>
        ))}
      </div>
    </div>
  );
}
