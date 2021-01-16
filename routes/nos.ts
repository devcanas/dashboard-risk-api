import express from "express"
const router = express.Router()

router.route("/norange/:date").get((req, res, _) => {
    res.status(200).send(`Getting nos data for ${req.params.date} without range`)
})

router.route("/:date").get((req, res, _) => {
    res.status(200).send(`Getting nos data for ${req.params.date}`)
})

router.route("/concelho").get((req, res, _) => {
    res.status(200).send(`Getting nos data for ${req.params.date}`)
})

router.route("*").get((req, res, _) => {
    res.status(404).send()
})

module.exports = router
