const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Year = require('../models/Year');
const Division = require('../models/Division');
const Subject = require('../models/Subject');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const ClassModel = require('../models/Class');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

dotenv.config({ path: __dirname + '/../.env' });

function uniqueEnrollment(prefix, idx) {
  return `${prefix}${String(idx).padStart(3, '0')}`;
}

async function ensureCourses() {
  const need = 2; // ensure at least 2 courses
  const existing = await Course.find();
  if (existing.length >= need) return existing;
  const toCreate = [];
  if (!existing.find(c => c.courseId === 101)) toCreate.push({ courseId: 101, courseName: 'B.Tech' });
  if (!existing.find(c => c.courseId === 102)) toCreate.push({ courseId: 102, courseName: 'MCA' });
  if (toCreate.length) await Course.insertMany(toCreate);
  return await Course.find();
}

async function ensureYears() {
  const wanted = [1,2,3,4];
  for (const y of wanted) {
    const found = await Year.findOne({ yearId: y });
    if (!found) await Year.create({ yearId: y, yearName: `${y}${['st','nd','rd','th'][Math.min(y-1,3)] || 'th'} Year` });
  }
  return await Year.find();
}

async function ensureDivisions(courses, years) {
  // create divisions A,B for each course-year combination
  const labels = ['A','B'];
  for (const c of courses) {
    for (const y of years) {
      for (let i=0;i<labels.length;i++){
        const divId = (y.yearId*10) + (i+1);
        const exists = await Division.findOne({ divisionId: divId, course: c._id, year: y._id });
        if (!exists) {
          await Division.create({ divisionId: divId, divisionName: labels[i], course: c._id, year: y._id });
        }
      }
    }
  }
  return await Division.find();
}

async function ensureSubjects(courses, years) {
  // ensure at least 10 subjects total
  const count = await Subject.countDocuments();
  const subjectsNeeded = Math.max(0, 10 - count);
  const sampleNames = ['Mathematics','Physics','Chemistry','Data Structures','Algorithms','Database Systems','Operating Systems','Networks','Machine Learning','Software Engineering','Advanced Algorithms','Microprocessors','Embedded Systems'];
  const created = [];
  // find current max subjectId to avoid duplicates
  const maxSub = await Subject.findOne().sort({ subjectId: -1 }).lean();
  let nextId = maxSub && maxSub.subjectId ? maxSub.subjectId + 1 : 301;
  for (let i=0;i<subjectsNeeded;i++){
    const name = sampleNames[i % sampleNames.length] + (i>0?` ${i}`:'');
    const course = courses[i % courses.length];
    const year = years[i % years.length];
    const subjectId = nextId++;
    try {
      const s = await Subject.create({ subjectId, subjectName: name, course: course._id, year: year._id });
      created.push(s);
    } catch (err) {
      // skip duplicates or other issues
      console.warn('Skipping subject creation error', err.message || err);
    }
  }
  return await Subject.find();
}

async function ensureFaculty(subjects) {
  const count = await Faculty.countDocuments();
  const needed = Math.max(0, 10 - count);
  const names = ['Rajesh Verma','Amit Joshi','Farhan Khan','Sanjay Rao','Meera Iyer','Nikhil Gupta','Priya Singh','Anita Desai','Karan Mehta','Lata Rao','Vikram Shah','Rohit Bose'];
  const created = [];
  for (let i=0;i<needed;i++){
    const idx = count + i + 1;
    const subjectRefs = [subjects[i % subjects.length]._id];
    const faceId = `face_f_${idx}`;
    const nfc = `FAC10${String(idx).padStart(2,'0')}`;
    const f = await Faculty.create({ facultyId: idx, name: names[i % names.length], department: 'Computer Science', subjects: subjectRefs, faceId, nfcCardId: nfc });
    created.push(f);
  }
  return await Faculty.find();
}

