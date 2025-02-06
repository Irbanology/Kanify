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

const numItems = document.getElementById('NumberOfitems')
console.log(numItems);


// const Token = JSON.parse(localStorage.getItem('sb-xtgndbqirumlyrlqmfyf-auth-token'))
// const parsedId = Token.user.id
// console.log(parsedId);
let uid = null
async function users() {
    const { data: datasess, error: errsess } = await supabasePro.auth.getSession()
    const Uid = datasess.session.user.id
    uid = Uid
    const { data, error } = await supabasePro
        .from('userData')
        .select()
        .eq('Uid', Uid)
        .single()
    console.log(data);
}
users()

const addbtn = document.getElementById('addprod')
addbtn.addEventListener('click', AddProduct)

const image = document.getElementById('image')
const titleInp = document.getElementById('title')
const priceInp = document.getElementById('price')
const descInp = document.getElementById('Description')
const disPrice = document.getElementById('Dicprice')
// console.log(image, titleInp, priceInp, disPrice, descInp);

// return
async function AddProduct() {
    const producname = titleInp.value;
    const desc = descInp.value;
    const price = priceInp.value;
    const discountPric = disPrice.value
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
        }

    }

}
// AddProduct()

// Email Marketer
// Data Scraper
// Front Seller (Bark)
// Digital Marketing Manager
// Technical Content Writer
// Trainee Sales Executive (Chat Base)
// Sales Executive (Chat Base)