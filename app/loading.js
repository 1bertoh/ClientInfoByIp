const { default: Image } = require("next/image")
import gif from '@/public/loading/loading.gif'

const Loading = () => {
    console.log(gif)
    return(
        <div>
            {/* <Image src={} /> */}
        </div>
    )
}

module.exports = Loading