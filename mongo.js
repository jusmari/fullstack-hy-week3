var mongoose = require('mongoose')
const dbpw = process.env.DBPW
mongoose.connect('mongodb://jupe:jupe@ds229438.mlab.com:29438/fullstack-hy')

const Info = mongoose.model('Info', {
    name: String,
    number: String
})

const name = process.argv[2]
const number = process.argv[3]

if (name && number) {
    const info = new Info({
        name: name,
        number: number
    })
    
    info
    .save()
    .then(response => {
        console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
        mongoose.connection.close()
    })
} else {
    Info
    .find({})
    .then(result => {
        result.forEach(i => {
            console.log(i.name + ' ' + i.number)
        })
        mongoose.connection.close()
    })
}
