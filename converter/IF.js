module.exports = (FileDate)=>{
  return FileDate
    .replace(/もし(.*?)ならば(.*?)をする/g,"if($1){\n\t$2\n}\n\n")
}