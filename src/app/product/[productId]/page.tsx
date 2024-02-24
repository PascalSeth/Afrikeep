
import AddtoCartbutton from "@/components/AddtoCartbutton"
import ImageSlider from "@/components/ImageSlider"
import ProductReel from "@/components/ProductReel"
import { PRODUCT_CATEGORIES } from "@/config"
import { getPayloadClient } from "@/get-payload"
import { formatPrice } from "@/lib/utils"
import { Check, Shield } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "path"

interface PageProps{
    params:{
    productId: string
    }
}

const BREADCRUMBS =[
    {id:1, name:"Home",href:'/'},
    {id:2, name:"Products",href:'/products'},
    {id:2, name:"Products",href:'/products'}

]
const Page = async({params}:PageProps)=> {
    const { productId }= params
    const payload= await getPayloadClient()

    const {docs:products} = await payload.find({
        collection:'products',
        limit:1,
        where:{
            id: {
                equals:productId,  
            },
            approvedForSale:{
                equals: 'approved'
            }
        }

    }) 


    const [product]=products  
      const label = PRODUCT_CATEGORIES.find(({value})=>value===product.category
    )?.label
    if(!product) return notFound()
    const validUrls = product?.images.map(({image})=>
  
    typeof image==='string'?image:image.url).filter(Boolean) as string[]
    return (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 ">
            {/*Product Details */}
            <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
                {BREADCRUMBS.map((breadcrumb,i)=>(
                   <li key={breadcrumb.href}>
                    <div className="flex items-center text-sm">
                    <Link href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-800">
                        {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length -1 ? (
  <h1 className="mx-0 text-center text-gray-500">/</h1>
                    ):null}
 </div>
                   </li>
                ))}
            </ol>
            <div className="mt-4">
                <h1
                 className="text-3xl font-bold tracking-wide text-gray-500 sm:text-4xl"
                >{product.name}</h1>

            </div>
            <section className="mt-4">
                <div className="flex items-center">
                            <p className="font-medium text-gray-500">
                                {formatPrice(product.price)}
                            </p>
                            <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                                {label}
                            </div>
                </div>
                <div className="mt-4 space-y-6">
                <p className=" text-base text-muted-foreground">
                    {product.description}
                </p>
                </div>

                <div className="mt-6 flex items-center">
                    <Check 
                    aria-hidden='true'
                    className="h-5 w-5 flex-shrink-0 text-green-500"/>
                    <p className="ml-2 text-sm text-muted-foreground">
                        Eligible for Instant Delivery
                    </p>
                </div>
            </section>
            </div>

            {/*Product Images */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center ">
                <div className="aspect-square rounded-lg">
                    <ImageSlider urls={validUrls}/>
                </div>
            </div>

            <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-center ">
                <div>
                    <div className="mt-10">
                        <AddtoCartbutton product={product}/>
                    </div>
                    <div className="mt-6 text-center">
                        <div className="group inline-flex text-sm text-muted">
              <Shield aria-hidden="true" className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"/>
                        <span className="text-muted-foreground hover:text-gray-600 ">
                            30 Day Return Guarantee
                        </span>
                        </div>
                        </div>
                </div>
            </div>

        </div>
      <ProductReel
      href="/products"
      query={{catergory: product.category,limit:4}}
      title={`Similar ${label}`}
      subtitle={`Browse similar high quality ${label} just like ${product.name}`}/>
    </div>
  )
}
export default Page
