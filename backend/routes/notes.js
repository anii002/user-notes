const noteval = require("../controller/noteval.controller");
const auth = require("../middleware/auth");
var router = require("express").Router();

router.get('/all', auth, noteval.getAll)
router.post("/", auth, noteval.create);

router.put("/:id", noteval.update);

router.delete("/:id", noteval.delete);

module.exports = router;
