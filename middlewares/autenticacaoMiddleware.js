class autenticacaoMiddleware {
  validar(req, res, next) {
    const rotasLiberadas = ['/', '/login'];  // ou ajuste para as rotas que não precisam de login

    if (rotasLiberadas.includes(req.path)) {
      return next();
    }

    if (req.cookies.usuarioLogado === "admin") {
      return next();
    }

    return res.redirect('/');
  }
}

module.exports = autenticacaoMiddleware;
