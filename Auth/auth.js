import supabasePro from "../Db/Supabase.js";
console.log('Hi');





const firstdiv = document.getElementById('first')
const seconddiv = document.getElementById('second')


const signDiv = document.getElementById('signchange')
const logDiv = document.getElementById('logchange')



signDiv.addEventListener('click', logshow)
logDiv.addEventListener('click', signshow)

function logshow() {
    seconddiv.classList.remove('hidden')
    firstdiv.classList.add('hidden')
}
function signshow() {
    firstdiv.classList.remove('hidden')
    seconddiv.classList.add('hidden')
}






const signup = document.getElementById('Sign-up')
const signIn = document.getElementById('Sign-in')
console.log(signup, signIn);

signup.addEventListener('click', SignUp)
signIn.addEventListener('click', logIn)


async function SignUp() {
    console.log("chal rah");
    const firstname = document.getElementById("Firstname")
    const lastname = document.getElementById('Lastname')
    const email = document.getElementById('Email')
    const password = document.getElementById('Password')
    const confpassword = document.getElementById('Confirm-password')
    const role = document.getElementById('select-role')
    console.log(firstname, lastname, email, password, confpassword, role);

    const pass = password.value
    const confpass = confpassword.value

    if (!firstname.value || !lastname.value || !email.value || !password.value || !confpassword.value || !role.value) {
        Swal.fire({
            icon: "error",
            title: "Fil All...",
        });
        return
    }

    if (pass.length < 6 && confpass.length < 6) {
        alert("Pass ki mikdar brhao")
        return
    }
    if (password.value != confpassword.value) {
        alert('password same nahi hai shyd')
        return
    }



    const { data, error } = await supabasePro.auth.signUp({
        email: email.value,
        password: password.value,
    })
    if (!error) {
        console.log(data);
        console.log(data.user.id);
    }
    const id = data.user.id
    const { data: tabdata, error: taberr } = await supabasePro
        .from('userData')
        .insert({
            FirstName: firstname.value,
            lastName: lastname.value,
            Email: email.value,
            Pass: password.value,
            Role: role.value,
            Uid: id,
        })
        .select()
    if (!error) {
        console.log(tabdata);
        Swal.fire({
            icon: "success",
            title: "Best",
        });
    }

    firstname.value = ""
    lastname.value = ""
    email.value = ""
    password.value = ""
    confpassword.value = ""
    role.value = ""

}

async function logIn() {
    console.log("Hi");
    const email = document.getElementById('Login-email')
    const pass = document.getElementById('Login-pass')
    console.log(email.value, pass.value);
    if (!email.value || !pass.value) {
        Swal.fire({
            icon: "error",
            title: "Fil All...",
        });
        return
    }
    console.log("start hora hai yhn se");

    const { data, error } = await supabasePro.auth.signInWithPassword({
        email: email.value,
        password: pass.value,
    })
    if (!error) {
        console.log(data);
        console.log(data.user.id);
        const id = data.user.id
        const { data: tabdata, error: errdata } = await supabasePro
            .from('userData')
            .select()
            .eq('Uid', id)
            .single()

        console.log(tabdata.Role);

        // return
        if (tabdata.Role == 'Seller') {
            window.location.href = '../Dashboard/seller.html'
        } else if (tabdata.Role == 'Customer') {
            window.location.href = '../Home/Home.html'
        }
    }
    if (error) {
        console.log(error);
        return
    }

    pass.value = ""
    email.value = ""
}