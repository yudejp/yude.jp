export default function Footer() {
    return (
        <div className="text-center text-gray-500 mb-5">
            <img alt="yude.jp banner" src="./banner_new.png" className="h-12 inline" />
            <img alt="happybusy" src="./busy_banner.webp" className="h-12 inline" />
            <img alt="Page view counter" src="https://moe-counter-cf.yude.workers.dev/yude.jp:home" className="h-20 mx-auto" />
            <p className="mt-5">
                <a href="https://github.com/yudejp/yude.jp">
                    &copy; 2024 yude
                </a>
            </p>
        </div>
    )
}
