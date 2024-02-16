$(function () {

    const color__change1 = document.getElementById('color__change-1');
    const color__change2 = document.getElementById('color__change-2');
    const color__change3 = document.getElementById('color__change-3');
    const color__change4 = document.getElementById('color__change-4');
    const nav = document.getElementById('nav');
    const header__content = document.getElementById('header__content');
    const loader = document.getElementById('loader');
    let assistant;
    const voice1 = "onyx";
    const voice2 = "alloy";
    const voice3 = "fable";
    const voice4 = "nova";
    let currentVoice;

    color__change1.addEventListener('click', () => {
        // Modifiez les propriétés CSS de l'élément
        color__change1.style.backgroundColor = '#618264';
        color__change2.style.backgroundColor = '#618264';
        color__change3.style.backgroundColor = '#618264';
        color__change4.style.backgroundColor = '#618264';
        loader.style.backgroundColor = '#618264';
        header__content.style.backgroundColor = '#C3EDC0';
        nav.style.backgroundColor = '#88AB8E';
        assistant = " assistant et spécialiste en medecine";
        currentVoice = voice1;





    });
    color__change2.addEventListener('click', () => {
        // Modifiez les propriétés CSS de l'élément
        color__change1.style.backgroundColor = '#2D3250';
        color__change2.style.backgroundColor = '#2D3250';
        color__change3.style.backgroundColor = '#2D3250';
        color__change4.style.backgroundColor = '#2D3250';
        header__content.style.backgroundColor = '#7077A1';
        loader.style.backgroundColor = '#2D3250';
        assistant = " assistant et spécialiste en mécanique"
        nav.style.backgroundColor = '#424769';
        currentVoice = voice2;




    });
    color__change3.addEventListener('click', () => {
        // Modifiez les propriétés CSS de l'élément
        color__change1.style.backgroundColor = '#6D3580';
        color__change2.style.backgroundColor = '#6D3580';
        color__change3.style.backgroundColor = '#6D3580';
        color__change4.style.backgroundColor = '#6D3580';
        header__content.style.backgroundColor = '#665C84';
        loader.style.backgroundColor = '#6D3580';
        nav.style.backgroundColor = '#1A3263';
        assistant = " assistant et spécialiste en education";
        currentVoice = voice3;




    });
    color__change4.addEventListener('click', () => {
        // Modifiez les propriétés CSS de l'élément
        color__change1.style.backgroundColor = '#8CB9BD';
        color__change2.style.backgroundColor = '#8CB9BD';
        color__change3.style.backgroundColor = '#8CB9BD';
        color__change4.style.backgroundColor = '#8CB9BD';
        header__content.style.backgroundColor = '#F1E4C3';
        loader.style.backgroundColor = '#8CB9BD';
        nav.style.backgroundColor = '#AAD7D9';
        assistant = " assistant et spécialiste en droit"
        currentVoice = voice4;



    });


   

    //openAI


    // variable
    const button = document.getElementById('start-listening');
    let question;
    let verif; 


// Ajoutez un écouteur d'événements pour le clic sur le bouton
button.addEventListener('click', () => {
    
            // Demandez à l'utilisateur de parler à voix haute
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR'; // Langue française

// Écoutez l'entrée vocale de l'utilisateur
recognition.onresult = (event) => {
   const userSpeech = event.results[0][0].transcript;

        // Affichez le texte dans la console
        console.log('Vous avez dit :', userSpeech);
        question = userSpeech;
   
};

        // Démarrez la reconnaissance vocale
        recognition.start();

        verif = true;
  setTimeout(()  => {
    verif= false
      
       test(question);
       console.log(question);

       

      
      }, "5000");
      
});









 async function test(mess){

   
    
 
   
    // addEventListener('click', async () => {
        
try {



// Faites une requête à l'API OpenAI (remplacez l'URL par l'URL de l'API réelle)
const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        Authorization:  ' Bearer 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', // Remplacez par votre clé API
 },
        body: JSON.stringify({


            
            model:"gpt-3.5-turbo-0613",
            max_tokens : 150,

        messages: [
        {
            "role": "assistant",
        "content": "tu es un assitant polyvalent , c'est à dire que si l'utilisateur veut que tu sois spécialiser dans un domaine tu le sera et tu repondras de manière très précise avec un vocabulaire propre au domaine dans n'importe quelle langue que l'utilisateur parle. Tu commencera toujour ta phrase par ' je suis assitant en ' avec le domaine dans lequel l'utilisateur t'as demander d'être spécialiser "
},
        {
            "role": "user",
        "content": assistant +mess,
}
        ]
     // Autres paramètres de la requête (selon l'API OpenAI)
 }),
});

        // Convertissez la réponse en JSON
        const data = await response.json();
        const reponseAI = data.choices[0].message.content;
        const texte = reponseAI; 

       // Appelez l'API pour générer l'audio à partir du texte
       fetch('https://api.openai.com/v1/audio/speech', {
           method: 'POST',
           headers: {
               'Authorization': 'Bearer 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',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               model: 'tts-1', // Modèle TTS (text-to-speech) par défaut
               voice: currentVoice, // Voix (par exemple : alloy, echo, fable, etc.)
               input: texte,
           }),
       })
       .then(response => response.blob())
       .then(blob => {
           // Créez un objet URL pour le fichier audio
           const urlFichierAudio = URL.createObjectURL(blob);
       
           // Créez un élément audio pour lire le fichier
           const lecteurAudio = new Audio(urlFichierAudio);
           lecteurAudio.play();
       })
       .catch(erreur => {
           console.error('Erreur lors de la génération audio :', erreur);
       });
        
        
       
        // Affichez la réponse dans la console
        console.log('Réponse de l\'API OpenAI :', reponseAI);
} catch (error) {
            console.error('Erreur lors de la requête :', error.message);
}



// })  ;

}






   








});