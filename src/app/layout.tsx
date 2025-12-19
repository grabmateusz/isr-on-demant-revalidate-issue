import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ISR on-demand-revalidate demo app',
    description: 'ISR on-demand-revalidate demo app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}