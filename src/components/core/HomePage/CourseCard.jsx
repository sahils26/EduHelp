function CourseCard({cardData,currentCard,setCurrentCard}){
    return(
        <div>
            <div className="flex flex-col text-white">
                <div >{cardData.heading}</div>
                <div>{cardData.description}</div>
                <div>
                    <div>{cardData.level}</div>
                    <div>{cardData.lessionNumber}</div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;