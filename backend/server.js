import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoute.js';
import feeStructureRoutes from './routes/feeStructure.routes.js';
import classRoutes from './routes/classRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import classRoutineRoutes from './routes/classRoutineRoutes.js';
import paymentRoute from './routes/payment.js';
import invoiceRoute from './routes/invoice.js';
import studyMaterialRoute from './routes/studyMeterial.js';
import attendanceRoutes from './routes/attendance.js';
import eventRoutes from './routes/eventRoute.js';
import inquiry from './routes/inquiry.js'
import galleryRoute from './routes/gallery.js'

import cookieParser from 'cookie-parser';
import {errorHandler} from './middleware/errorHandler.js';
import { associateModels } from './models/index.js';
import User from './models/user.model.js';
// import User from './models/user.model.js';
// import { hash } from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/fee-structures', feeStructureRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/classroutines', classRoutineRoutes);
app.use('/api/payment', paymentRoute);
app.use('/api/invoice', invoiceRoute);
app.use('/api/studymaterials', studyMaterialRoute);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/submitInquiry',inquiry)
app.use('/api/gallery', galleryRoute)

// const createAdminUser = async () => {
//   try {
//     const existingAdmin = await User.findOne({ where: { role: 'admin' } });
//     if (existingAdmin) {
//       console.log('Admin user already exists');
//       return;
//     }

//     const hashedPassword = await hash("admin123", 10);
//     await User.create({
//       username: 'Admin',
//       email: "admin@school.com",
//       password: hashedPassword,
//       role: 'admin',
//     });

//     console.log('Admin user created successfully');
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//   }
// }

// createAdminUser();




// Error handler middleware
app.use(errorHandler);


// // Sync DB and start server
// sequelize.sync({ force: false }).then(() => {
//   associateModels();
//   app.listen(process.env.PORT, () => {
//     const defaultUser = {
//   email: "admin@apollo.com",
//   password: "Apollo123" // hashed in DB
// };

// User.findOne({ email: defaultUser.email }).then(user => {
//   if (!user) User.create(defaultUser);
// });
//     console.log(`Server running on port ${process.env.PORT}`);
//   });
// });

sequelize.sync({ force: false }).then(() => {
  associateModels();
  app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);

    // Default user
    const defaultUser = {
      username: 'Admin',
      email: "admin@apollo.com",
      password: "Apollo123",
      role: 'admin',
    };

    try {
      // Check if user already exists
      const user = await User.findOne({ where: { email: defaultUser.email } });
      if (!user) {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
        await User.create({
          username: defaultUser.username,
          email: defaultUser.email,
          password: hashedPassword,
          role: defaultUser.role,
        });
        console.log("Default admin user created");
      } else {
        console.log("Default admin user already exists");
      }
    } catch (err) {
      console.error("Error creating default user:", err);
    }
  });
});

