import supabasePro from "../Db/Supabase.js";


const toggleBar = document.querySelector('.toggle-button')
const dropdownMenu = document.querySelector('.dropdown-menu ')

toggleBar.addEventListener('click', () => {
    console.log("i am chal");
    dropdownMenu.classList.toggle('top-16')
})

console.log("hi");
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