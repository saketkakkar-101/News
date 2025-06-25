import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess, updateFailure, updateStart, updateSuccess } from '@/redux/user/userSlice.js'
import { getFilePreview, uploadFile } from '@/lib/appwrite/UploadImage'
import { useToast } from '@/hooks/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

const DashboardProfile = () => {
  const {currentUser, error, loading} = useSelector((state) => state.user)

 const profilePicRef = useRef()
 const dispatch = useDispatch()
 const {toast} = useToast()

  const [imagefile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [formData, setFormData] = useState({})
  
  // console.log(formData);

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    // console.log(file);
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  const hanldleChange = (e) => {
   setFormData({...formData, [e.target.id]: e.target.value})
  }

  const uploadImage = async() => {
  if (!imagefile) return currentUser.profilePicture 

  try {
    const uploadedFile = await uploadFile(imagefile)
    const profilePictureUrl = getFilePreview(uploadedFile.$id)
    return profilePictureUrl
  } catch (error) {
    toast({title: "Update user failed. Please try again!"})
    console.log("Image upload failed: " . error);
  }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      dispatch(updateStart())

      // wait for image upload
      const profilePicture = await uploadImage()

      const updateProfile = {
        ...formData,
        profilePicture,
      }
const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/update/${currentUser._id}`, {

  method: "PUT",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify(updateProfile),
  credentials: "include",
});


      const data = await res.json()

      if (data.success === false) {
        toast({title: "Update user failed. Please try again!"})
        dispatch(updateFailure(data.message))
        
      }else{
        toast({title: "updated successfully."})
        dispatch(updateSuccess(data))
        
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      toast({title: "Update user failed. Please try again!"})
    }
  }

 const handleDeleteUser = async() => {
  try {
    dispatch(deleteUserStart())

const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/delete/${currentUser._id}`, {

  method: "DELETE",
  credentials: "include",
});

    const data = await res.json()

    if (!res.ok) {
      dispatch(deleteUserFailure(data.message))
    }else {
      dispatch(deleteUserSuccess())
    }
  } catch (error) {
    console.log(error);
    dispatch(deleteUserFailure(error.message))
  }
 }

const handleSignout = async() => {
  try {
const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/signout`, {

  method: "POST",
  credentials: "include",
});

    const data = await res.json()

    if (!res.ok) {
      console.log(data.message);
    } else{
      dispatch(signOutSuccess())
    }
  } catch (error) {
    console.log(error);
  }
} 

  return (
    <div
   className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>
      Update Your Profile
      </h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' hidden ref={profilePicRef} onChange={handleImageChange}/>
          <div className='w-32 h-32 self-center cursor-pointer overflow-hidden'>
            <img 
            
            src={imageFileUrl ||  currentUser.profilePicture}
            alt="" 
            className='rounded-full w-full h-full object-cover border-8 border-gray-300'
            onClick={() => profilePicRef.current.click()}/>
          </div>
          <Input
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={hanldleChange} 
            />

            <Input
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={hanldleChange}
            />

            <Input
            type="password"
            id="password"
            placeholder="password"
            className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={hanldleChange}
            />

            <Button type="submit" className="h-12 bg-green-600" disabled={loading}>
              {
                loading ? "Loading..." : "Update Profile"
              }
            </Button>

      </form>


         <div className='text-red-500 flex justify-between mt-5 cursor-pointer'>
         <AlertDialog>
         <AlertDialogTrigger asChild>
         <Button variant="ghost" className='cursor-pointer'>Delete Account</Button>
         </AlertDialogTrigger>

         <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleDeleteUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>


         </AlertDialog>
          
         <Button variant="ghost" className='cursor-pointer' onClick={handleSignout}>Sign Out</Button>
         </div>
         <p className='text-red-600'>{error}</p>
   </div>
  )
}

export default DashboardProfile