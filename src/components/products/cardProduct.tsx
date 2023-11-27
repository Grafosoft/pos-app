import { FC } from "react";
import { Avatar, Card, CardBody, CardHeader, Image } from '@nextui-org/react';

interface Props {
    precioProducto: number | string;
    nombreProducto: string;
    categoriaProducto: string;
    imgProducto?: string | null;
}

export const CardProduct: FC<Props> = ({ precioProducto, nombreProducto, categoriaProducto, imgProducto }) => {

    return (
        <div className="flex justify-center h-[25vh]">
            <Card className="p-1  w-[250vh] " isPressable onPress={() => console.log("Targeta precionada")}>
                <CardHeader className="p-0 flex-col items-center">
                    {(imgProducto && (imgProducto.length > 3)) ?
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={imgProducto}
                            width={270} />
                        : <div className="pt-5">
                            <div className="flex items-center justify-center bg-purple-100 rounded-full w-[10vh] h-[9vh] mb-0 "><span className="text-3xl uppercase dark:text-black ">{(nombreProducto.substring(0, 3)).replace(/\s+/g, '')}</span></div>
                        </div>}
                </CardHeader>
                <CardBody className="px-5 py-0 flex overflow-visible items-center justify-center mt-0">
                    <p className="text-tiny uppercase font-bold text-center">{nombreProducto}</p>
                    <small className="text-default-500 text-center">{categoriaProducto}</small>
                    <h4 className="font-bold text-large">$ {precioProducto}</h4>
                </CardBody>
            </Card>
        </div>
    )
}
