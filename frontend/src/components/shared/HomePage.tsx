import Container from "../ui/Container"
import SubmitForm from "../ui/SubmitForm"


function MainContent() {
  
  return (
 <Container>
  <div className="mt-5 lg:mt-10  flex flex-col justify-center items-center bg-base-200 py-10 px-2 md:px-4  relative rounded-xl">
    {/* Header Section */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 leading-snug">
      🎓 Check Your <span className="text-primary">Diploma in Engineering</span> Result
    </h1>

    <p className="text-center text-sm sm:text-base text-base-content/70 mb-8 max-w-md mx-auto">
      Enter your roll number and regulation below to view your result instantly.
    </p>

    {/* Card Section */}
   
      <div className=" bg-base-100 p-2 md:p-5  rounded-2xl">
        <SubmitForm />
      </div>
  <p className="absolute bottom-2 left-2 text-sm">
  Developer:&nbsp;
  <span className="text-info font-semibold">
    Arafat Hasan Siam (CST-6/2, MPI)
  </span>
</p>

 
</div>
 </Container>
  )
}

export default MainContent