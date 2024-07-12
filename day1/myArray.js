let arr = [1, 3, 5, 7, 9, 11];
console.log(arr);
arr.push(13); //arr.push() หรือ arr.concat() เพิ่มสมาชิก arr.concat() ไม่นิยมใช้

console.log(arr);
console.log(arr.length); //length คืนค่า arr นับจำนวนในarr ในนี้คือ 7 
console.log(arr.indexOf(7));
console.log(arr.reverse()); //arr.reverse() กลับด้าน เรียงน้อยไปมาก  มากไปน้อย
arr.pop(); //arr.pop() นำสมาชิกตัวท้ายสุดออก
console.log(arr)
console.log(arr.concat(15));