const express = require("express");
const app = express();
const multer = require("multer");

let uid = "12345";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/uploads/");
  },
  filename: function (req, file, cb) {
    let date = new Date().getTime();
    cb(null, uid + date + ".jpg");
  },
});

var upload = multer({ storage: storage });
var mv = require("mv");

app.set("view engine", "hbs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

var techIcons = [
  {
    src: "https://img.icons8.com/small/32/000000/nodejs.png",
    name: "Node Js",
  },
  {
    src: "public/assets/next-js.png",
    name: "Next Js",
  },
  {
    src: "https://img.icons8.com/ios/50/000000/react-native--v2.png",
    name: "React Js",
  },
  {
    src: "https://img.icons8.com/ios-filled/50/000000/typescript.png",
    name: "TypeScript",
  },
];

var DateDiff = {
  inMinutes: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / 1000);
  },

  inHours: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (3600 * 1000));
  },

  inDays: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  },
};

let projects = [];

app.get("/", function (req, res) {
  res.render("index", { projects });
});

app.get("/project-add", function (req, res) {
  res.render("project-add", { techIcons });
});

app.post("/project-add", upload.single("image"), function (req, res) {
  let dateStart = new Date(req.body.dateStart);
  let dateEnd = new Date(req.body.dateEnd);
  let diff =
    DateDiff.inMonths(dateStart, dateEnd) < 1
      ? DateDiff.inDays(dateStart, dateEnd) + " hari"
      : DateDiff.inMonths(dateStart, dateEnd) + " bulan";
  projects.push({
    ...req.body,
    dateDiff: diff,
    techs: [...req.body.checked].map((e) => techIcons[e].src),
    image: req.file.filename,
  });
  res.redirect("/");
});

app.get("/project-edit", function (req, res) {
  let dataProject = projects[req.query.id];
  let techs = [
    ...techIcons.map(function (e) {
      return { ...e, isChecked: false };
    }),
  ];
  [...dataProject.checked].map((i) => (techs[i].isChecked = true));
  res.render("project-edit", { id: req.query.id, dataProject, techs });
});

app.post("/project-edit", upload.single("image"), function (req, res) {
  let dateStart = new Date(req.body.dateStart);
  let dateEnd = new Date(req.body.dateEnd);
  let diff =
    DateDiff.inMonths(dateStart, dateEnd) < 1
      ? DateDiff.inDays(dateStart, dateEnd) + " hari"
      : DateDiff.inMonths(dateStart, dateEnd) + " bulan";
  projects[req.query.id].name = req.body.name;
  projects[req.query.id].dateDiff = diff;
  projects[req.query.id].description = req.body.description;
  projects[req.query.id].checked = [...req.body.checked];
  projects[req.query.id].techs = [...req.body.checked].map(
    (e) => techIcons[e].src
  );
  if (req.file != undefined) {
    projects[req.query.id].image = req.file.filename;
  }
  res.redirect("/");
});

app.get("/project-delete", function (req, res) {
  projects.splice(req.query.id, 1);
  res.redirect("/");
});

app.get("/project-detail", function (req, res) {
  res.render("project-detail");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.listen(3000);
