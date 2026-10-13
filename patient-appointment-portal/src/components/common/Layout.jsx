import Header from './Header.jsx'
import Navigation from './Navigation.jsx'

// Layout wraps every page so the header and menu are written once.
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Navigation />
        <main className="layout-content">
          {children}
          <p className="note">
            Fictional sample data only. This is not a real healthcare system.
          </p>
        </main>
      </div>
    </div>
  )
}

export default Layout
