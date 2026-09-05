// Connect to mongodb using mongoose 
require("dotenv").config();

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

console.log("MONGODB_URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((err) => {
    console.log(err);
});

// Schema - It defines the all fields to store data in databse, and it is also known as model.

const AdminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },

    Address: {
        type: String,
        required: true,
    },

    Contact: {
        type: Number,
        required: true,
    },

    Email: {
        type: String,
        required: true,
        unique: true,
    },
});

// Second Schema like as Admindata and it's name logindata

const LoginSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },

    Password: {
        type: String,
        required: true,
    },

    usertype: {
        type: String,
        required: true,
    },
});

const MedicalSchema = new mongoose.Schema({
    Medicalname: {
        type: String,
        required: true,
    },

    OwnerName: {
        type: String,
        required: true,
    },

    Address: {
        type: String,
        required: true,
    },

    Contact: {
        type: Number,
        required: true,
    },

    LicenceNumber: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
        unique: true,
    },
})

const MedicineSchema = new mongoose.Schema({
    MedicineName: {
        type: String,
        required: true,
    },

    MedicineType: {
        type: String,
        required: true,
    },

    MedicineCompany: {
        type: String,
        required: true,
    },

    LicenseNumber: {
        type: String,
        required: true,
    },

    UnitPrice: {
        type: String,
        required: true,
    },

    Description: {
        type: String,
        required: true,
    },
    MedicalEmail: {
        type: String,
        required: true,
    }

});

//Schema of uploaded photos
const PhotosSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },

    filename: {
        type: String,
        required: true,
    },
});


// Create Collection

const AdminData = mongoose.model('admindata', AdminSchema);
// AdminData.createIndexes();

const LoginData = mongoose.model('logindata', LoginSchema);
// LoginData.createIndexes();

const MedicalData = mongoose.model('medicaldata', MedicalSchema);
// MedicalData.createIndexes();

const MedicineData = mongoose.model('MedicineData', MedicineSchema);
// MedicineData.createIndexes();

const PhotoData = mongoose.model('photodata', PhotosSchema);
// PhotoData.createIndexes();



// Generate API - Application Program Inteface.

const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use('/public/photos', express.static('public/photos'));


app.use(cors());
app.use(express.json());

app.use(cookieParser());

//configure session
app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, httpOnly: false, domain: "localhost" } // session timeout of 60 seconds
}));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/photos")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage });

console.log("Service strated at http://localhost:5000");


app.post("/get_profile_photo", async (req, res) => {
    try {

        const eml = req.body.eml;

        const photo = await PhotoData.findOne({
            Email: eml
        });

        if (photo) {
            return res.json({
                filename: photo.filename
            });
        }

        res.json(null);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Server Error"
        });
    }
});


app.post('/uploadfile', upload.single('file'), async (req, res) => {
    try {

        const email = req.body.Email;

        const oldPhoto = await PhotoData.findOne({ Email: email });

        if (oldPhoto) {
            const fs = require("fs");
            const oldPath = path.join(__dirname, "public", "photos", oldPhoto.filename);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            await PhotoData.deleteOne({ Email: email });
        }

        const photo = new PhotoData({
            Email: email,
            filename: req.file.filename
        });

        await photo.save();

        res.json({
            success: true,
            filename: req.file.filename
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false
        });
    }
});


app.get("/public/photos/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "public", "photos", filename);

    // Check if file exists
    const fs = require('fs');
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send({ "error": "Image not found" });
    }
});


