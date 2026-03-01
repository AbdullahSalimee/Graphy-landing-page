import '../styles/globals.css'

export const metadata = {
  title: 'Graphy AI — The AI Graph Maker',
  description: 'From messy data to breathtaking charts in seconds. 87 chart types. Free.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}