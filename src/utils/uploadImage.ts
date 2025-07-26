import { supabase } from "./supabase";

export async function uploadImage(file: File, path: string){
    const fileExt = file.name.split('.').pop()
    const fileName = `${path}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`
    const {data, error} = await supabase.storage.from('recipes').upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
    })

    if(error) throw error

    const{ data: publicUrl} = supabase.storage.from('recipes').getPublicUrl(filePath)

    return publicUrl.publicUrl
}