app.post("/delete_admin_photo", async (req, res) => {
    try {

        const email = req.body.Email;

        const photo = await PhotoData.findOne({
            Email: email
        });

        if (!photo) {
            return res.status(404).json({
                msg: "Photo not found"
            });
        }

        const fs = require("fs");
        const imagePath = path.join(
            __dirname,
            "public",
            "photos",
            photo.filename
        );

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await PhotoData.deleteOne({
            Email: email
        });

        res.json({
            success: true,
            msg: "Photo deleted"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
});



// Admin Registration 

app.post('/getadminreg', async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const nm = req.body.name.trim();
        const addr = req.body.address.trim();
        const cont = req.body.contact.trim();
        const eml = req.body.email.trim().toLowerCase();
        const pass = req.body.password;
        const utype = "admin";

        // Duplicate email check in LoginData
        const existingEmail = await LoginData.findOne({ Email: eml });

        if (existingEmail) {
            return res.json({
                success: false,
                Message: "Email already registered"
            });
        }

        const adm = new AdminData({
            Name: nm,
            Address: addr,
            Contact: cont,
            Email: eml
        });

        const lgn = new LoginData({
            Email: eml,
            Password: pass,
            usertype: utype
        });

        const Result1 = await adm.save();
        const Result2 = await lgn.save();

        if (Result1 && Result2) {
            return res.json({
                success: true,
                Message: "Admin registered successfully"
            });
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            Message: "Something went wrong please try-again"
        });
    }
});
// Here is we get medical registration data 
app.post('/getmedicalreg', async (req, res) => {
    try {
        console.log("Received Data : ", req.body);

        const mednm = req.body.medicalname.trim();
        const ownnm = req.body.ownername.trim();
        const addr = req.body.address.trim();
        const cont = req.body.contact.trim();
        const lno = req.body.licno.trim();
        const eml = req.body.email.trim().toLowerCase();
        const pass = req.body.password;
        const utype = "medical";

        // Check email in LoginData
        const existingEmail = await LoginData.findOne({ Email: eml });

        if (existingEmail) {
            return res.json({
                success: false,
                Message: "Email already registered"
            });
        }

        const meddata = new MedicalData({
            Medicalname: mednm,
            OwnerName: ownnm,
            Address: addr,
            Contact: cont,
            LicenceNumber: lno,
            Email: eml
        });

        const logdata = new LoginData({
            Email: eml,
            Password: pass,
            usertype: utype
        });

        const Result = await meddata.save();
        const Result2 = await logdata.save();

        if (Result && Result2) {
            return res.json({
                success: true,
                Message: "Medical store registered successfully"
            });
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            Message: "Something went wrong please try-again"
        });
    }
});

// Here we show admin details and data

app.get('/showAdminsDetails', async (req, res) => {
    try {
        const admins = await AdminData.find();
        res.json(admins);
        console.log(admins);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error:
                "Something went wrong try-again"
        });
    }
});

// Here we show medical data and details 

app.get('/showmedical', async (req, res) => {
    try {
        const medicals = await MedicalData.find();
        res.json(medicals);


    } catch (error) {
        console.log(error);
        res.json({
            message: "Something went wrong try-again"
        })
    }
});

// Fetch medical store data for editing and updating

app.post('/editmedicaldata', async (req, res) => {
    try {
        // console.log("Received :" , req.body);
        const eml = req.body.id;

        const Medical = await MedicalData.findOne({ Email: eml });
        res.json(Medical);

    } catch (error) {
        console.log(error);
        res.json({
            Error: 'Something went wrong try-again'
        })
    }
});

// Update medical store data using MongoDB commands

app.post('/updatemedical', async (req, res) => {
    try {
        // console.log("Received :" , req.body);
        const mednm = req.body.medicalname;
        const ownnm = req.body.ownername;
        const addr = req.body.address;
        const cont = req.body.contact;
        const lino = req.body.licno;
        const eml = req.body.id;

        const filter = { Email: eml };

        const medicalupdate = { Medicalname: mednm, OwnerName: ownnm, Address: addr, Contact: cont, LicenceNumber: lino };

        const Results = await MedicalData.findOneAndUpdate(filter, medicalupdate, { new: true });

        console.log(Results);

        res.json({
            data: 'success',
            message: 'Data updated successfully'
        })
        if (Results) {
            console.log('Data updated');
        }
        else {
            console.log('Data not updated');
        }

    } catch (error) {
        console.log(error);
        res.json({
            Error: 'Something went wrong try-again'
        })
    }
});


// Here we show delete Medical Store Data in form and get medical store details using email id..

app.post('/showmedicaldata', async (req, res) => {
    try {
        // console.log("Received :" , req.body);
        const eml = req.body.id;

        const ShowDelete = await MedicalData.findOne({ Email: eml });
        res.json(ShowDelete);


    } catch (error) {
        console.log(error);
        res.json({
            Error: 'Somehting went wrong try-again'
        });
    }
});

// This API deletes the selected medical store data from MongoDB database

app.post('/deletemedicalstore', async (req, res) => {
    try {
        //  console.log("Received :" , req.body);
        const em = req.body.id;

        const Medic = await MedicineData.deleteOne({ MedicalEmail: em });
        const MedDelete = await LoginData.deleteOne({ Email: em });
        const MedicalDelete = await MedicalData.deleteOne({ Email: em }).then(function () {
            res.json({
                mesg: 'Data deleted'
            })
        }).catch(function () {
            res.json({
                mesg: 'Not deleted'
            })
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error: 'Something went wrong try-again'
        })
    }
});

