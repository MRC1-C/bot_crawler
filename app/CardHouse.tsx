import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import React from 'react'

const CardHouse = (props: any) => {
  return (
    <div className='w-full aspect-square flex flex-col gap-3 p-2 ring-1 ring-purple-500 shadow-xl rounded-xl'>
      <img src={props["Hình ảnh nhà"]} className='w-full aspect-video object-cover' />
      <div className='font-bold'>{props['Tiêu đề']}</div>
      <div className='flex gap-4'>
        <div className='font-medium'>Giá:</div>
        <div className='font-bold text-purple-500'>{props['Giá nhà']}</div>
      </div>
      <div className='flex gap-4'>
        <div className='font-medium'>Người bán:</div>
        <div className='font-bold '>{props['Người bán']}</div>
      </div>
      <div className='flex gap-4'>
        <div className='font-medium'>Địa điểm:</div>
        <div className='font-bold '>{props['Địa điểm']}</div>
      </div>
      <div className='font-bold'>Mô tả</div>
      <ScrollArea className="h-32 w-ful rounded-md border">

        <div className='p-3'>{props['Mô tả']}</div>
      </ScrollArea>
      {/* <div onClick={()=>{
        axios.post('/api/data',{
          id: props.id
        })
      }}>Xoá</div> */}
    </div>
  )
}

export default CardHouse