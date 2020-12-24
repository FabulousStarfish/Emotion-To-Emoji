var prediction1="";
var prediction2="";

Webcam.set({
    width:350,
    height:300,
    img_format:"png",
    png_quality:90
});
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="my_image" src="'+data_uri+'"></img>'
    });
}

console.log("Ml5 Version",ml5.version);

classification=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_2IidkJ-p/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Is Loaded");
}

function check(){
    img=document.getElementById("my_image");
    classification.classify(img,gotResult);
}

function gotResult(error,result){
    if (error){
        console.log(error);
    }
    else{
        console.log(result);
        prediction1=result[0].label;
        prediction2=result[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction1;
        document.getElementById("result_emotion_name2").innerHTML=prediction2;
        speak();

        if(prediction1=="Happy"){
            document.getElementById("emotion_face_1").innerHTML= "&#128512" ;
        }
        else if(prediction1=="Angry"){
            document.getElementById("emotion_face_1").innerHTML="&#128545;";
        }
        else if(prediction1=="Sad"){
            document.getElementById("emotion_face_1").innerHTML="&#128532;";
        }
        else if(prediction1=="Crying"){
            document.getElementById("emotion_face_1").innerHTML="&#128546;";
        }

        if(prediction2=="Happy"){
            document.getElementById("emotion_face_2").innerHTML="&#128512";
        }
        else if(prediction2=="Angry"){
            document.getElementById("emotion_face_2").innerHTML="&#128545;";
        }
        else if(prediction2=="Sad"){
            document.getElementById("emotion_face_2").innerHTML="&#128532;";
        }
        else if(prediction2=="Crying"){
            document.getElementById("emotion_face_2").innerHTML="&#128546;";
        }
        
    }
}

function speak(){
    speech= window.speechSynthesis;
    speak1="The First Prediction Is"+prediction1;
    speak2="The Second Prediction Is"+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    speech.speak(utterThis);
}