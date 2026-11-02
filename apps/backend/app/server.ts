//make sure to make a database url b4 running this

import app from "./app.module";
import { env } from "./config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

