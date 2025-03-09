import Image from 'next/image'

interface HeroProps {
    dict: {
        title: string
        subtitle: string
        description: string
        tryNow: string
        learnMore: string
    }
}

export default function Hero({ dict }: HeroProps) {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex-1 md:pr-12 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {dict.title}
                        </h1>
                        <h2 className="text-xl md:text-2xl mb-6 text-gray-600">
                            {dict.subtitle}
                        </h2>
                        <p className="text-lg mb-8 text-gray-600 max-w-2xl">
                            {dict.description}
                        </p>
                        <div className="flex gap-4">
                            <a href="#cadastro" className="btn-primary">
                                {dict.tryNow}
                            </a>
                            <a href="#como-funciona" className="btn-secondary">
                                {dict.learnMore}
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <Image
                            src="/images/hero-bride-desktop.webp"
                            alt="Noiva experimentando vestido virtualmente"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 