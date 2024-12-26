import { api } from "./api";

export class ProductImageService {
    static async add(productId: string, images: string[]) {
        try {

            const formData = new FormData();
            formData.append('product_id', productId)
            images.forEach(img =>
                formData.append('images', img)
            )

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            await api.post('/products/images', formData, config);

        } catch (error) {
            throw error
        }
    }
    static async delete(imageId: string,) {
        try {
            const payload = {
                images: [imageId]
            }

            await api.delete('/products/images', { data: payload });

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}