// fetch Medicine Registration Data 

app.post("/getmedicinereg", async (req, res) => {
    try {
        // console.log("Received Data :", req.body);
        const mnm = req.body.medicinename;
        const mty = req.body.medicinetype;
        const mcomp = req.body.medicinecompany;
        const lno = req.body.licensenumber;
        const unpr = req.body.unitprice;
        const descri = req.body.description;
        const email_medical = session.email;
        const medicidata = new
            MedicineData({ MedicineName: mnm, MedicineType: mty, MedicineCompany: mcomp, LicenseNumber: lno, UnitPrice: unpr, Description: descri, MedicalEmail: email_medical });

        let result = await medicidata.save();

        let Results = await result.toObject();

        if (Results) {

            res.json({
                success: true,
                Data: 'Data Saved'
            });
            console.log(req.body);
        }

    } catch (error) {
        console.log(error);
        res.json({
            message: "Something went wrong try-again"
        });
    }
});



app.get('/getMedicinesData', async (req, res) => {
    try {
        const em1 = session.email;
        const responseData = await MedicineData.find({ MedicalEmail: em1 });

        res.status(200).json(responseData);

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: "Something went wrong try-again"
            }
        )
    }
});



app.post('/showEditMedicine', async (req, res) => {
    try {
        // console.log("Received Data :", req.body);
        const receivedRes = req.body.id;

        const MedicineForm = await MedicineData.findOne({ _id: receivedRes });

        res.json(MedicineForm);

    } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                message: 'Something went wrong try-again'
            }
        )
    }
});



app.post('/editandupdatemedicines', async (req, res) => {
    try {

        console.log("Received Data :", req.body);
        const menm = req.body.medicinename;
        const mety = req.body.medicinetype;
        const mecomp = req.body.medicinecompany;
        const lino = req.body.licensenumber;
        const unpri = req.body.unitprice;
        const desc = req.body.description;
        const Id = req.body.id;

        const filter = { _id: Id }

        const medicineUpdate = { MedicineName: menm, MedicineType: mety, MedicineCompany: mecomp, LicenseNumber: lino, UnitPrice: unpri, Description: desc }

        const updatedMedicines = await MedicineData.findOneAndUpdate(filter, medicineUpdate, { new: true });

        if (!updatedMedicines) {
            return
            res.status(404).json(
                {
                    success: false,
                    message: "Data not updated"
                }
            );
        }

        res.status(200).json(
            {
                success: true,
                message: 'Data updated'
            }
        );


    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                message: "Something went wrong try again"
            }
        );
    }
});


app.post('/getmedicinedata', async (req, res) => {
    try {
        // console.log("Received :", req.body);
        const id = req.body.id;

        const recieveresp = await MedicineData.findOne({ _id: id });

        res.json(recieveresp);


    }
    catch (error) {
        console.log(error);
        res.status(500).json(
            {
                message: "Something went wrong try again"
            }
        );

    }
});



app.post('/deletemedicinedata', async (req, res) => {
    try {
        console.log("Received :", req.body);

        const id = req.body.id;

        const DeleteMedicine = await MedicineData.deleteOne({ _id: id }).then(function () {
            res.json(
                {
                    success: true,
                    Data: "Data deleted"
                }
            )
        }).catch(function () {
            res.json(
                {
                    success: false,
                    Data: "Data not deleted"
                }
            )
        });


    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                message: "Something went wrong try again"
            }
        );

    }
})


