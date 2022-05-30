export const uploadService = {
    uploadImg
}

// function uploadImg(ev) {
//   const CLOUD_NAME = "dcwibf9o5"
//   const UPLOAD_PRESET = "vt0iqgff"
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

//   const formData = new FormData();
//   formData.append('upload_preset', UPLOAD_PRESET);
//   formData.append('file', ev.target.files[0])

//   return fetch(UPLOAD_URL, {
//     method: 'POST',
//     body: formData
//   })
//     .then(res => res.json())
//     .then(res => {
//       return res
//     })
//     .catch(err => console.error(err))
// }

// FETCH
async function uploadImg(ev) {
    // Defining our variables
    const UPLOAD_PRESET = 'b8r3xcl2' // Insert yours
    const CLOUD_NAME = 'dbxzhe2y2' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
        // Sending a post method request to Cloudniarys' API
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })

        const { url } = await res.json()
        return url

    } catch (err) {
        console.error('ERROR!', err)
    }
}