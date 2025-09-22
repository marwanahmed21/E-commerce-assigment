import Image from "next/image";

export default function NotFound() {
    return (
        <main>
            <nav>
                <Image
                style={{objectFit:"cover", width:'100%', height:"100%"}}
                    width={0}
                    height={0}
                    src={'/assets/error.svg'}
                    alt=""
                />
            </nav>
        </main>
    );
}
