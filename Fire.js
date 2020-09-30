import firebase from "firebase";




var firebaseConfig = {
    apiKey: "AIzaSyBnvKh30KPuGrrPFzd33PTYikzrfZYZVYw",
    authDomain: "newsocialapp-ec1e2.firebaseapp.com",
    databaseURL: "https://newsocialapp-ec1e2.firebaseio.com",
    projectId: "newsocialapp-ec1e2",
    storageBucket: "newsocialapp-ec1e2.appspot.com",
    messagingSenderId: "492264735593",
    appId: "1:492264735593:web:9f14334bae9950cafe73f8"
  };

 
  class Fire {
      constructor(){
          this.init()
          
        
        }
        init =()=>{
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
              }
        }
       


        send = messages=> {
            for(let i=0; i< messages.length; i++){

                const{text, user}= messages[i];
                const message={text,user,createdAt:this.timestamp};
                this.db.push(message);
            }
           

        };

          addPost =async({text, localUri})=>{
              const remoteUri =await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);

              return new Promise((res, rej)=> {
                  this.firestore
                  .collection("posts").add({
                      text,
                      uid: this.uid,
                     timestamp: this.timestamp,
                      image :remoteUri
                  })
                  .then(ref => {
                      res(ref);
                  })
                  .catch(error =>{
                      rej(error);
                  });
              });
          };


          uploadPhotoAsync =async(uri, filename) => {
              return new Promise(async(res, rej) => {
                  const response = await fetch(uri)
                  const file =await response.blob()

                  let upload = firebase.storage().ref(filename).put(file)

                  upload.on("state_changed", snapshot => {}, err =>{
                      rej(err)
                  },
                  async() => {
                      const url = await upload.snapshot.ref.getDownloadURL();
                      res(url);
                  }
                  );
              });
          };

        

         
        

      creatUser= async user =>{
          let remoteUri= null

          try{
              await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

              let db = this.firestore.collection("users").doc(this.uid)


              db.set({
                  name: user.name,
                  email: user.email,
                  avatar : null
              })
              if(user.avatar){
                  remoteUri=await this.uploadPhotoAsync(user.avatar,`avatars/${this.uid}`)

                  db.set({avatar: remoteUri},{merge:true})
              }
          }catch(error){
              alert("Error:", error);
          }
      };


      parse = snapshot=>{
          const {user,text,timestamp:numberStamp} = snapshot.val();
          const{key: _id}= snapshot;
          const{key :id}=snapshot;
          const timestamp= new Date(numberStamp);

          const message={

            id,
            _id,
            timestamp,
            text,
            user,
          };
          return message;
        
          

         
      };
      

     get =callback=>{
         this.db.limitToLast()
         .on('child-added', snapshot=>callback(this.parse(snapshot)));
     }
     

      signOut =()=>{
          firebase.auth().signOut();
      }

      off(){
        this.db.off();
    }


      get firestore(){
          return firebase.firestore()
      }
      get uid(){
          return(firebase.auth().currentUser|| {}).uid;
      }
     
      
     
      get db(){
          return firebase.database().ref("Messages");
      }
      
      get timestamp(){
          return Date.now();
      }

  }
  Fire.shared = new Fire();
  export default Fire;