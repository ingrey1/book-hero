import { app } from './app';

/* istanbul ignore next */
const PORT = process.env.PORT || 8000;
/* istanbul ignore next */
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${PORT}`);
});
