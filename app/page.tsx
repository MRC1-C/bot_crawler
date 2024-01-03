'use client'
import { useState } from 'react'
import CardHouse from './CardHouse'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState([])
  useState(() => {
    axios.get('/api/data')
      .then((dt: any) => setData(dt.data))
  }, [])
  return (
    <main className="h-screen flex flex-col">
      <div>
        <div className='font-bold text-xl p-3 self-center'>Máy cào dữ liệu bất động sản</div>
        <div className="grid grid-cols-4 gap-3 p-3">

          {
            data.map((dt: any) => <CardHouse id={dt.id} {...dt.data[0]} />)
          }
        </div>
      </div>
    </main>
  )
}
