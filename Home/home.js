import supabasePro from "../Db/Supabase.js";
const supabaseUrl = 'https://xtgndbqirumlyrlqmfyf.supabase.co'


const toggleBar = document.querySelector('.toggle-button')
const toggleBar2 = document.querySelector('.toggle-button2')
const dropdownMenu = document.querySelector('.dropdown-menu ')
const producDiv = document.querySelector('.prductDiv')


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
    const { data: datasess, error: errsess } = await supabasePro.auth.getSession()
    const Uid = datasess.session.user.id
    console.log(Uid)
    butDiv.classList.add('hidden')
    users(Uid)
    icon.classList.remove('hidden')
} catch (error) {
    if (error) {
        console.log(error);
    }
}


// Checking For a User
async function users(Uid) {
    const { data, error } = await supabasePro
        .from('userData')
        .select()
        .eq('Uid', Uid)
        .single()
    // console.log(data);
}

// Fetching Product
async function Fetchproduct() {
    const { data, error } = await supabasePro
        .from('productData')
        .select()
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div')
        const prod = data[i]
        console.log(prod);

        card.innerHTML = `<div
            class="card  w-60 p-2 bg-white rounded-xl transform hover:translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src="${supabaseUrl}/storage/v1/object/${prod.ImageUrl}"
                alt="" class="rounded-lg">
            <div class="">

                <div class="p-2">
                    <h2 class="font-bold text-lg mb-2">${prod.Title}</h2>
                    <span class="text-xl font-semibold">Rs. ${prod.DiscountPrice}.00</span>
                </div>
                <div class="flex items-center gap-2 px-2">
                    <span class="text-sm line-through opacity-75">Rs. ${prod.ActualPrice}.00</span>
                    <span class="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600">Save 10%</span>
                </div>
                <div class="flex items-center mt-2 px-2 gap-1">
                    <i class="fa-solid fa-star text-yellow-400 w-5"></i>
                    <i class="fa-solid fa-star text-yellow-400 w-5"></i>
                    <i class="fa-solid fa-star text-yellow-400 w-5"></i>
                    <i class="fa-solid fa-star text-yellow-400 w-5"></i>
                    <i class="fa-solid fa-star text-yellow-400 w-5"></i>
                    <p class="text-xs font-bold font-gray-700">Best Rating</p>
                </div>
                <p class="text-sm text-gray-600 mb-2 mt-2 px-2">${prod.Description}</p>
            </div>
            <div class="flex items-center justify-evenly gap-2 mb-3">
                <button
                    class=" px-3 py-1 bg-gray-300 cursor-pointer hover:text-white hover:bg-black rounded-lg text-black poppins-semibold ">Buy
                    Now</button>
                <button
                    class="px-3 py-1 bg-gray-300 cursor-pointer hover:bg-black rounded-lg hover:text-white text-black"><i
                        class="fa-solid  fa-cart-shopping cursor-pointer"></i> </button>
                <button class="px-3 py-1 bg-gray-300 cursor-pointer hover:bg-black hover:text-red-900 rounded-lg">
                    <i class="fa-solid fa-heart text-red-600"></i>
                </button>
            </div>
        </div>`
        producDiv.appendChild(card)
    }

}
Fetchproduct()
