if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false }))



app.get('/' , (req, res) => {
    res.render('shop.ejs')
})


app.listen(process.env.PORT || 3000)