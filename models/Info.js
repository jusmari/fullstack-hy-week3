var mongoose = require('mongoose')
mongoose.connect('mongodb://jupe:jupe@ds229438.mlab.com:29438/fullstack-hy')


const Info = mongoose.model('Info', {
    name: String,
    number: String
})

module.exports = Info