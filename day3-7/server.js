const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { PrismaClient } = require('@prisma/client');
const { error } = require('console');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const bookController = require('./controllers/BookController');
app.use('/book', bookController);

const fileUpload = require('express-fileupload');
app.use(fileUpload());;
app.use('/upload', express.static('uploads'));

const cors = require('cors');
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/hello/:name', (req, res) => { //สร้างพารามิตเตอร์ nameขึ้นมา
    res.send('hello' + req.params.name); //เมื่อเช้าเว็ปไซต์/helloต้องมี/และชื่ออะไรก็ได้ต่อท้าย จะแสดงค่านั้นมาแทนค่า name ต่อจาก hello
});

app.get('/hi/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    // res.send(' name = ' + name + ' age =  ' + age);
    res.send(`name = ${name} age = ${age}`); //ใช้แบบนี้ง่ายกว่า

});

app.post('/hello', (req, res) => { //ชื่อ hello ซ้ำได้ ถ้าคนละ method
    res.send(req.body);
});

app.put('/myput', (req, res) => { // ใช้ในการอัพเดทข้อมูลในdatabase
    res.send(req.body);
});

app.put('/updateCustomer/:id', (req, res) => {
    const id = req.params.id; //สิ่งที่ใส่กับparams จะถูกมองเป็น string ก่อนเสมอ
    //const id = parseInt(req.params.id); //ใช้ในการแปลงค่า id ที่มากับ params เป็น int
    const data = req.body;

    // res.send('id = ' + id + ' data = ' + data);
    res.send({ id: id, data: data }); //ใช้json ให้ client อ่านค่า object ได้
});

app.delete('/myDelete/:id', (req, res) => {
    res.send('id = ' + req.params.id);
});

app.get('/book/list', async(req, res) => {
    const data = await prisma.book.findMany();
    res.send({ data: data });
});

app.post('/book/create', async(req, res) => {
    const data = req.body;
    const result = await prisma.book.create({ data: data });

    res.send({ result: result });
})

app.post('/book/createManual', async(req, res) => {
    const result = await prisma.book.create({
        data: {
            isbn: '1001',
            name: 'PHP',
            price: 850,

            isbn: '1002',
            name: 'CSS',
            price: 950,


            isbn: '1003',
            name: 'HTML',
            price: 1300,


            isbn: '1004',
            name: 'Java',
            price: 1500,

            isbn: '1005',
            name: 'Node js',
            price: 2300
        },
    })
    res.send({ result: result });
})

app.put('/book/update/:id', async(req, res) => {
    try {
        await prisma.book.update({
            data: {
                isbn: '10012',
                name: 'test update',
                price: 900
            },
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send({ message: 'success' })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.delete('/book/remove/:id', async(req, res) => {
    try {
        await prisma.book.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send({ message: 'success' })
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

app.post('/book/search', async(req, res) => {
    try {
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where: {
                name: {
                    contains: keyword
                }
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

app.post('/book/startWith', async(req, res) => {
    try {
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where: {
                name: {
                    startsWith: keyword
                }
            }
        })
        res.send({ result: data })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})
app.post('/book/endWith', async(req, res) => {
    try {
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where: {
                name: {
                    endsWith: keyword
                }
            }
        })
        res.send({ result: data })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/orderBy', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            orderBy: {
                price: 'desc'
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/gt', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                price: {
                    gt: 900
                }
            }
        })
        res.send({ result: data })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/lt', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                price: {
                    lt: 950
                }
            }
        })
        res.send({ result: data })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/notNull', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                detail: {
                    not: null
                }
            }
        })
        res.send({ result: data })
    } catch (e) {
        console(e);
        res.status(500).send({ error: e })
    }
})

app.get('/book/isNull', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                detail: null
            }
        })
        res.send({ result: data })
    } catch (e) {
        console(e);
        res.status(500).send({ error: e })
    }
})

