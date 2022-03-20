// rules {type: 'image/jpeg',size: 3}
interface rulesType {
  type: string[]
  size: number
}
function uploadCheck(e: FileList, rules: rulesType): boolean {
  const uploadFile = e[0]
  return (
    rules.type.includes(uploadFile.type) &&
    uploadFile.size < rules.size * 1024 * 1024
  )
}

export default uploadCheck
