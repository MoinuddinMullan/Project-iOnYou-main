// Simple smoke test script using global fetch (Node 18+)
(async () => {
  const base = 'http://localhost:5000';
  try {
    console.log('Starting smoke tests...');

    // Login as admin
    const loginRes = await fetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@college.edu', password: 'Admin@123' })
    });
    if (!loginRes.ok) throw new Error('Login failed: ' + (await loginRes.text()));
    const loginJson = await loginRes.json();
    const token = loginJson.token;
    console.log('Logged in, token received');

    // Get students
    const studentsRes = await fetch(base + '/api/students', { headers: { Authorization: `Bearer ${token}` } });
    if (!studentsRes.ok) throw new Error('Failed fetching students: ' + (await studentsRes.text()));
    const students = await studentsRes.json();
    console.log('Students count:', students.length);
    if (!students.length) throw new Error('No students found in DB');
    const student = students[0];

    // Create a class
    const createClassRes = await fetch(base + '/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ subjectId: 201, facultyId: 1, courseId: 101, yearId: 1, divisionId: 1 })
    });
    if (!createClassRes.ok) throw new Error('Create class failed: ' + (await createClassRes.text()));
    const classObj = await createClassRes.json();
    console.log('Class created:', classObj._id || classObj);

    // Mark attendance for student (should match)
    const markRes = await fetch(base + '/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ classId: classObj._id, faceId: student.faceId, nfcCardId: student.nfcCardId })
    });
    const markJson = await markRes.json();
    console.log('Mark attendance response:', markJson);

    // Get attendance by class
    const attClassRes = await fetch(base + `/api/attendance/class/${classObj._id}`, { headers: { Authorization: `Bearer ${token}` } });
    const attClass = await attClassRes.json();
    console.log('Attendance records for class:', attClass.length);

    // Get attendance by student
    const attStudentRes = await fetch(base + `/api/attendance/student/${student._id}`, { headers: { Authorization: `Bearer ${token}` } });
    const attStudent = await attStudentRes.json();
    console.log('Attendance records for student:', attStudent.length);

    console.log('SMOKE TESTS PASSED');
    process.exit(0);
  } catch (err) {
    console.error('SMOKE TESTS FAILED:', err);
    process.exit(2);
  }
})();
