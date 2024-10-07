import Image from 'next/image';

export default function ImagenNosotros() {
    return (
        <Image
            src="/img/Logo.jpg"
            alt="Nuestro taller"
            width={600}
            height={300}
            className="w-full h-[300px] object-contain rounded-lg mb-8"
        />
    );
}
