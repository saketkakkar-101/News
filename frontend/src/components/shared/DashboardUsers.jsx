import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Link } from 'react-router-dom'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { FaCheck } from 'react-icons/fa'

import {RxCross2} from 'react-icons/rx'

// const DashboardUsers = () => {
// const {currentUser} = useSelector((state) => state.user)
// const [users, setUsers] = useState([])

// // console.log(userPosts);

// const [showMore, setShowMore] = useState(true)
// const [userIdToDelete, setUserIdToDelete] = useState("")

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/getusers`, {
//   method: "GET",
//   // credentials: "include", // 👈 important for sending cookies
// });

//  const data = await res.json()

//  if (res.ok) {
//   setUsers(data.users)

//   if (data.users.length < 9) {
//     setShowMore(false)
//   }
//  }

//       } catch (error) {
//         console.log(error);
//       }
//     }

//     if (currentUser.isAdmin) {
//       fetchUsers()
//     }
//   }, [currentUser._id])

// const handleShowMore = async() => {
// const startIndex = users.length 

// try {
//   const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/getusers?startIndex=${startIndex}`, {
//     method: "GET",
//     // credentials: "include", // 👈 yeh lagana zaruri hai for cookie-based auth
//   });
  

//   const data =await res.json()

// if (res.ok) {
//   setUsers((prev) => [...prev, ...data.users])

//   if (data.users.length < 9) {
//     setShowMore(false)
//   }
// }

// } catch (error) {
//   console.log(error.message);
// }
// }

// const handleDeleteUser = async() => {
// try {
//   const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/delete/${userIdToDelete}`, {
//     method: "DELETE",
//     // credentials: "include", // 👈 add this
//   });
//     const data = await res.json()

// if (res.ok) {
//     setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
// }else {
//     console.log(data.message);
// }

// } catch (error) {
//     console.log(error.message);
// }
// }

//   return (
//     <div className='flex flex-col items-center justify-center w-full p-3'>
// {
//   currentUser.isAdmin && users.length > 0 ? (
//     <>
//     <Table>
//     <TableCaption>A list of your recent subscribers.</TableCaption>

//     <TableHeader>
//     <TableRow>
//           <TableHead className="w-[200px]">Joined On</TableHead>
//           <TableHead>User Image</TableHead>
//           <TableHead>Username</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Admin</TableHead>
//           <TableHead>Delete</TableHead>
//         </TableRow>
//     </TableHeader>

// {users.map((user) => (
//  <TableBody className="divide-y" key={user._id}>
//    <TableRow>
//    <TableCell >{new Date(user.createdAt).toLocaleDateString()}</TableCell>
//    <TableCell >{
//     <img src={user.profilePicture} alt={user.username} className='w-10 h-10 object-cover bg-gray-500 rounded-full'/>
//     }
//     </TableCell>

//     <TableCell >
//      {user.username}
//     </TableCell>

//     <TableCell >  {user.email} </TableCell>

//     <TableCell >
//          {user.isAdmin ? (<FaCheck className='text-green-600'/>) : (<RxCross2 className='text-red-600'/>)}
//     </TableCell>

//     <TableCell >
//     <AlertDialog>
//          <AlertDialogTrigger asChild>
//          <span onClick={() => {
//           setUserIdToDelete(user._id)
//          }} className='font-medium text-red-600 hover:underline cursor-pointer'>Delete</span>
//          </AlertDialogTrigger>

//          <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your
//             post and remove subscriber data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction className="bg-red-600" onClick={handleDeleteUser}>Continue</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>


//          </AlertDialog>
          
//     </TableCell>

  

//    </TableRow>
//  </TableBody>
// ))}

//     </Table>

//     {showMore && (
//       <button onClick={handleShowMore} 
//       className='w-full text-blue-700 self-center text-sm py-7'>Show more</button>
//     )}
//     </>
//   ) : (
//     <p>You have no subscribers yet!</p>
//   )
// }
//     </div>
//   )
// }

// export default DashboardUsers

const DashboardUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
// 🔁 Get Users
const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/getusers`, {
  credentials: 'include',
});

        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      // 🔁 Show More Users
const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/getusers?startIndex=${startIndex}`, {
  credentials: 'include',
});

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // 🔁 Delete User
const res = await fetch(`https://news-phi-rose-76.vercel.app/api/user/delete/${userIdToDelete}`, {
  method: 'DELETE',
  credentials: 'include',
});

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full p-3'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table>
            <TableCaption>A list of your recent subscribers.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Joined On</TableHead>
                <TableHead>User Image</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>

            {users.map((user) => (
              <TableBody className="divide-y" key={user._id}>
                <TableRow>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <img src={user.profilePicture} alt={user.username} className='w-10 h-10 object-cover bg-gray-500 rounded-full' />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-600' />
                    ) : (
                      <RxCross2 className='text-red-600' />
                    )}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span
                          onClick={() => setUserIdToDelete(user._id)}
                          className='font-medium text-red-600 hover:underline cursor-pointer'
                        >
                          Delete
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this user and their data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600" onClick={handleDeleteUser}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>

          {showMore && (
            <button onClick={handleShowMore} className='w-full text-blue-700 self-center text-sm py-7'>
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no subscribers yet!</p>
      )}
    </div>
  );
};

export default DashboardUsers;
