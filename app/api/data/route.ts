import { NextResponse } from "next/server";
import axios from "axios";
import client from "../../prismadb";



export async function GET(request: Request) {
    const data = await client.data.findMany({

    })
    return NextResponse.json(data)
}

export async function POST(request: Request) {
    const { id } = await request.json()
    const data = await client.data.delete({
        where: {
            id
        }
    })
    return NextResponse.json(data)
}