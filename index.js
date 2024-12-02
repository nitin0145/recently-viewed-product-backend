const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { initFirebase } = require('./utils/firebase');
const { initRedis } = require('./utils/redis');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.yaml');
const requestLogger = require('./middlewares/requestLogger');

dotenv.config();

const app = express();
app.use(express.json());
app.use(requestLogger);

// Initialize Firebase and Redis
initFirebase();
initRedis();

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
