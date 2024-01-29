import RenderSteps from "./RenderSteps"

function AddCourse(){
    return(
        <div className="text-white">
            <div>
                <h1>Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>
            <div>
                <p>Code Upload Tips</p>
                <ul>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                    <li>Code .............</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse;