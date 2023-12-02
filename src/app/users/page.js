"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../../components/UserTabs";
import useProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";

const UserPage = () => {
  const { loading, data: isAdmin } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const userPromise = new Promise(async(resolve, reject)=>{
    //     const response = fetch('/api/users/')
    //     console.log(response)
    //     if (response.ok){
    //         resolve()
    //     }else{
    //         reject()
    //     }

    //     toast.promise(userPromise, {
    //         loading: 'Loading users...',
    //         success: 'User was successfully loaded',
    //         error: 'An error has occurred'
    //     })
    // })
    fetch("/api/users/").then((response) =>
      response.json().then((data) => setUsers(data))
    );
  }, []);

  if (loading) return "Loading...";
  if (!isAdmin) return "NOT AN ADMIN";
  return (
    <section className="max-w-xl mt-8 mx-auto">
      <UserTabs isAdmin={isAdmin} />

      <div className="mt-8 ">
        {users.length > 0 &&
          users.map((user) => (
            <div className="bg-gray-100 rounded-lg mb-2 p-1 flex px-4 items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                {user.name ? (
                  <div className="">{user.name}</div>
                ) : (
                  <div className="italic text-gray-500">No name</div>
                )}
                <div className="">{user.email}</div>
              </div>
              <div className="">
                <Link className='button' href={'/users/'+user._id} type="button">Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserPage;
