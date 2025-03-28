import { ProductServices } from "~/services/products.service"
import { useQuery } from "@tanstack/react-query"

export const useGetRelatedProduct = (id: string)=>{
    return useQuery({
        queryKey: ['RELATED', id],
        queryFn: async()=>{
            const data =  await ProductServices.getRelatedProduct(id)
            return data.data
        }
    })
}
