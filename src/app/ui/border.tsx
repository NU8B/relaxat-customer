export default function Border({
  children,
  style,
}: Readonly<{ children: React.ReactNode; style?: string }>) {
  const borderClassName = "basis-full border-slate-300 border rounded-lg";
  return (
    <div className={`${borderClassName} ${style ? style : ""}`}>{children}</div>
  );
}
