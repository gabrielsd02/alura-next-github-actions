import Link from 'next/link'

export default function HomeScreen() {

    return (
        <div>
            <h1>Home</h1>
            <Link href={'/sobre'}>
                Ir para a página sobre
            </Link>
        </div>
    )

}