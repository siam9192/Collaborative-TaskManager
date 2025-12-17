import { useState, type FormEvent } from "react"
import ResultDialog from "./Dialog"
import type { ResultResponse } from "../../types/result.type"
import { fetchResult } from "../../utils/helper"
import { toast } from "sonner"


type FormValue = {
    regulation:string
    rollNumber:number|string
}

const regulationOptions =  [
    {
        label:"Any",
        value:"any"
    },
    {
        label:"2010",
        value:"2010"
    },
    {
        label:"2016",
        value:"2016"
    },
      {
        label:"2022",
        value:"2022"
    },
]

function SubmitForm() {
    const [result,setResult] = useState<ResultResponse|null>(null)
    const [isPending,setIsPending] = useState(false)
 const [form,setForm] =  useState<FormValue>({
    regulation:'',
    rollNumber:''
 })
 const handelChangeRollNumber = async(value:string)=>{
    const parse =  parseInt(value)
       setForm(p=>(
        {...p,rollNumber:isNaN(parse) ?'': parse}
       ))
     
 }

 const isValid =  form.regulation && form.rollNumber
 
 function openModal ()  {
    (document.getElementById('my_modal_5') as any)?.showModal();
  };

 const handelSubmit =async (e:FormEvent)=>{
    e.preventDefault()
   
   try {
         const result =  await fetchResult(form.rollNumber as number,form.regulation)
         if(result){
            setResult(result)
            setTimeout(()=>{
                openModal()
            },100)
         }
       } catch (error:any) {
        toast.error(error.message)
       } finally {
        setIsPending(false)
       }
 }

  return (
 <>
 <form  onSubmit={handelSubmit} className="max-w-3xl mx-auto bg-base-200 shadow-xl rounded-2xl overflow-hidden">
  <div className="card-body space-y-5">
    <h2 className="text-2xl font-semibold text-center mb-3">🎓 Check Result</h2>

    <fieldset className="fieldset space-y-4">
      <div>
        <label className="label">
          <span className="label-text text-lg font-medium">Regulation</span>
        </label>
        <select
          defaultValue=""
          className="select select-lg select-accent w-full bg-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={(e)=>setForm(p=>({...p,regulation:e.target.value}))}
        >
          <option value="" disabled>
            Select regulation
          </option>
          {regulationOptions.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">
          <span className="label-text text-lg font-medium">Roll Number</span>
        </label>
        <input
          type="text"
          className="input input-lg input-bordered w-full bg-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Enter your roll number"
          onChange={(e)=>handelChangeRollNumber(e.target.value)}
        />
      </div>
    </fieldset>

    <div className="form-control mt-6">
      <button
        type="submit"
        disabled={!isValid||isPending}
        className="btn btn-primary  btn-lg w-full hover:scale-105 transition-transform duration-200 disabled:hover:cursor-default"
      >
       {isPending ?<span className="loading text-primary loading-dots loading-xl"></span>:'🔍 Check'}
      </button>
    </div>
  
    
     
      
  
  </div>
  
 </form>
  <ResultDialog onClose={()=>setResult(null)} resultResponse={result}/>
 </>
  )
}

export default SubmitForm