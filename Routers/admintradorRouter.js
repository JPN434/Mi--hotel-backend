const isAdmin = require('../middleware/authAdministardor');

router.post('/hoteles', isAdmin, createHotel);
router.put('/hoteles/:id', isAdmin, updateHotel);
router.delete('/hoteles/:id', isAdmin, deleteHotel);
