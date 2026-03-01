// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const connectDB = require('../config/db');
// const Course = require('../models/Course');
// const Year = require('../models/Year');
// const Division = require('../models/Division');
// const Subject = require('../models/Subject');
// const Faculty = require('../models/Faculty');
// const Student = require('../models/Student');
// const User = require('../models/User');

// dotenv.config({ path: __dirname + '/../.env' });

// async function seed() {
//   await connectDB(process.env.MONGO_URI);

//   // Clear relevant collections
//   await Promise.all([
//     Course.deleteMany({}),
//     Year.deleteMany({}),
//     Division.deleteMany({}),
//     Subject.deleteMany({}),
//     Faculty.deleteMany({}),
//     Student.deleteMany({}),
//     User.deleteMany({})
//   ]);

//   // Courses
//   const courseBtech = await Course.create({ courseId: 101, courseName: 'B.Tech' });
//   const courseMca = await Course.create({ courseId: 102, courseName: 'MCA' });

//   // Years
//   const year1 = await Year.create({ yearId: 1, yearName: 'First Year' });
//   const year2 = await Year.create({ yearId: 2, yearName: 'Second Year' });
//   const year3 = await Year.create({ yearId: 3, yearName: 'Third Year' });
//   const year4 = await Year.create({ yearId: 4, yearName: 'Fourth Year' });

//   // Divisions A,B for both courses and first year for seeding simplicity
//   const divA_btech = await Division.create({ divisionId: 1, divisionName: 'A', course: courseBtech._id, year: year1._id });
//   const divB_btech = await Division.create({ divisionId: 2, divisionName: 'B', course: courseBtech._id, year: year1._id });
//   const divA_mca = await Division.create({ divisionId: 1, divisionName: 'A', course: courseMca._id, year: year1._id });

//   // Subjects
//   const subj1 = await Subject.create({ subjectId: 201, subjectName: 'Mathematics', course: courseBtech._id, year: year1._id });
//   const subj2 = await Subject.create({ subjectId: 202, subjectName: 'Physics', course: courseBtech._id, year: year1._id });
//   const subj3 = await Subject.create({ subjectId: 301, subjectName: 'Advanced Algorithms', course: courseMca._id, year: year1._id });

//   // Faculty
//   const f1 = await Faculty.create({ facultyId: 1, name: 'Prof. Rajesh Verma', department: 'Computer Science', subjects: [subj1._id], faceId: 'face_f_1', nfcCardId: 'FAC1001' });
//   const f2 = await Faculty.create({ facultyId: 2, name: 'Dr. Amit Joshi', department: 'Electrical', subjects: [subj2._id], faceId: 'face_f_2', nfcCardId: 'FAC1002' });
//   const f3 = await Faculty.create({ facultyId: 3, name: 'Prof. Farhan Khan', department: 'CS', subjects: [subj3._id], faceId: 'face_f_3', nfcCardId: 'FAC1003' });

//   // Students list (realistic Indian names)
//   const studentsData = [
//     { name: 'Aarav Sharma', enrollmentNo: '2025BTECH001', faceId: 'face_s_1', nfcCardId: 'STU1001', division: divA_btech._id, course: courseBtech._id, year: year1._id },
//     { name: 'Rohan Patel', enrollmentNo: '2025BTECH002', faceId: 'face_s_2', nfcCardId: 'STU1002', division: divA_btech._id, course: courseBtech._id, year: year1._id },
//     { name: 'Imran Shaikh', enrollmentNo: '2025BTECH003', faceId: 'face_s_3', nfcCardId: 'STU1003', division: divB_btech._id, course: courseBtech._id, year: year1._id },
//     { name: 'Priya Mehta', enrollmentNo: '2025MCA001', faceId: 'face_s_4', nfcCardId: 'STU2001', division: divA_mca._id, course: courseMca._id, year: year1._id },
//     { name: 'Kavya Nair', enrollmentNo: '2025MCA002', faceId: 'face_s_5', nfcCardId: 'STU2002', division: divA_mca._id, course: courseMca._id, year: year1._id },
//     { name: 'Yash Desai', enrollmentNo: '2025BTECH004', faceId: 'face_s_6', nfcCardId: 'STU1004', division: divB_btech._id, course: courseBtech._id, year: year1._id },
//     { name: 'Sneha Kulkarni', enrollmentNo: '2025BTECH005', faceId: 'face_s_7', nfcCardId: 'STU1005', division: divA_btech._id, course: courseBtech._id, year: year1._id }
//   ];

//   for (const s of studentsData) {
//     await Student.create(s);
//   }

//   // Users: admin + faculty users
//   await User.create({ email: 'admin@college.edu', password: 'Admin@123', role: 'admin' });
//   await User.create({ email: 'rajesh.verma@college.edu', password: 'Faculty@123', role: 'faculty', profileRef: f1._id, profileModel: 'Faculty' });

