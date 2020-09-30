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
            messages.forEach(item=>{
                const message ={
                    text :item.text,
                    timestamp: firebase.firestore.ServerValue.TIMESTAMP,
                    user: item.user
                };

                this.db.push(message)



            });

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


      parse = message=>{
          const {user,text,timestamp} = message.val()
          const{key: _id}= message
          const createdAt = new Date(timestamp);

          return{
              _id, createdAt, text, user

          };
      };

      get = callback =>{
          this.db.on("child-added", snapshot=>callback(this.parse(snapshot)));

      };
     

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
      get uname(){
          return firebase.database().ref("users");
      }
      
     
      get db(){
          return firebase.database().ref("messages");
      }
      get timestamp(){
          return Date.now();
      }

  }
  Fire.shared = new Fire();
  export default Fire;