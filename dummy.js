console.log("..............start.......................");

db.ref("/messages/"+MyId+"/"+FriendId)
.on('value', (snapshot) => {
 
 snapshot.forEach(element => {
   const { _id , text , user  } = element.val()
   console.log(_id , text ,user);

 });
 
   });



     console.log(".............end.................")










     messages.forEach(element => {
        

        const root = db.ref("/messages/"+MyId+"/"+FriendId);
        const another = db.ref("/messages/"+FriendId+"/"+MyId);

        root.push( element , (error) => {
          if (error) {
              console.log("messages not saved");
          } else {
            console.log("messages saved..");
          }
        });


        another.push( element , (error) => {
            if (error) {
                console.log("messages not saved");
            } else {
              console.log("messages saved..");
            }
          });

      });