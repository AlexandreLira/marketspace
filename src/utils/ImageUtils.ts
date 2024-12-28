export class ImageUtils {
    static url(path: string) {
        if(path){
            return `http://192.168.0.7:3333/images/${path}`
        }
    }
}