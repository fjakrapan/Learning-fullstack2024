const d = new Date();
console.log(d.getFullYear());
console.log(d.getMonth() + 1);
console.log(d.getDate());
console.log(d.getDay() + 1);
console.log(d.getHours());
console.log(d.getMinutes());
console.log(d.getSeconds());
console.log(d.getMilliseconds());

// ในการใช้ getMonth ควรเพิ่ม +1 เข้าไปด้วยเพราะคอมพิวเตอร์นับตั้งแต่เลข 0 
// หากไม่เพิ่ม +1 ตัวเลขการแสดง เดือน จะน้อยกว่าความเป็นจริง 1 getMonth()+1
// getdate ใช้แสดงวันที่ แต่ detday จะแสดงวันในสัปดาห์นั้นๆ 
// โดยเริ่มจากวันอาทิตย์ คือ 0 และเรียงไปเรื่อยๆ แนะนำให้ใส่ +1 เพื่อความเข้าใจง่ายของคนอ่าน 
// getday()+1