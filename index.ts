const express = require("express")
var bodyParser = require("body-parser")
const app = express()
const port = 3001

app.use(bodyParser.json())
app.listen(port, () => {
  console.log(`Cumple app listening on port ${port}`)
})

function getCumple(request) {
  /* let cumple = require('./cumples.json') */
  let cumple = request
  let BirthdayOf = cumple.members.find((c) => c.id == cumple.id)
  let Gifts = request.gifts; 
  if (!BirthdayOf){
    return {"code": '1', "message": 'No existe cumpleanero'}
  }

  if (Gifts.length <= 0){
    return {"code": '4', "message": 'Cumpleanero sin regalos', "value": Gifts}
  }

  let Members = cumple.members.filter((m) => m.id != BirthdayOf.id)
  console.log("/****CUMPLEANERO****************/")
  console.log(BirthdayOf)
  let TotalPrice = cumple.gifts.reduce((a, b) => {
    return a + b.price
  }, 0)
  let TotalPerMember = TotalPrice / Members.length
  let TotalMembers = Members.length;
  console.log("/****REGALOS********************/")
  console.log(cumple.gifts)
  console.log("/****MIEMBROS*******************/")
  console.log(Members)
  console.log("/****TOTAL A PAGAR POR PERSONA**/")
  console.log(
    "Total per Person is: $" +
    TotalPerMember.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  )

  if (TotalMembers == 0){
    return {"code": '2', "message": 'No existen miembros', "value": TotalMembers}
  }

  if (TotalPrice <= 0){
    return {"code": '3', "message": 'Precio total invalido', "value": TotalPrice}
  }
  
  return {
    BirthdayOf,
    TotalPrice,
    TotalMembers,
    TotalPerMember
  }
}

app.post("/Cumple/Calculate", (req, res) => {
  res.send(getCumple(req.body))
})
