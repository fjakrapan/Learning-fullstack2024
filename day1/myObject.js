class Car {
    color;
    run() {
        console.log('run');
    }
    info() {
        console.log('color is ' + this.color); //this มีไว้ใช้เรียกใช้ color เพื่อรอแทนค่าให้กับ color
    }
}

const c = new Car(); //กำหนดตัวโปร c โดยให้ = class Car
c.run(); //รันคำสั่ง run 
c.color = 'red'; //access properties ให้color = red
c.info(); //รัยคำสั่ง info