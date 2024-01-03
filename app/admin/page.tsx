'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'

const Admin = () => {
    const [url, setUrl] = useState()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>()

    return (
        <div className='max-w-3xl mx-auto'>
            <div className='flex gap-3 pb-5 p-3'>
                <Input placeholder='URL cần crawl' value={url} onChange={(e: any) => setUrl(e.target.value)} />
                <Button onClick={() => {
                    setLoading(true)
                    axios.get('/api/puppeteer?url=' + url)
                        .then(
                            data => setData(data.data?.result)
                        )
                        .catch(err => setData(err))
                        .finally(()=>setLoading(false))
                }}>{loading ? "loading..." : "Cào dữ liệu"}</Button>
            </div>
            <div>
                {JSON.stringify(data)}
            </div>
        </div>
    )
}

export default Admin