app.post('/check_login', async (req, res) => {
    try {
        console.log(req.body);
        const eml = req.body.email;
        const passw = req.body.password;

        const record = await LoginData.findOne({ Email: eml, Password: passw });

        console.log(record);
        if (record != null) {
            //creat session parameters and store values
            session.email = record.Email;
            session.usertype = record.usertype;
            session.isLoggedIn = true;

            res.json({
                msg: "Found",
                usertype: record.usertype
            });
        }
        else {
            res.json({ msg: "Not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error: 'Something went wrong try again'
        })
    }
})


app.post('/changePasswordAdmin', async (req, res) => {
    try {
        if (session.isLoggedIn) {

            console.log("Received Data :", req.body);

            const oldpass = req.body.oldpassword;
            const newpass = req.body.newpassword;
            const cnewpass = req.body.confirmnewpassword;
            const eml = session.email;

            // Empty field validation
            if (!oldpass || !newpass || !cnewpass) {
                return res.json({
                    msg: "Please fill all fields"
                });
            }

            // Password match validation
            if (cnewpass !== newpass) {
                return res.json({
                    msg: "New password and confirm password do not match"
                });
            }

            // Old password check + update
            const filter = {
                Email: eml,
                Password: oldpass
            };

            const UpdatePassword = {
                Password: newpass
            };

            const record = await LoginData.findOneAndUpdate(
                filter,
                UpdatePassword,
                { new: true }
            );

            console.log("After Update :", record);

            if (record) {
                return res.json({
                    msg: "successful"
                });
            } else {
                return res.json({
                    msg: "old password incorrect"
                });
            }

        } else {
            return res.json({
                msg: "session out"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong try again'
        });
    }
});



app.post('/updateMedicalPassword', async (req, res) => {

    try {
        if (session.isLoggedIn) {
            // console.log("Recieved Data :", req.body);

            const old = req.body.oldpassword;
            const NewPassw = req.body.newpassword;
            const Confirm = req.body.confirmnewpassword;
            const eml = session.email;

            // Password match validation
            if (Confirm !== NewPassw) {
                return res.json({
                    msg: "New password and confirm password do not match"
                });
            }

            const filter = { Password: old, Email: eml };
            const UpdatePass = { Password: NewPassw };

            const Record = await LoginData.findOneAndUpdate(filter, UpdatePass, { new: true });

            console.log("After Update :", Record);

            if (Record) {
                res.status(200).json(
                    {
                        msg: 'successful',
                    }
                )

            }
            else {
                res.json(
                    {
                        msg: "failure"
                    }
                )
            }

        }
        else {
            res.json({
                msg: "session out"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: "Something went wrong try again"
            }
        );
    }
});



app.get('/getAdminprofile', async (req, res) => {
    try {
        const eml = session.email;

        const AdminRecord = await AdminData.findOne({ Email: eml });

        console.log("Admin record receive :", AdminRecord);

        res.json(AdminRecord);

    } catch (error) {
        console.log(error);
        res.json({
            Error: "Something went wrong try-again"
        });
    }
})



app.get('/showMedicalProfile', async (req, res) => {
    try {
        console.log("Received :", session.email);
        const eml = session.email;

        const MedicalRecord = await MedicalData.findOne({ Email: eml });

        console.log(MedicalRecord);

        res.json(MedicalRecord);

    } catch (error) {
        console.log(error);
        res.json({
            Error: "Something went wrong try-again"
        });
    }
});


// search medicines by user or customer


app.get('/showandsearchmedicines', async (req, res) => {
    try {
        const serach_medicinesrecord = await MedicineData.aggregate([{
            $lookup: {
                from: 'medicaldatas',
                localField: 'MedicalEmail',
                foreignField: 'Email',
                as: 'medical'
            }
        }])

        res.json(serach_medicinesrecord);
        console.log("Received : ", serach_medicinesrecord);

    } catch (error) {
        console.log(error);
        res.json({
            Error: "Something went wrong try-again"
        });
    }
})


// SEARCH MEDICINE USING REGEX AND LOOKUP (FIXED)


app.post('/searchmedicines', async (req, res) => {
    try {
        const s = req.body.search;

        if (!s || s.trim() === "") {
            return res.json([]);
        }

        // Aggregate pipeline use karenge taaki regex filter ke sath-sath store details bhi join ho sakein
        const searchMedicine = await MedicineData.aggregate([
            {
                $match: {
                    MedicineName: { $regex: s.trim(), $options: 'i' }
                }
            },
            {
                $lookup: {
                    from: 'medicaldatas',
                    localField: 'MedicalEmail',
                    foreignField: 'Email',
                    as: 'medical'
                }
            }
        ]);

        console.log("The Searching Medicine is :", searchMedicine);
        res.json(searchMedicine);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error: "Something went wrong try-again"
        });
    }
});


app.get("/logout", (req, res) => {

    session.isLoggedIn = false;
    session.email = "";
    session.usertype = "";

    console.log("After Logout :", session);

    res.json({
        msg: "success"
    });
});


app.get("/isUser", (req, res) => {

    console.log("Checking Session :", session);

    if (session.isLoggedIn) {
        res.json({
            usertype: session.usertype,
            email: session.email
        });
    }
    else {
        res.json({
            usertype: "nouser"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});