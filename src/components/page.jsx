import Topbar from './topbar'
import Bottombar from './bottombar'

export default function Page ({ children, ...props }) {
  return <>
    <Topbar />
    <main {...props}>
      {children}
    </main>
    <Bottombar />
  </>
}