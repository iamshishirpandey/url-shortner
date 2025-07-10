
import { useState } from 'react'
import { Inter } from 'next/font/google'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { urlValidationSchema } from '../lib/validation'
import { FormValues, ShortenUrlResponse, ShortenUrlError } from '../types/url-shortener'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [result, setResult] = useState<ShortenUrlResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await axios.post<ShortenUrlResponse>('/api/shorten', {
        url: values.url
      })
      setResult(response.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as ShortenUrlError
        console.error('Error shortening URL:', errorData.error)
      } else {
        console.error('Error shortening URL:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className={`flex min-h-screen bg-slate-50 items-start  p-4 justify-center ${inter.className}`}
    >
      <div className="max-w-md w-full rounded-lg shadow-md border border-slate-200 bg-white p-2.5">
        <h1 className='text-2xl font-bold text-slate-900 mb-6 text-center'>URL Shortener</h1>
        
        <Formik
          initialValues={{ url: '' }}
          validationSchema={urlValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor='url' className='block text-sm font-medium text-slate-700 mb-2'>
                  Enter URL to shorten
                </label>
                <div className="flex gap-2.5">
                  <Field
                    className='w-full px-3 py-2.5 border rounded-md flex-2'
                    id="url"
                    type='text'
                    name="url"
                    placeholder="https://example.com"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className='w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 hover:shadow-sm flex-1 disabled:opacity-50'
                  >
                    {loading ? 'Generating...' : 'Generate'}
                  </button>
                </div>
                <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </Form>
          )}
        </Formik>

        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Shortened URL:</h2>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-green-700">Short URL:</span>
                <a
                  href={result.shortUrl}
                  target="_blank"
              
                  className="block text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {result.shortUrl}
                </a>
              </div>
              <div>
                <span className="text-sm font-medium text-green-700">Original URL:</span>
                <p className="text-sm text-gray-600 break-all">{result.original}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
