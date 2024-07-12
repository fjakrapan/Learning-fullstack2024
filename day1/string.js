let str = 'Java Script Language';
console.log(str);
console.log(str.length); // str.length ไว้เช็คว่ามีอักษรกี่ตัว

str = str.replace('Java', 'PHP'); // str.replace() ใช้แทนที่คำโดยในตัวอย่าง php แทน java
console.log(str);

str = str.concat(' 2024'); // str.concat() เป็นการเติมคำ
console.log(str);
console.log(str.indexOf('Script')); // str.indexOf() หาตัวแหน่งข้อความ นับจาก 0
console.log(str.lastIndexOf('2024')); // Str.lastIndexOf() หาตำแหน่งที่ลงท้ายด้วยข้อความที่อยู่ในคำสั่ง ( )
