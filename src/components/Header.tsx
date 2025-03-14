interface HeaderProps {
    dict: {
        howItWorks: string
        benefits: string
        faq: string
        blog: string
        tryForFree: string
    }
}

export default function Header({ dict }: HeaderProps) {
    return (
        <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-5">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <h1 className="text-2xl font-bold text-primary">Perfect Wedding</h1>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li><a href="#como-funciona" className="text-gray-600 hover:text-primary">{dict.howItWorks}</a></li>
                            <li><a href="#beneficios" className="text-gray-600 hover:text-primary">{dict.benefits}</a></li>
                            <li><a href="#faq" className="text-gray-600 hover:text-primary">{dict.faq}</a></li>
                            <li><a href="/blog" className="text-gray-600 hover:text-primary">{dict.blog}</a></li>
                        </ul>
                    </nav>
                    <div>
                        <a href="#cadastro" className="btn-primary">{dict.tryForFree}</a>
                    </div>
                </div>
            </div>
        </header>
    )
} 