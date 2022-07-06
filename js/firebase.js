const firebaseConfig = {
    apiKey: "AIzaSyA0cmsWdZgCDsTLJH2aqYblLYT0z3ZIO0g",
    authDomain: "ihateyou-aa955.firebaseapp.com",
    databaseURL: "https://ihateyou-aa955-default-rtdb.firebaseio.com",
    projectId: "ihateyou-aa955",
    storageBucket: "ihateyou-aa955.appspot.com",
    messagingSenderId: "576204416023",
    appId: "1:576204416023:web:392e919d7371846a5aa852"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

//what is tanabata
let popup = document.getElementById("popup");
let ovl = document.getElementById("overlay");
let tzk = document.getElementById("card");

function openPopup() {
    popup.classList.add("open-popup");
    ovl.classList.add("ovl");
}

function closePopup() {
    popup.classList.remove("open-popup");
    ovl.classList.remove("ovl");
}



function cardclose() {
    tzk.classList.remove("card-open");
    ovl.classList.remove("ovl");
}
//
let wishesId = [];
let checkId = {};
let data = {};
let tone = {
    red: "#fe6961",
    white: "snow",
    purple: "#cb99c9",
    blue: "#aec6cf",
    yellow: "#fdfd96",
};

function cardopen() {
    
    console.log(wishesId);
    let i = Math.round(Math.random() * wishesId.length);
    if (i >= wishesId.length) i = 0;
    let id = wishesId[i];
    if (id == undefined) {
      alert("We are loading <3");
    } else {
        tzk.classList.add("card-open");
        ovl.classList.add("ovl");
          // console.log(data[id]);
        $(".wname").text(data[id].name);
        $(".wwish").text(data[id].wish);

        $(".card").css("background-color", tone[data[id].color]);
    }

    
}

db.collection("wishes").onSnapshot((snap) => {
    for (let i = 0; i < snap.docs.length; i++) {
      let id = snap.docs[i].id;
      if (id in checkId) {
      } else {
        checkId[id] = 1;
        wishesId.push(id);
        $(".wishes").text(wishesId.length + " wishes");
        db.collection("wishes")
          .doc(id)
          .onSnapshot((doc) => {
            // console.log(doc.data());
            data[id] = {
              color: doc.data().color,
              wish: doc.data().wish,
              name: doc.data().name,
            };
          });
      }
    }
});

//makewish
document.getElementById("form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();
    
    let tzkcolor = [
        "#tzk-red",
        "#tzk-blue",
        "#tzk-yellow",
        "#tzk-white",
        "#tzk-purple"
    ];

    let colname = [
        "red", "blue", "yellow", "white", "purple"
    ]

    let color = "";

    for (let i=0; i < tzkcolor.length; i++) {
        let col = tzkcolor[i];
        if ($(col).prop("checked")) {
            color = colname[i];
        }
    }

    console.log( $('#name').val() );

    db.collection('wishes').add({
        name: $('#name').val(),
        wish: $('#wish').val(),
        color: color,
    }).then(() => {
        alert("Success!");
        //console.log("Added");
    });

}