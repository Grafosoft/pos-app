import { createContext, useContext, useState } from "react"
import { UrlContext } from ".."
import { SaleView } from "@/components/saleView/SaleView";
import { GetServerSideProps } from "next";
import { validateAppApi } from "@/api/validateAppApi";
import { EstructureColor, validateAppColor } from "@/utils/validateAppColor";
import axios, { AxiosInstance } from "axios";
import { NavBar } from "@/components/navbar/NavBar";

export interface VariablesTable {
    companyId: string
    apikey: string
    name: string
    functionApi: AxiosInstance
    color: EstructureColor
    idTable: number
}


interface Props {
    PropsServer: VariablesTable
}

export const UrlContextTable = createContext<VariablesTable>({
    companyId: '',
    apikey: '',
    name: '',
    functionApi: axios.create({}),
    color: {
        colorApp: 'ffff',
        colorProduct: '',
        colorComponent: 'primary'
    },
    idTable: 0
})

export default function TableSpecific({ PropsServer }: Props) {
    const { companyId, apikey, name, idTable } = PropsServer


    // FUNCTION VALIDATE APPCOLOR AND VALIDATE APP-API
    const functionApi = validateAppApi(name)
    const color = validateAppColor(name)

    return (
        <UrlContext.Provider
            value={{ companyId, apikey, functionApi, color, name }}
        >
            {/* <SaleView color={color} name={name} /> */}
            Cargo
        </ UrlContext.Provider>


    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const params = ctx.params
    const query = ctx.query
    console.log(params);


    const PropsServer = {
        companyId: query.companyId,
        apikey: query.apikey,
        name: params?.nameApp,
        idTable: params?.id
    }

    return {
        props: { PropsServer }
    }
}
