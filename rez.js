(function () {
  //BDVBurik 2024
  ////rezkacomment без спойлеров
  ("use strict");
  var tmdbApiUrl = "https://api.themoviedb.org/3/";
  var kp_prox = "https://cors.apn.monster/";//"https://worker-patient-dream-26d7.bdvburik.workers.dev/";
  var urlEndTMDB = "?language=en-US&api_key=4ef0d7355d9ffb5151e987764708ce96";
  var namemovie;
  var www;
  var ew;
  var year;
  var url;
  /*var reazkaParseHtmlDom = function (url, name, year) {
    var fc = fetch(
      kp_prox + url + (name ? name : "") + (year ? "+" + year : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
        },
      }
    ).then(function (response) {
      return response.text();
    });

    return fc.then(function (result) {
      return new DOMParser().parseFromString(result, "text/html");
    });
  };*/
  function reazkaParseHtmlDom(url, name, year) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', kp_prox + url + (name ? name : "") + (year ? "+" + year : ""));
    xhr.onload = function() {
      if (xhr.status === 200) {
        var doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
        resolve(doc);
      } else {
        reject(xhr.status);
      }
    };
    xhr.onerror = function() {
      reject(xhr.status);
    };
    xhr.send();
  });
}

  var cleanTitle = function (str) {
    return str.replace(/[\s.,:;''`!?]+/g, "%20").trim();
  };

  var normalizeTitle = function (str) {
    return cleanTitle(
      str
        .toLowerCase()
        .replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, "-")
        .replace(/ё/g, "е")
    );
  };

  var searchRezka = function (name, year) {
    var dom = reazkaParseHtmlDom(
      "https://hdrezka.ag/search/?do=search&subaction=search&q=",
      name,
      year
    ).then(function (dom) {
      var arr = Array.from(
        dom.getElementsByClassName("b-content__inline_item-link")
      );
      var url = arr[0].children[0].href;

      return reazkaParseHtmlDom(url, "", "").then(function (dom) {
        var arr = Array.from(dom.getElementsByClassName("b-post__partcontent_item"));
        // console.log("sech rezka arr", arr);
        return collectRender(arr);
      });
    });
  };

/*collectRender = async function (data) {
    www = "";

    var wid;
data.filter(function(el, index) {
  if (el.className.includes("current")) {
    wid = index;
  }
});
    
    data.forEach(function(el, index) {
  
  www += "<div id=\"search" + el.children[0].innerText + "\" class=\"stringhide selector " + el.className;
  if (wid + 2 >= index && index >= wid - 2) {
    www += " show";
  } else {
    www += " hide hdhd";
  }
  www += "\"><span class=\"" + el.children[0].className + "\">" + el.children[0].innerText + "</span><span class=\"" + el.children[1].className + "\">" + el.children[1].innerText + "</span><span class=\"" + el.children[1].className + "\">";
  if ($("a", el.children[1]).attr("href")) {
    www += Lampa.Lang.translate($("a", el.children[1]).attr("href").split("/")[3]);
  } else {
    www += "";
  }
  www += "</span><span class=\"" + el.children[2].className + "\">" + el.children[2].innerText + "</span><span class=\"" + el.children[3].className + "\"><i class=\"hd-tooltip tooltipstered\">" + el.children[3].innerText + "</i></span></div>";
});

    var collect = $(
      `<div id ="collect" class="collection selector collectionfocus" style='display: table;width: 100%;'>` +
        www +
        "</div>"
    );

  $(".collection").remove();
  $(".full-descr__text").after(collect);

  $("#collect").ready(function () {


  $(".collectionfocus").one("hover:enter", function() {
  $(".hdhd").removeClass("hide");
  $("#collect").removeClass("collectionfocus selector");

  $(".b-post__partcontent_item").bind("hover:enter", function(e) {
    var input = $(this).children()[1].innerText.split("/")[0].trim().replace(/\s+$/, "");
    Lampa.Search.open({
      input: input
    });
  });
  });
  });
  };*/

  collectRender = function (data) {
    var www = "";

    var wid;
    data.forEach(function(el, index) {
        if (el.className.indexOf("current") !== -1) {
            wid = index;
        }
    });

    data.forEach(function(el, index) {
        www += "<div id=\"search" + el.children[0].innerText + "\" class=\"stringhide selector " + el.className;
        if (wid + 2 >= index && index >= wid - 2) {
            www += " show";
        } else {
            www += " hide hdhd";
        }
        www += "\"><span class=\"" + el.children[0].className + "\">" + el.children[0].innerText + "</span><span class=\"" + el.children[1].className + "\">" + el.children[1].innerText + "</span><span class=\"" + el.children[1].className + "\">";
        if ($("a", el.children[1]).attr("href")) {
            www += Lampa.Lang.translate($("a", el.children[1]).attr("href").split("/")[3]);
        } else {
            www += "";
        }
        www += "</span><span class=\"" + el.children[2].className + "\">" + el.children[2].innerText + "</span><span class=\"" + el.children[3].className + "\"><i class=\"hd-tooltip tooltipstered\">" + el.children[3].innerText + "</i></span></div>";
    });

    var collect = $("<div id=\"collect\" class=\"collection selector collectionfocus\" style='display: table;width: 100%;'>" + www + "</div>");

    $(".collection").remove();
    $(".full-descr__text").after(collect);

    $("#collect").ready(function () {
        $(".collectionfocus").one("hover:enter", function() {
            $(".hdhd").removeClass("hide");
            $("#collect").removeClass("collectionfocus selector");

            $(".b-post__partcontent_item").bind("hover:enter", function(e) {
                var input = $(this).children()[1].innerText.split("/")[0].trim().replace(/\s+$/, "");
                Lampa.Search.open({
                    input: input
                });
            });
        });
    });
};

  getEnTitle = function (id, type) {
    var url;

    if (type === "movie") {
      url = kp_prox + tmdbApiUrl + "movie/" + id + urlEndTMDB;
    } else {
      url = kp_prox + tmdbApiUrl + "tv/" + id + urlEndTMDB;
    }

    ennTitle(url);
  };
  function ennTitle(url) {
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(e) {
        var enTitle = e.title || e.name;
        resolve(enTitle);
      })
      .catch(function(error) {
        reject(error);
      });
  })
  .then(function(enTitle) {
    searchRezka(normalizeTitle(enTitle), year);
  })
  .catch(function(error) {
    console.error(error);
  });
}

  // Функция для начала работы плагина
  startPlugin = function () {
    window.rezkacoll_plugin = true;
    Lampa.Listener.follow("full", function (e) {
      if (e.type == "complite") {
        Lampa.Lang.add({
          films: {
            ru: "Фильм",
            uk: "Фільм",
            en: "Film",
            be: "Фільм",
          },
          series: {
            ru: "Сериал",
            uk: "Серіал",
            en: "Series",
            be: "Серыял",
          },
          cartoons: {
            ru: "Мультфильм",
            uk: "Мультфільм",
            en: "Cartoon",
            be: "Мультфільм",
          },
          animation: {
            ru: "Аниме",
            uk: "Аніме",
            en: "Anime",
            be: "Анімэ",
          },
        });

        if (e.data.movie.release_date) {
          year = e.data.movie.release_date.slice(0, 4);
        } else if (e.data.movie.first_air) {
          year = e.data.movie.first_air.slice(0, 4);
        } else {
          year = "";
        }
        // console.log("startPlugin");
        // console.log(e, e.data, e.data.movie);

        namemovie = e.data.movie.title || e.data.movie.name;

        getEnTitle(e.data.movie.id, e.object.method);

        var styleEl = document.createElement("style");
        styleEl.setAttribute("type", "text/css");
        styleEl.innerHTML = `
        .searchfr{border-radius: 100%;}
        .td{display:table-cell;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);padding:0 10px}.collection{display:table;width:90%}.collectionfocus{}.collectionfocus.focus{outline:outset #FFF}.rating{text-align:center;width:4em}.year{width:8em;text-align:right}.title{text-align:left}.num{text-align:center;width:3em}
        .b-post__partcontent_item{display:table-row;width:90%}
        .searchfr.focus{background-color:#fff;color:#000}
        .b-post__partcontent_item:hover{background-color:#ffffff11}
        .focus{background-color:#ffffff11}
        .current{background-color:#ffffff1f}.show{visibility:visible}.hide{visibility:hidden};`;
        //
        //
        document.head.appendChild(styleEl);
      }
    });
  };

  if (!window.rezkacoll_plugin) startPlugin();
})();
