use PPM

db.createCollection("santri");

db.santri.insertOne({
nama: "Nurrahmi",
kelas: "VII A",
asrama: "Fatimah Atas"})

db.santri.find();
db.santri.find({ kelas: "VII A"})

db.santri.updateOne(
  { nama: "Nurrahmi"},
  { $set: { asrama: "Khadijah Atas"}});

db.santri.deleteOne({ nama: "Nurrahmi"})

db.santri.bulkWrite([
  {
    insertOne: {
      document: {
        nama: "Nurrahmi",
        kelas: "VII A",
        asrama: "Fatimah Atas"
      }
    }
  },
  {
    insertOne: {
      document: {
        nama: "Aisyah",
        kelas: "VIII B",
        asrama: "Khadijah Bawah"
      }
    }
  },
  {
    insertOne: {
      document: {
        nama: "Fatimah",
        kelas: "IX A",
        asrama: "Aisyah Tengah"
      }
    }
  }
]);

db.santri.find({ asrama: { $ne: "Khadijah Bawah" } })

db.santri.find({
  $nor: [
    { kelas: "VII A" },
    { asrama: "Khadijah Bawah" }
  ]
});

db.santri.aggregate([
  {
    $count: "total_santri"
  }
])

db.createCollection("santri_validated", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nama", "kelas", "asrama"],
      properties: {
        nama: {
          bsonType: "string",
          description: "Harus berupa string dan wajib diisi"
        },
        kelas: {
          bsonType: "string",
          description: "Harus berupa string dan wajib diisi"
        },
        asrama: {
          bsonType: "string",
          description: "Harus berupa string dan wajib diisi"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

db.santri_validated.insertOne({
  nama: "Amir",
  kelas: 8,
  asrama: "Ali Bawah"
})

db.santri_validated.insertOne({
  nama: "Zahra",
  kelas: "VII B",
  asrama: "Fatimah Atas"
});