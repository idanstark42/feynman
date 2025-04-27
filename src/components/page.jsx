export default function Page ({ children, ...props }) {
  return <main {...props}>
    {children}
  </main>
}