import supabasePro from "../Db/Supabase.js";

console.log("hi");



const toggleBar = document.querySelector('.toggle-button')
const toggleBar2 = document.querySelector('.toggle-button2')
const dropdownMenu = document.querySelector('.dropdown-menu ')

toggleBar.addEventListener('click', () => {
    console.log("i am chal");
    dropdownMenu.classList.toggle('top-16')
    dropdownMenu.classList.add('transition-all')
    dropdownMenu.classList.add('duration-500')
    toggleBar2.classList.remove('hidden')
    toggleBar.classList.add('hidden')
})
toggleBar2.addEventListener('click', () => {
    dropdownMenu.classList.toggle('top-16')
    dropdownMenu.classList.add('transition-all')
    dropdownMenu.classList.add('duration-500')
    toggleBar2.classList.add('hidden')
    toggleBar.classList.remove('hidden')
})

const loogIn = document.querySelector('.login')
const signUp = document.querySelector('.signup')
const butDiv = document.querySelector('.but')

const Token = JSON.parse(localStorage.getItem('sb-xtgndbqirumlyrlqmfyf-auth-token'))
const parsedId = Token.user.id
console.log(parsedId);

async function users() {
    const { data, error } = await supabasePro
        .from('userData')
        .select()
        .eq('Uid', parsedId)
        .single()

    console.log(data);
}
users()  