var techIcons = [
  {
    src: "https://img.icons8.com/small/32/000000/nodejs.png",
    name: "Node Js",
  },
  {
    src: "assets/next-js.png",
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
let imageURL;
let fileName = document.getElementById("file-name");

function fileImage() {
  image = document.getElementById("file-image").files[0];
  imageURL = URL.createObjectURL(
    document.getElementById("file-image").files[0]
  );
  fileName.innerHTML = `${image.name}`;
}

let projects = [];

function saveProject() {
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

  let name = document.getElementById("input-name").value;
  let start = document.getElementById("input-start").value;
  let dateStart = new Date(start);
  let end = document.getElementById("input-end").value;
  let dateEnd = new Date(end);
  let diff =
    DateDiff.inMonths(dateStart, dateEnd) < 1
      ? DateDiff.inDays(dateStart, dateEnd) + " hari"
      : DateDiff.inMonths(dateStart, dateEnd) + " bulan";
  let techSelected = [...document.querySelectorAll(".techs:checked")].map(
    (e) => techIcons[e.value.split("_").pop()]
  );
  let desc = document.getElementById("input-desc").value;

  if (name == "") {
    alert("Name tidak boleh kosong!");
    document.getElementById("input-name").focus();
    return false;
  }

  if (start == "") {
    alert("Start date tidak boleh kosong!");
    document.getElementById("input-start").focus();
    return false;
  }

  if (end == "") {
    alert("End date tidak boleh kosong!");
    document.getElementById("input-end").focus();
    return false;
  }

  if (desc == "") {
    alert("Description tidak boleh kosong!");
    document.getElementById("input-desc").focus();
    return false;
  }

  if (document.getElementById("file-image").files.length == 0) {
    alert("Masukan image!");
    document.getElementById("file-image").focus();
    return false;
  }
  projects.push({ name, diff, desc, techSelected, imageURL });
  document.getElementById("input-name").value = "";
  document.getElementById("input-start").value = "";
  document.getElementById("input-end").value = "";
  document.getElementById("input-desc").value = "";
  fileName.innerHTML = ``;
  document.getElementById("file-image").files.length = 0;
  renderProject();
}

function renderProject() {
  let technologiesBlock = document.getElementById("technologies");
  technologiesBlock.innerHTML = "";

  for (let i in techIcons) {
    technologiesBlock.innerHTML += `<div class="check-tech">
    <input
      class="techs"
      value="${i}"
      type="checkbox"
      id="tech_${i}"
    />
    <label for="tech_${i}">${techIcons[i].name}</label>
  </div>`;
  }

  let projectContainer = document.getElementById("list-project");
  projectContainer.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    var pi = projects[i];

    let t = "";
    for (let index = 0; index < pi.techSelected.length; index++) {
      var tech = pi.techSelected[index].src;
      t += `<img src=${tech} />`;
    }

    projectContainer.innerHTML += `<div class="card" onclick="goToDetail()">
      <div>
        <img
          src="${pi.imageURL}"
          alt=""
        />
      </div>
      <div class="title">${pi.name}</div>
      <div class="duration">durasi: ${pi.diff}</div>
      <div class="description">
        ${pi.desc}
      </div>
      <div class="technologies">${t}
    </div><div class="btn-action">
        <div class="edit" onclick="">edit</div>
        <div class="delete" onclick="">delete</div>
      </div>
    </div>`;
  }
}

function goToDetail() {
  let a = document.createElement("a");
  a.href = "project-detail.html";
  a.click();
}

renderProject();
