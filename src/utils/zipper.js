import * as zip from "@zip.js/zip.js"

export const addShareToZip = async (writer, shareNum, blob) =>  {
  await writer.add(`share-${shareNum}.png`, new zip.BlobReader(blob))
}

export const createZip = async () => {
  return new zip.ZipWriter(new zip.BlobWriter("application/zip"))
}

export const downloadZip = async (zip) => {
  const zipBlob = await writer.close()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = "shares.zip"
  a.click()
}
