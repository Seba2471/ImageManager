export const fileExtensionErrorHandlindMiddleware = (err, req, res, next) => {
  if (err) {
    res.status(403).send('Bad extension');
  } else {
    next();
  }
};
