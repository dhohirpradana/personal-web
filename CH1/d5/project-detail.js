function renderProject() {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

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

  var dateStart = new Date(
    "Tue Mar 08 2022 07:57:08 GMT+0700 (Waktu Indonesia Barat)"
  );

  var dateEnd = new Date(
    "Tue Jun 23 2022 09:57:08 GMT+0700 (Waktu Indonesia Barat)"
  );

  let diff =
    DateDiff.inMonths(dateStart, dateEnd) < 1
      ? DateDiff.inDays(dateStart, dateEnd) < 1
        ? DateDiff.inHours(dateStart, dateEnd) + " hour"
        : DateDiff.inDays(dateStart, dateEnd) + " day"
      : DateDiff.inMonths(dateStart, dateEnd) + " month";

  //   console.log(diff);

  let title = "DumbWays Web App";
  let t = "";
  let textContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;
  for (let i in techIcons) {
    t += `<div class="items tech">
    <img
      src="${techIcons[i].src}"
    />
    <div>${techIcons[i].name}</div>
  </div>`;
  }

  let projectDetailContainer = document.getElementById("container-content");
  projectDetailContainer.innerHTML = `<div class="title-project-detail">${title}</div>
  <div class="project-detail">
    <div class="col-1">
      <div class="left-side">
        <img
          src="assets/plann-8IhVh0xU2Hc-unsplash.jpg"
          alt="image-data"
        />
      </div>
      <div class="right-side">
        <div class="col-item">
          <div class="items">
            <label>Duration</label>
          </div>
          <div class="items">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/calendar.png"
            />
            <div>${dateStart.getDay()} ${
    months[dateStart.getMonth()]
  } ${dateStart.getFullYear()} - ${dateEnd.getDay()} ${
    months[dateEnd.getMonth()]
  } ${dateEnd.getFullYear()}</div>
          </div>
          <div class="items">
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/000000/stopwatch.png"
            />
            <div>${diff}</div>
          </div>
        </div>
        <!-- Tech -->
        <div class="items">
          <label>Technologies</label>
        </div>
        <div class="col-item technologies">${t}</div>
      </div>
    </div>
    <!-- col-2 -->
    <div class="col-2">${textContent}</div>
  </div>`;
}

renderProject();
