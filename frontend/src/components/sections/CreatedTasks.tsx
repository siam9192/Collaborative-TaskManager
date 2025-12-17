import type { Task } from "../../types/task.type"
import TaskCard from "../card/TaskCard"
import FilterBox from "../ui/FilterBox"
import Pagination from "../ui/Pagination"

interface Props {
    tasks:Task[]
}

function CreatedTasks({tasks}:Props) {
  return (
  
         <section>
          <h2 className="text-2xl font-bold mb-4">Tasks Created by Me</h2>
 <FilterBox/>

      
        {tasks.length === 0 ? (
          <p className="text-sm opacity-70">You haven't created any tasks yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
   <div className="mt-6">
     <Pagination currentPage={1} totalPages={5} onPageChange={()=>{}}/>
   </div>
      </section>

  )
}

export default CreatedTasks