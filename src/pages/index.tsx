import { Products } from "@/components/products/Products"

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 h-[86vh]">
        <div className=" col-span-8 h-[86vh] p-4 ">
          <Products />
        </div>
        <div className=" col-span-4  h-[86vh] p-4 ">

        </div>
      </div>
    </>
  )
}
