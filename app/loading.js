const { default: Image } = require("next/image")
import gif from '@/public/loading/loading.gif'

const loading = () => {
    return(
        <div>
            <Image alt='loading' src={gif.src} />
        </div>
    )
}

module.exports = loading