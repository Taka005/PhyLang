module.exports = (FileDate)=>{
  return FileDate
    .replace(/「/g,"(")
    .replace(/」/g,")")
}