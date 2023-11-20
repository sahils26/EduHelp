function CourseCard({cardData,currentCard,setCurrentCard}){


console.log(cardData)

    return(
        <div className="mx-auto -m-8">
            <div className={`flex flex-col gap-14 text-white text-[16px]  bg-richblack-600 
             ${currentCard===cardData.heading ? 'bg-yellow-400':'bg-richblack-600 '}   
             cursor-pointer hover:scale-95 transition-all duration-200`} onClick={()=>setCurrentCard(cardData.heading)}>
                <div>{cardData.heading}</div>
                <div>{cardData.description}</div>
                <div className="flex flex-row justify-between">
                    <div>{cardData.level}</div>
                    <div>{cardData.lessionNumber} <span>Lessons</span></div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;