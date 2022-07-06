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

    for (var i=0; i < tzkcolor.length; i++) {
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
        console.log("Added");
    });

}