async function ensureStudents(courses, years, divisions) {
  const count = await Student.countDocuments();
  const needed = Math.max(0, 10 - count);
  const names = ['Aarav Sharma','Rohan Patel','Imran Shaikh','Priya Mehta','Kavya Nair','Yash Desai','Sneha Kulkarni','Ananya Roy','Deepak Kumar','Mansi Shah','Aditya Singh','Naveen Kumar'];
  const created = [];
  for (let i=0;i<needed;i++){
    const idx = count + i + 1;
    const course = courses[i % courses.length];
    const year = years[i % years.length];
    // pick a division matching course/year
    const division = divisions.find(d => String(d.course) === String(course._id) && String(d.year) === String(year._id)) || divisions[0];
    const enrollmentPrefix = course.courseName === 'MCA' ? '2025MCA' : '2025BTECH';
    const enrollment = uniqueEnrollment(enrollmentPrefix, idx);
    const faceId = `face_s_${idx}`;
    const nfc = `STU10${String(idx).padStart(2,'0')}`;
    const s = await Student.create({ enrollmentNo: enrollment, name: names[i % names.length], course: course._id, year: year._id, division: division._id, faceId, nfcCardId: nfc });
    created.push(s);
  }
  return await Student.find();
}

async function ensureClasses(subjects, faculty, courses, years, divisions) {
  const count = await ClassModel.countDocuments();
  const needed = Math.max(0, 10 - count);
  const created = [];
  for (let i=0;i<needed;i++){
    const subj = subjects[i % subjects.length];
    const fac = faculty[i % faculty.length];
    const course = courses[i % courses.length];
    const year = years[i % years.length];
    const division = divisions.find(d => String(d.course) === String(course._id) && String(d.year) === String(year._id)) || divisions[0];
    const cls = await ClassModel.create({ subject: subj._id, faculty: fac._id, course: course._id, year: year._id, division: division._id, timestamp: new Date() });
    created.push(cls);
  }
  return await ClassModel.find();
}

async function ensureAttendance(students, classes) {
  const count = await Attendance.countDocuments();
  const needed = Math.max(0, 10 - count);
  const created = [];
  for (let i=0;i<needed;i++){
    const student = students[i % students.length];
    const cls = classes[i % classes.length];
    const status = (i % 3 === 0) ? 'Absent' : 'Present';
    // avoid duplicates
    const exists = await Attendance.findOne({ student: student._id, class: cls._id });
    if (exists) continue;
    const a = await Attendance.create({ student: student._id, class: cls._id, status, verificationMethod: 'Face+NFC', timestamp: new Date() });
    created.push(a);
  }
  return await Attendance.find();
}

async function ensureUsers(faculty) {
  // ensure admin exists and a faculty user per faculty
  const admin = await User.findOne({ email: 'admin@college.edu' });
  if (!admin) await User.create({ email: 'admin@college.edu', password: 'Admin@123', role: 'admin' });
  for (let i=0;i<faculty.length && i<8;i++){
    const f = faculty[i];
    const email = f.name.toLowerCase().replace(/\s+/g,'.') + '@college.edu';
    const exists = await User.findOne({ email });
    if (!exists) await User.create({ email, password: 'Faculty@123', role: 'faculty', profileRef: f._id, profileModel: 'Faculty' });
  }
  return await User.find();
}

async function run() {
  await connectDB(process.env.MONGO_URI);
  const courses = await ensureCourses();
  const years = await ensureYears();
  const divisions = await ensureDivisions(courses, years);
  const subjects = await ensureSubjects(courses, years);
  const faculty = await ensureFaculty(subjects);
  const students = await ensureStudents(courses, years, divisions);
  const classes = await ensureClasses(subjects, faculty, courses, years, divisions);
  const attendance = await ensureAttendance(students, classes);
  const users = await ensureUsers(faculty);

  console.log('Seed more completed: counts ->', {
    courses: await Course.countDocuments(),
    years: await Year.countDocuments(),
    divisions: await Division.countDocuments(),
    subjects: await Subject.countDocuments(),
    faculty: await Faculty.countDocuments(),
    students: await Student.countDocuments(),
    classes: await ClassModel.countDocuments(),
    attendance: await Attendance.countDocuments(),
    users: await User.countDocuments()
  });
  process.exit(0);
}

run().catch(err => { console.error('seedMore error', err); process.exit(1); });
