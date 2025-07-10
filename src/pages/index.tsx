import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen bg-slate-50 items-start  p-4 justify-center ${inter.className}`}
    >
      <div className="max-w-md w-full rounded-lg shadow-md border border-slate-200 bg-white p-2.5">
        <h1 className='text-2xl font-bold text-slate-900 mb-6 text-center'>URL Shortner</h1>
        <div >
          <label htmlFor='url' className='block text-sm font-medium text-slate-700 mb-2'>
            Enter URL to shorten
          </label>
          <div className="flex gap-2.5">

          <input className='w-full px-3 py-2.5 border rounded-md flex-2' id="url" type='text' name="url" />
          <button className='w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 hover:shadow-sm flex-1 '>Generate</button>
          </div>
        </div>
      </div>
    </main>
  )
}
