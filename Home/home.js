import supabasePro from "../Db/Supabase.js";


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
const icon = document.querySelector('.but2')
console.log(butDiv);

console.log(loogIn, signUp);

// const Token = JSON.parse(localStorage.getItem('sb-xtgndbqirumlyrlqmfyf-auth-token'))
// const parsedId = Token.user.id
// console.log(parsedId)

try {
    const Token = JSON.parse(localStorage.getItem('sb-xtgndbqirumlyrlqmfyf-auth-token'))
    const parsedId = Token.user.id
    console.log(parsedId)
    butDiv.classList.add('hidden')
    users(parsedId)
    icon.classList.remove('hidden')
} catch (error) {
    if (error) {
        console.log(error);
    }
}

// const divv = document.querySelector('.img')
// const imageSrc = ['https://img.lazcdn.com/us/domino/d810287b-6879-41b1-87c5-8aa93fef5ca5_PK-1976-688.jpg_2200x2200q80.jpg', 'https://img.lazcdn.com/us/domino/e1c6d3ac-6ddd-4298-b533-e46328707aa2_PK-1976-688.jpg_2200x2200q80.jpg', 'https://img.lazcdn.com/us/domino/e1c6d3ac-6ddd-4298-b533-e46328707aa2_PK-1976-688.jpg_2200x2200q80.jpg', 'https://img.lazcdn.com/us/domino/e9c1fbcc-5975-4596-842f-63749892427b_PK-1976-688.jpg_2200x2200q80.jpg', ' https://img.lazcdn.com/us/domino/1bd050cb-e3ac-4087-8b3a-c09117f305de_PK-1976-688.jpg_2200x2200q80.jpg', 'https://img.lazcdn.com/us/domino/3a27ba7b-8165-4cbe-95eb-57a7155b30cc_PK-1976-688.jpg_2200x2200q80.jpg']
// console.log(imageSrc);

// for (let index = 0; index < imageSrc.length; index++) {
//     console.log(imageSrc[index]);
//     const img = document.createElement('img')
//     img.setAttribute('src', imageSrc[index])
//     divv.appendChild(img)
// }

async function users(parsedId) {
    const { data, error } = await supabasePro
        .from('userData')
        .select()
        .eq('Uid', parsedId)
        .single()

    console.log(data);

}
