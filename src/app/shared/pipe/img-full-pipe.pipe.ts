import { Pipe, PipeTransform } from '@angular/core'
import { environment } from 'environments/environment'
import { DEFAULT_IMG } from '../config/core.config'
import { FileServerInfo } from '../interface/core.interface'
import { AuthService } from '../service/complex/auth.service'

@Pipe({
    name: 'imgFullPipe',
})
export class ImgFullPipePipe implements PipeTransform {
    fileServerInfo!: FileServerInfo
    defaultImg = DEFAULT_IMG

    constructor(private auth: AuthService) {
        this.getFileServerInfo()
    }

    transform(value: any): any {
        !this.fileServerInfo && this.getFileServerInfo()

        const defaultImg = this.getPathByKey(value)
        if (defaultImg) {
            return defaultImg
        }

        let dir = this.fileServerInfo.pic_path
        let host = this.fileServerInfo.localhost
        let head = 'http'
        if (environment.production) {
            //線上圖片位址
            host = this.fileServerInfo.host
            head = 'https'
        }

        return `${head}://${host}/${dir}/${value}`
    }

    getFileServerInfo() {
        this.fileServerInfo = this.auth.getData.FileServerInfo()
    }

    getPathByKey(key: string) {
        const obj = Object.values(this.defaultImg).find((obj) => obj.key === key)
        if (obj) {
            return `./assets/${obj.path}`
        }
        return null
    }
}
