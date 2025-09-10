
   document.getElementById('togglePW').addEventListener('click', 
   function(){
      const pw = document.getElementById('password');
      if(pw.type=== 'password'){
        pw.type= 'txt';
        this.innerHTML='&#128064;';
      }
      else{
        pw.type='password';
        this.innerHTML='&#128065;';
      }
   });

   document.getElementById('loginForm').addEventListener('submit',async function(e){
    e.preventDefault();

    const username= document.getElementById('username').value.trim();

    const password= document.getElementById('password').value;

    const message= document.getElementById('message');

    const submitBtn=this.querySelector('button[type="submit"]');

    message.textContent='';
    message.classList.remove('show');

    submitBtn.disabled = true;
    submitBtn.textContent= 'Logging in.....';

    try{
        const response = await fetch('https://ess.bhagwati.co/essapps/api/PWDManager/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                UserName : username,
                Password: password
            })
        });

        const data= await response.json();

        if (response.ok && data.Status === 1)
        {
            localStorage.setItem('userData', 
                JSON.stringify({
                    username: data.Data.UserName,
                    role: data.Data.Role,
                    key: data.Data.Key
                })
            );

            message.style.color='#28a745';
            message.textContent= data.message || 'Login Succesfull';
            message.classList.add('show');

            setTimeout(()=>
        {
            window.location.href='DashBoard.html';
        },1000);
        }

        else{
            throw new Error (data.message || 'Login Failed');
        }

    }
    catch (error){
        console.error('Login error:',error);
        message.style.color='#d90429';
        message.textContent= error.message || 'Network Error, Please Try Again';
        message.classList.add('show');
    }
    finally{
        submitBtn.disabled = false;
        submitBtn.textContent='Login'
    }
   });
   document.getElementById('username').addEventListener('input', clearMsg);
   document.getElementById('password').addEventListener('input',clearMsg);

   function clearMsg(){
    const message = document.getElementById('message');
    
    if(message.classList.contains('show'))
   {
    message.textContent='';
    message.classList.remove('show');

    message.style.color = '#d90429'
   }
   }
