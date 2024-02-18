import HighlightText from "../HomePage/HighlightText";

function Quote(){
    return(<div  className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText>combines technology</HighlightText>,
        <span className="bg-gradient-to-b from-[#a8513f] to-[#b96f08] text-transparent bg-clip-text font-bold">
            expertise
        </span>
        ,and community to create an 
        <span className="bg-gradient-to-b from-[#ff9752] to-[#75270b] text-transparent bg-clip-text font-bold">
           unparalleled educational experience. 
        </span>
    </div>)
}

export default Quote;