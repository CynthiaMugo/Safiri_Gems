import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";

import {
  getMessages,
  markMessageRead,
  deleteMessage
} from "../services/messageService";


function Messages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);


  async function loadMessages() {
    try {
      setLoading(true);

      const data = await getMessages();

      setMessages(data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load messages.");

    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadMessages();
  }, []);

  async function handleRead(id) {

  try {

    await markMessageRead(id);

    toast.success("Message marked as read");

    loadMessages();

  } catch(error){

    toast.error("Unable to update message");

  }
}



async function handleDelete(id){

  const confirmed = window.confirm(
    "Delete this message?"
  );

  if(!confirmed) return;


  try{

    await deleteMessage(id);

    toast.success("Message deleted");

    loadMessages();

  }catch(error){

    toast.error("Unable to delete message");

  }

}



  if (loading) {

    return (
      <AdminLayout>

        <Header />

        <div className="space-y-8">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
              Messages
            </p>

            <div className="mt-3 h-12 w-72 animate-pulse rounded-xl bg-[#eee6df]" />

            <div className="mt-3 h-5 w-96 animate-pulse rounded bg-[#f3ede8]" />

          </div>


          <div className="space-y-5">

            {[...Array(4)].map((_, index) => (

              <div
                key={index}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >

                <div className="h-6 w-40 animate-pulse rounded bg-[#eee6df]" />

                <div className="mt-3 h-4 w-52 animate-pulse rounded bg-[#f3ede8]" />

                <div className="mt-5 h-16 animate-pulse rounded bg-[#f3ede8]" />

              </div>

            ))}

          </div>
          

        </div>

      </AdminLayout>
    );
  }



  return (
    <AdminLayout>

      <Header />


      <div className="mb-8">

        <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
          Messages
        </p>


        <h1 className="font-serif text-5xl text-[#5a4a42]">
          Customer Messages
        </h1>


        <p className="mt-2 text-[#7a6a61]">
          View enquiries and requests from your customers.
        </p>

      </div>



      {messages.length === 0 ? (

        <div className="rounded-3xl bg-white p-20 text-center shadow-sm">

          <h2 className="font-serif text-3xl text-[#5a4a42]">
            No Messages Yet
          </h2>


          <p className="mt-3 text-[#7a6a61]">
            Customer enquiries will appear here.
          </p>

        </div>


      ) : (


        <div className="space-y-6">


          {messages.map((message) => (

            <div
              key={message.id}
              className="rounded-3xl bg-white p-7 shadow-sm transition hover:shadow-md"
            >
                

              <div className="flex flex-col justify-between gap-3 md:flex-row">


                <div>

                  <h2 className="font-serif text-2xl text-[#5a4a42]">
                    {message.name}
                  </h2>


                  <p className="text-sm text-[#7a6a61]">
                    {message.email}
                  </p>

                </div>


                <p className="text-sm text-[#c2a67a]">

                  {new Date(
                    message.created_at
                  ).toLocaleDateString()}

                </p>


              </div>



              <div className="mt-6 rounded-2xl bg-[#f8f5f2] p-5">

                <p className="leading-relaxed text-[#5a4a42]">
                  {message.message}
                </p>

              </div>
              {!message.is_read && (

                    <span className="rounded-full bg-[#c2a67a] px-3 py-1 text-xs text-white">
                    New
                    </span>

                    )}
                    <div className="mt-5 flex gap-3">

                    {!message.is_read && (

                    <button
                    onClick={() => handleRead(message.id)}
                    className="rounded-xl bg-[#c2a67a] px-4 py-2 text-sm text-white"
                    >
                    Mark Read
                    </button>

                    )}


                    <button
                    onClick={() => handleDelete(message.id)}
                    className="rounded-xl bg-[#5a4a42] px-4 py-2 text-sm text-white"
                    >
                    Delete
                    </button>

                    </div>



            </div>

          ))}


        </div>

      )}


    </AdminLayout>
  );
}


export default Messages;