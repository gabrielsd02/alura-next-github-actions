import NextLink from 'next/link';

export default function HomeScreen() {

    return (
        <div>
            <h1>Home</h1>
            <NextLink href={'/sobre'}>
                <a>Ir para a página sobre</a>
            </NextLink>
        </div>
    )

}