app.get('/book/between', async(req, res) => {
    try {
        const data = await prisma.book.findMany({ //หาหรือแสดงข้อมูล
            where: {
                price: {
                    lte: 1500, //<= 1500 lte ต้องขึ้นก่อน gte
                    gte: 900 // >=900
                }
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get("/book/sum", async(req, res) => {
    try {
        const data = await prisma.book.aggregate({ //aggregate ใช้เมื่อต้องหาค่าหรือคำนวณ
            _sum: {
                price: true
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get("/book/max", async(req, res) => {
    try {
        const data = await prisma.book.aggregate({
            _max: {
                price: true
            }
        })

        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get("/book/min", async(req, res) => {
    try {
        const data = await prisma.book.aggregate({
            _min: {
                price: true
            }
        })
        res.send({ result: data })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get("/book/avg", async(req, res) => {
    try {
        const data = await prisma.book.aggregate({
            _avg: {
                price: true
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/findYearMonthDay', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                registerDate: new Date("2024-05-09")
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/findYearMonth', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                registerDate: {
                    gte: new Date('2024-05-09'),
                    lte: new Date('2024-05-12')
                }
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/book/findYear', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                registerDate: {
                    gte: new Date('2024-01-01'),
                    lte: new Date('2024-12-31')
                }
            }
        })
        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/user/createToken', (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const payload = {
            id: 100,
            name: 'frank',
            level: 'admin'
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1d' }); //กำหนดอายุของ token

        res.send({ token: token });
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/user/verifyToken', (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoiZnJhbmsiLCJsZXZlbCI6ImFkbWluIiwiaWF0IjoxNzE5OTc4MTc5LCJleHAiOjE3MjAwNjQ1Nzl9.P6M-w06xIc_qQTai7yxMODxNjFxw9mUoeEAbliQD-yg';
        const result = jwt.verify(token, secret);

        res.send({ result: result });
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

function checkSingIn(req, res, next) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret);
        if (result != undefined) {
            next();
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message })
    }
}

app.get('/user/info', checkSingIn, (req, res, next) => {
    try {
        res.send('hello back office user info');
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message })
    }
})

app.get('/oneToOne', async(req, res) => {
    try {
        const data = await prisma.orderDetail.findMany({
            include: {
                book: true
            }
        })

        res.send({ result: data })
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message });
    }
})

app.get('/oneToMany', async(req, res) => {
    try {
        const data = await prisma.book.findMany({
            include: {
                OrderDetail: true
            }
        })

        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/multiModel', async(req, res) => {
    try {
        const data = await prisma.customer.findMany({
            include: {
                Order: {
                    include: {
                        OrderDetail: true
                    }
                }
            }
        })

        res.send({ result: data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.post('/book/testUpload', (req, res) => {
    try {
        const myFile = req.files.myFile;

        myFile.mv('./uploads/' + myFile.name, (err) => {
            if (err) {
                res.status(500).send({ error: err })
            }
            res.send({ message: 'success' })
        })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/readFile', (req, res) => {
    try {
        const fs = require('fs');
        fs.readFile('test.txt', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data)
        })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/writeFile', (req, res) => {
    try {
        const fs = require('fs');
        fs.writeFile('test.txt', 'hello by frank', (err) => {
            if (err) {
                throw err;
            }
            res.send({ message: 'success' })
        })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/removeFile', (req, res) => {
    try {
        const fs = require('fs');
        fs.unlinkSync('test.txt');
        res.send({ message: 'success' })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/fileExists', (req, res) => { //เช็คว่ามีไฟลืนี้อยู่จริงหรือเปล่า
    try {
        const fs = require('fs');
        const found = fs.existsSync('package.json');

        res.send({ found: found })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/createPdf', (req, res) => {
    try {
        const PDFDocument = require('pdfkit');
        const fs = require('fs');
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream('output.pdf'));

        doc
            .font('Kanit/Kanit-Medium.ttf') //ใส่ font ภาษาไทย  
            .fontSize(25)
            .text('Some text with an embedded font!', 100, 250); //ด้านบน, ด้านข้าง
        doc
            .addPage()
            .fontSize(25)
            .text('สวัสดี ทดสอบสร้างภาพ pdf ....', 100, 250);
        doc.end();

        res.send({ message: 'success' })

    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.get('/readExcel', async(req, res) => {
    try {
        const excel = require('exceljs');
        const wb = new excel.Workbook();
        await wb.xlsx.readFile('productExport.xlsx');
        const ws = wb.getWorksheet(1);

        for (let i = 1; i < ws.rowCount; i++) {
            const row = ws.getRow(1);
            const barcode = row.getCell(1).value;
            const name = row.getCell(2).value;
            const cost = row.getCell(3).value;
            const sale = row.getCell(4).value;
            const send = row.getCell(5).value;
            const unit = row.getCell(6).value;
            const point = row.getCell(7).value;
            const productTypeId = row.getCell(8).value;

            console.log(barcode, name, cost, sale, send, unit, point, productTypeId);
        }

        res.send({ message: 'success' })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

//จบวันที่8 
app.listen(3001);

// ใช้ในการหาวันที่ หากใช้กับวันที่ต้องแปลงค่าด้วย
// return await prisma.journalTransactions.findMany({
//     where: {
//         date: {
//             lte: new Date("2022-02-30"),
//             get: new Date("2002-02-15"),
//         },
//     },
// });