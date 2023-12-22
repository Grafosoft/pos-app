import { NavBar } from '@/components/navbar/NavBar'
import { useEffect, useState } from 'react'

export default function Home() {
  const numerosDel1al100 = Array.from({ length: 520 }, (_, index) => index + 1)
  const [caja, setcaja] = useState('')


  useEffect(()=>{
    console.log('NEW COMPONET')
    const cajaArrastrar = document.querySelector('#caja');

    for (let i = 0; i < numerosDel1al100.length; i++) {
      console.log(`soltar-${i}`);
      let soltarctual =  document.querySelector(`#soltar-${numerosDel1al100[i].toString()}`)

      soltarctual.addEventListener('dragover', (e)=>{
        e.preventDefault()
        console.log("Se previene");
      })

      soltarctual.addEventListener('drop',(e)=>{
        console.log("SUELTO", numerosDel1al100[i]);
        const cajaElement = document.querySelector('#caja')

        soltarctual.appendChild(cajaElement);
      })
    }

    cajaArrastrar.addEventListener('dragend', e =>{
      console.log("SUELTO");
    })


  },[caja])

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div className="h-[100vh] flex flex-wrap content-start">
            {numerosDel1al100.map((element, index) => {
              return (
                <div id={`soltar-${numerosDel1al100[index].toString()}`} className="flex items-center justify-center w-[40px] h-[40px] bg-danger-50 ">
                  <div></div>
                </div>
              )
            })}
          </div>
        </div>
        <div id='caja' className="col-span-1 p-10">
            <div className='bg-primary w-10 h-10 flex items-center justify-center' draggable="true">
                THE 
            </div>
        </div>
      </div>
    </div>
  )
}