//   console.log('Seeding completed');
//   process.exit(0);
// }

// seed().catch((err) => {
//   console.error('Seed error', err);
//   process.exit(1);
// });

// new code for more number of students and faculty with more realistic names and distribution across divisions, courses, and years.
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Year = require('../models/Year');
const Division = require('../models/Division');
const Subject = require('../models/Subject');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const User = require('../models/User');

dotenv.config({ path: __dirname + '/../.env' });

async function seed() {
  await connectDB(process.env.MONGO_URI);

  await Promise.all([
    Course.deleteMany({}),
    Year.deleteMany({}),
    Division.deleteMany({}),
    Subject.deleteMany({}),
    Faculty.deleteMany({}),
    Student.deleteMany({}),
    User.deleteMany({})
  ]);

  // =========================
  // COURSES (No need many)
  // =========================
  const courseBtech = await Course.create({ courseId: 101, courseName: 'B.Tech' });
  const courseMca = await Course.create({ courseId: 102, courseName: 'MCA' });

  // =========================
  // YEARS (Keep 4)
  // =========================
  const years = await Year.insertMany([
    { yearId: 1, yearName: 'First Year' },
    { yearId: 2, yearName: 'Second Year' },
    { yearId: 3, yearName: 'Third Year' },
    { yearId: 4, yearName: 'Fourth Year' }
  ]);

  // =========================
  // DIVISIONS (More realistic)
  // =========================
  const divisions = await Division.insertMany([
    { divisionId: 1, divisionName: 'A', course: courseBtech._id, year: years[0]._id },
    { divisionId: 2, divisionName: 'B', course: courseBtech._id, year: years[0]._id },
    { divisionId: 3, divisionName: 'C', course: courseBtech._id, year: years[0]._id },
    { divisionId: 4, divisionName: 'A', course: courseMca._id, year: years[0]._id },
    { divisionId: 5, divisionName: 'B', course: courseMca._id, year: years[0]._id }
  ]);

  // =========================
  // SUBJECTS (Increased)
  // =========================
  const subjects = await Subject.insertMany([
    { subjectId: 201, subjectName: 'Mathematics', course: courseBtech._id, year: years[0]._id },
    { subjectId: 202, subjectName: 'Physics', course: courseBtech._id, year: years[0]._id },
    { subjectId: 203, subjectName: 'Programming in C', course: courseBtech._id, year: years[0]._id },
    { subjectId: 204, subjectName: 'Data Structures', course: courseBtech._id, year: years[0]._id },
    { subjectId: 205, subjectName: 'Digital Electronics', course: courseBtech._id, year: years[0]._id },
    { subjectId: 301, subjectName: 'Advanced Algorithms', course: courseMca._id, year: years[0]._id },
    { subjectId: 302, subjectName: 'Machine Learning', course: courseMca._id, year: years[0]._id },
    { subjectId: 303, subjectName: 'Database Systems', course: courseMca._id, year: years[0]._id }
  ]);

  // =========================
  // FACULTY (10 Faculty)
  // =========================
  const facultyList = [];

  for (let i = 1; i <= 10; i++) {
    const faculty = await Faculty.create({
      facultyId: i,
      name: `Faculty Member ${i}`,
      department: 'Computer Science',
      subjects: [subjects[i % subjects.length]._id],
      faceId: `face_f_${i}`,
      nfcCardId: `FAC10${i}`
    });
    facultyList.push(faculty);
  }

  // =========================
  // STUDENTS (60 Students)
  // =========================
  const firstNames = ['Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Reyansh','Krishna','Ishaan','Shaurya','Atharva','Ayaan','Kabir','Rudra','Om','Ved','Dev','Aryan','Yash','Harsh'];
  const lastNames = ['Sharma','Patel','Mehta','Nair','Desai','Joshi','Kulkarni','Gupta','Singh','Khan','Iyer','Shah'];

  const students = [];

  let counter = 1;

  for (let i = 0; i < 60; i++) {
    const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];

    students.push({
      name: `${fname} ${lname}`,
      enrollmentNo: `2025BTECH${String(counter).padStart(3, '0')}`,
      faceId: `face_s_${counter}`,
      nfcCardId: `STU${1000 + counter}`,
      division: divisions[i % divisions.length]._id,
      course: i % 2 === 0 ? courseBtech._id : courseMca._id,
      year: years[0]._id
    });

    counter++;
  }

  await Student.insertMany(students);

  // =========================
  // USERS
  // =========================
  await User.create({ email: 'admin@college.edu', password: 'Admin@123', role: 'admin' });

  for (let i = 0; i < facultyList.length; i++) {
    await User.create({
      email: `faculty${i + 1}@college.edu`,
      password: 'Faculty@123',
      role: 'faculty',
      profileRef: facultyList[i]._id,
      profileModel: 'Faculty'
    });
  }

  console.log('Seeding completed with 60 students & 10 faculty');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error', err);
  process.exit(1);
});