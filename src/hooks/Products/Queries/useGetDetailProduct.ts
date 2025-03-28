import { QUERY_KEY } from "~/constants/queryKey"
import { ProductServices } from "~/services/products.service"
import { useQuery } from "@tanstack/react-query"

export const useGetDetailProduct = (id: string)=>{
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, id],
        queryFn: async()=>{
            const data = await ProductServices.getDetailProduct(id)
            return data.data
        }
    })
}
