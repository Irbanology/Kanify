import supabasePro from "../Db/Supabase.js";

console.log("hi");



const toggleBar = document.querySelector('.toggle-button')
const toggleBar2 = document.querySelector('.toggle-button2')
const dropdownMenu = document.querySelector('.dropdown-menu ')
const numberOfitems = document.getElementById('NumberOfitems')
if (true) {
    console.log(numberOfitems);
    let func = () => {
        console.log("in");
        return
    }
    func()
}

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

const numItems = document.getElementById('NumberOfitems')
console.log(numItems);


let uid = null
async function users() {
    const { data: datasess, error: errsess } = await supabasePro.auth.getSession()


    let session = datasess.session
    if (session === null) {
        window.location.href = '../Auth/auth.html'
        console.log("In");
    }
    const Uid = datasess.session.user.id
    uid = Uid
    console.log(uid);


    const { data, error } = await supabasePro
        .from('userData')
        .select()
        .eq('Uid', uid)
        .single()
    console.log(data);
}
users()

const addbtn = document.getElementById('addprod')
addbtn.addEventListener('click', AddProduct)

let image = document.getElementById('image')
let titleInp = document.getElementById('title')
let priceInp = document.getElementById('price')
let descInp = document.getElementById('Description')
let disPrice = document.getElementById('Dicprice')

// ADD PRODUCT
async function AddProduct() {
    let producname = titleInp.value;
    let desc = descInp.value;
    let price = priceInp.value;
    let discountPric = disPrice.value
    console.log(producname, price, desc, discountPric);
    // return
    const file = image.files[0];
    console.log(file);

    const fileName = `${Date.now()}-${file.name}`;
    console.log(fileName);

    const { data, error } = await supabasePro.storage
        .from("Images")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (!error) {
        const ut = data.fullPath
        console.log(ut);
        // return
        const { error: proderr, data: prodata } = await supabasePro
            .from('productData')
            .insert({
                Title: producname,
                Description: desc,
                ActualPrice: price,
                DiscountPrice: discountPric,
                ImageUrl: data.fullPath,
                Uid: uid
            })
            .select()
        if (!proderr) {
            console.log(prodata);
            image.value = ""
            titleInp.value = ""
            priceInp.value = ""
            descInp.value = ""
            disPrice.value = ""
        }

    }

}

// FETCH PRODUCT
async function Fetchproduct() {
    const { data: datasess, error: errsess } = await supabasePro.auth.getSession()

    const { data, error } = await supabasePro
        .from('productData')
        .select()
        .eq('Uid', uid)

    if (error) {
        console.log(error);
    }
    if (!error) {
        console.log(data);
    }
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div')
        const prod = data[i]
        console.log(prod);

        card.innerHTML = `<div
            class="w-60 p-2 bg-white rounded-xl transform hover:translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
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