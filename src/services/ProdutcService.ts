import { api } from "./api"

export interface IProductImage {
    id: string;
    path: string;
}

export interface IProduct {
    id: string
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    user_id: string,
    is_active: boolean,
    created_at: string,
    updated_at: string
}

type PaymentKeys = 'pix' | 'card' | 'boleto' | 'cash' | 'deposit'

export interface IProductDetails extends IProduct {
    payment_methods: {
        key: PaymentKeys,
        name: string
    }[];
    product_images: IProductImage[];
    user: {
        avatar: string
        name: string
        tel: string
    }
}

interface IProductCreate {
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: string[]
}

export class ProductService {
    static async create(data: IProductCreate): Promise<IProduct> {
        try {
            const response = await api.post('/products', data)
            return response.data
        } catch (error) {
            throw error
        }
    }
    static async getAll(): Promise<IProductDetails[]> {
        try {
            const response = await api.get('/products')
            return response.data
        } catch (error) {
            throw error
        }
    }

    static async get(productId: string): Promise<IProductDetails> {
        try {
            const response = await api.get(`/products/${productId}`)
            return response.data
        } catch (error) {
            throw error
        }
    }
    static async update(product: IProductCreate, id: string) {
        try {
            const response = await api.put(`/products/${id}`, product)
            return response.data
        } catch (error) {
            throw error
        }
    }

    static async active(id: string, active: boolean) {
        try {
            await api.patch(`/products/${id}`, { is_active: active })
        } catch (error) {
            throw error
        }
    }
    static async delete(id: string) {
        try {
            await api.delete(`/products/${id}`)
        } catch (error) {
            throw error
        }
    }
}