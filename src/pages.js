async function pageLanding(req, res) {
    if (req.query.knob_index != null) {
        var engine_result = await search_engine_met(req.query);

        return res.render("index.html",
            {
                tec_dic: engine_result.tec_dic,
                greater: engine_result.greater
            })
    }

    return res.render("index.html")
}

const search_engine_met = require('./../public/scripts/engine.js')

module.exports = pageLanding