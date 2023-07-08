
export const fileToBase64 = async (file: File | Blob): Promise<string> =>
  await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.readAsDataURL(file)
    reader.onerror = reject
  })

export const base64ToFile = (base64: string): string => {
  return base64
}
