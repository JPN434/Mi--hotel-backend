const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    if (req.userTipo === 'administrador')
        {  // Verificamos si el rol es 'administrador'
        next(); 
    } else {
        return res.status(403).json({ message: 'No autorizado, necesitas ser administrador' });
    }
};

module.exports = isAdmin;
