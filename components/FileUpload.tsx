// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Trash2, CloudUpload } from 'lucide-react'
// import Image from 'next/image'
// import api from '@/lib/axiosInstance'
// import { cn } from '@/lib/utils'

// interface FileUploadProps {
//   label?: string
//   maxSizeMB?: number
//   onUploadSuccess?: (data: any) => void
// }

// export function FileUpload({
//   label = 'Service - Image (1st)',
//   maxSizeMB = 4,
//   onUploadSuccess
// }: FileUploadProps) {
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [file, setFile] = useState<File | null>(null)
//   const [preview, setPreview] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   // Preview handling
//   useEffect(() => {
//     if (!file) return
//     const url = URL.createObjectURL(file)
//     setPreview(url)

//     return () => URL.revokeObjectURL(url)
//   }, [file])

//   const validateAndSetFile = (selected: File) => {
//     if (selected.size / 1024 / 1024 > maxSizeMB) {
//       alert(`Maximum file size is ${maxSizeMB}MB`)
//       return
//     }
//     setFile(selected)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0]
//     if (selected) validateAndSetFile(selected)
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     const dropped = e.dataTransfer.files?.[0]
//     if (dropped) validateAndSetFile(dropped)
//   }

//   const removeFile = () => {
//     setFile(null)
//     setPreview(null)
//     if (inputRef.current) inputRef.current.value = ''
//   }

//   const handleUpload = async () => {
//     if (!file) return alert('Please select a file')
//     try {
//       setLoading(true)
//       const formData = new FormData()
//       formData.append('photo', file)
//       formData.append('title', "Service Image")
//       formData.append('specialistId', '12345') // Example specialist ID

//       const res = await api.post('/media/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })

//       console.log(res)

//       onUploadSuccess?.(res.data)
//       removeFile()
//     } catch (err) {
//       console.error(err)
//       alert('Upload failed')
//     } finally {
//       setLoading(false)
//     }
//   }




//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between text-sm font-medium">
//         <span>{label}</span>
//         <span className="text-muted-foreground">Maximum of 1 Image</span>
//       </div>

//       {!file && (
//         <div
//           onClick={() => inputRef.current?.click()}
//           onDrop={handleDrop}
//           onDragOver={(e) => e.preventDefault()}
//           className={cn(
//             'cursor-pointer rounded-md border-2 border-dashed',
//             'border-purple-400 bg-pink-100 p-10 text-center',
//             'transition hover:bg-pink-200'
//           )}
//         >
//           <div className="flex flex-col items-center gap-3">
//             <CloudUpload className="h-10 w-10 text-purple-700" />

//             <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
//               Browse
//             </Button>

//             <p className="text-sm text-muted-foreground">or drag & drop</p>

//             <div className="flex w-full justify-between text-xs text-muted-foreground pt-4">
//               <span>JPG, PNG, WEBP</span>
//               <span>Max {maxSizeMB}MB</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {file && (
//         <div className="flex items-center justify-between rounded-md bg-pink-200 p-4">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 overflow-hidden rounded bg-white">
//               {preview && (
//                 <Image
//                   src={preview}
//                   alt="preview"
//                   width={48}
//                   height={48}
//                   className="object-cover"
//                 />
//               )}
//             </div>

//             <div className="text-sm">
//               <p className="font-medium">{file.name}</p>
//               <p className="text-muted-foreground">
//                 {(file.size / 1024 / 1024).toFixed(1)} MB
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <Button size="sm" onClick={handleUpload} disabled={loading}>
//               {loading ? 'Uploading...' : 'Upload'}
//             </Button>

//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={removeFile}
//               className="text-red-600"
//             >
//               <Trash2 className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       )}

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         hidden
//         onChange={handleChange}
//       />
//     </div>
//   )
// }



'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, CloudUpload } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  label?: string
  maxSizeMB?: number
  onUpload: (file: File) => Promise<any>
  onUploadSuccess?: (data: any) => void
}

export function FileUpload({
  label = 'Service - Image (1st)',
  maxSizeMB = 4,
  onUpload,
  onUploadSuccess
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Generate preview
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  const validateAndSetFile = (selected: File) => {
    if (selected.size / 1024 / 1024 > maxSizeMB) {
      alert(`Maximum file size is ${maxSizeMB}MB`)
      return
    }
    setFile(selected)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) validateAndSetFile(selected)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) validateAndSetFile(dropped)
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file')
      return
    }

    try {
      setLoading(true)
      const data = await onUpload(file)
      onUploadSuccess?.(data)
      removeFile()
    } catch (error) {
      console.error(error)
      alert('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">Maximum of 1 Image</span>
      </div>

      {!file && (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            'cursor-pointer rounded-md border-2 border-dashed',
            'border-purple-400 bg-pink-100 p-10 text-center',
            'transition hover:bg-pink-200'
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <CloudUpload className="h-10 w-10 text-purple-700" />

            <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
              Browse
            </Button>

            <p className="text-sm text-muted-foreground">
              or drag & drop
            </p>

            <div className="flex w-full justify-between pt-4 text-xs text-muted-foreground">
              <span>JPG, PNG, WEBP</span>
              <span>Max {maxSizeMB}MB</span>
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="flex items-center justify-between rounded-md bg-pink-200 p-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded bg-white">
              {preview && (
                <Image
                  src={preview}
                  alt="preview"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              )}
            </div>

            <div className="text-sm">
              <p className="font-medium">{file.name}</p>
              <p className="text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleUpload} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={removeFile}
              className="text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </div>
  )
}

