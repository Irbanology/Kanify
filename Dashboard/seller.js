import supabasePro from "../Db/Supabase.js";

console.log("hi");
// console.log();
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