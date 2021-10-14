var form = document.getElementById("form");
          var username = document.getElementById("username")
          var email = document.getElementById("email");
          var message = document.getElementById("message");
          
          form.addEventListener('submit' ,(e)  => {
              e.preventDefault();
          
              checkInputs();
          });
          
          function checkInputs(){
          
          const usernameValue = username.value.trim();
          const emailValue = email.value.trim();
          const messageValue = message.value.trim();
          
          
          if (usernameValue === ''){
              setErrorFor(username, 'Name cannot be blank');
          }else{
              setSuccessFor(username)
          }
          
          if(emailValue === ''){
           setErrorFor(email, 'Email cannont be blank');
          }else if(!emailValidate(emailValue)){
           setErrorFor(email, 'Email is not valid');
          }else{
              setSuccessFor(email);
          }
          
          if(messageValue ===''){
              setErrorFor(message, 'Message cannot be blank');
          }else{
              setSuccessFor(message);
              document.body.innerHTML= "Thank You";
          }
          
          }
          
          
          
          function setErrorFor(input,message){
              const formControl = input.parentElement;
              const small = formControl.querySelector('small');
              small.innerText = message;
              formControl.className= 'form-control error';
          
          }
          
          function setSuccessFor(input){
              const formControl= input.parentElement;
              formControl.className= 'form-control success';
              
          
          }


          function emailValidate(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }