import { useState } from "react"
import { createUserWithEmailAndPassword } from "../services/firestore.service";
import { useHistory } from "react-router-dom";
import tailor from "../services/tailor1.png"
  
  export default function SignUp() {
  
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const history=useHistory();
  
      const submit = async () => {
          await createUserWithEmailAndPassword(email, password);
           setEmail('');
           setPassword('');
          history.push('/');
      }
      return (
          <div className=" pt-32 flex-col px-2 space-y-4 flex items-center content-center">
              <div className="mb-24 flex items-center justify-center flex-col">
              <img className="w-24" src={tailor} alt={tailor}/>
              <h2 className="text-2xl font-semibold text-yellow-600">Create Account</h2>
              </div>
              <input value={email} placeholder=' Enter Email' className="rounded-md text-center outline-none w-full py-4 focus:outline-none border border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent" type="email" onChange={e => setEmail(e.target.value)} />
              <input value={password} placeholder="Enter Password" className="rounded-md text-center outline-none w-full py-4 focus:outline-none border border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent" type="text" onChange={e => setPassword(e.target.value)} />
              <button type="button" className="bg-yellow-400 text-xl  w-1/2 outline-none text-yellow-700" onClick={submit}>Create</button>
          </div>
      )
  }